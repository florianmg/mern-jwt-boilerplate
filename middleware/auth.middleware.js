const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Check if user is connected by checking the jwt in the request object
 * @param req
 * @param res
 * @param next
 */
const requireAuth = (req, res, next) => {
  // get the jwt in cookies in the request
  const token = req.cookies.jwt;

  // check if jwt exist and is valid
  if (token) {
    jwt.verify(token, process.env.SECRET_JWT, (err, decodedToken) => {
      // token is not valid
      if (err) return "User not logged";
      next();
    });
  } else {
    return "User not logged";
  }
};

/**
 * Check who is the current user
 */
const checkUser = (req, res, next) => {
  // get the jwt in cookies in the request
  const token = req.cookies.jwt;

  // check if jwt exist and is valid
  if (token) {
    jwt.verify(token, process.env.SECRET_JWT, async (err, decodedToken) => {
      // token is not valid
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        return user;
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
