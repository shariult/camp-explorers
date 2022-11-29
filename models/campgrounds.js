var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
  title: {
    type: String,
    required: function () {
      return this.title.length >= 3;
    },
  },
  imgURL: String,
  location: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: function () {
      return this.website.indexOf("http") !== -1;
    },
    unique: true,
  },
  cost: Number,
  essentials: String,
  description: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
  author: {
    username: String,
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
});

module.exports = mongoose.model("Campground", campgroundSchema);
