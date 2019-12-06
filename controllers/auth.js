const jwt = require("jsonwebtoken");
require("dotenv").config();
const expressJwt = require("express-jwt");

const User = require("../models/user");

exports.signup = async (req, res) => {
  const userExist = await User.findOne({ email: req.body.email });

  if (userExist) return res.status(403).json({ message: "Email is taken!" });

  const user = await new User(req.body);
  await user.save();
  res.json({ message: "User created successful!" });
};

// signin method
exports.signin = (req, res) => {
  // find the user base on email
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    // if error or no user
    if (err || !user) {
      return res.status(401).json({
        error: "User with this email does not exist. Please signin."
      });
    }
    // if user is found authenticate to make sure the email and password match
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password so not match"
      });
    }
    // generate token with user id and token secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // persist as 't' in the cookies with expiry date
    res.cookie;
    "t", token, { expire: new Date() + 9999 };
    // return response with user and token for the client
    const { _id, email, name } = user;
    return res.json({ user: { _id, email, name }, token });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  return res.json({ message: "Sign out successful!" });
};

exports.requireSignin = expressJwt({
  // if the token is valid, express jwt will append the user's id
  // to the auth key in the req object
  secret: process.env.JWT_SECRET,
  userProperty: "auth"
});
