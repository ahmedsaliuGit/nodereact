const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: ture,
    required: true
  },
  email: {
    type: String,
    trim: ture,
    required: true
  },
  hashed_password: {
    type: String,
    required
  },
  salt: String,
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date
});

module.exports = mongoose.model("User", userSchema);
