const User = require("../models/User");
const jwt = require("jsonwebtoken");

/**
 * Take error object and transform it to readable object
 * @param err
 * @returns {{password: string, email: string}}
 */
const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  // Duplicate errors
  if (err.code === 11000) {
    errors.email = "email already exist";
    return errors;
  }

  // Incorrect email
  if (err.message === "incorrect email")
    errors.email = "That email is not registered";

  // Incorrect password
  if (err.message === "incorrect password")
    errors.password = "That password is incorrect";

  // Validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

/**
 * Create jsonwebtoken for user when log in / signin
 * @param id (user id)
 * @returns
 */
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_JWT, {
    expiresIn: process.env.AGE_JWT,
  });
};

module.exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = await User.create({
      email,
      password,
    });
    const token = createToken(newUser._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      path: process.env.COOKIE_PATH,
      domain: process.env.COOKIE_DOMAIN,
      maxAge: process.env.COOKIE_MAX_AGE,
    });
    res.status(201).json({ user: newUser._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      path: process.env.COOKIE_PATH,
      domain: process.env.COOKIE_DOMAIN,
      maxAge: process.env.COOKIE_MAX_AGE,
    });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.isAuthenticated = async (req, res) => {
  const token = req.cookies.jwt;
  try {
    const verification = await jwt.verify(token, process.env.SECRET_JWT);
    if (!verification) new Error("wrong token");
    const user = await User.findById(verification.id);
    if (!user) new Error("No user found");
    return res.status(200).json({ user: user._id });
  } catch (e) {
    return res.status(401).json({ status: 401, message: e });
  }
};

module.exports.logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    path: process.env.COOKIE_PATH,
    domain: process.env.COOKIE_DOMAIN,
    maxAge: 1,
  });
  return res.status(200).json("User logged out");
};
