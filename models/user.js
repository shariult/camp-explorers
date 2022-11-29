var mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: function () {
      return this.username.length >= 3;
    },
    unique: true,
  },
  fullname: {
    type: String,
    required: function () {
      return this.username.length >= 6;
    },
  },
  password: String,
  email: String,
  contact: String,
  birth: Date,
  country: String,
  about: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
