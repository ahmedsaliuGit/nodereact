const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: "Title is required",
    minlength: 4,
    maxlenght: 150
  },
  body: {
    type: String,
    required: "Body is required",
    minlength: 4,
    maxlenght: 2000
  }
});

module.exports = mongoose.model("Post", postSchema);
