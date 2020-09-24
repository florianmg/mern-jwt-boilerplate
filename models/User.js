const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

/**
 * function fired before (pre) the user is saved
 * @param next: next method to go to next() middleware
 *
 * this refer to the user created in authController.signUp_post with User.create
 */
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/**
 * function fired after (post) the user is saved
 * @param doc: document that has been saved
 * @param next: next method to go to next() middleware
 */
UserSchema.post("save", function (doc, next) {
  next();
});

/**
 * Static method to login the user
 * this is the user model
 */
UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) return user;
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

/**
 * Create the user model using the schema
 */
const User = mongoose.model("user", UserSchema);

module.exports = User;
