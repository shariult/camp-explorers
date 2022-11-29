const mongoose = require("mongoose");

mongoose.Promise = Promise;
mongoose
  .connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

exports.Campgrounds = require("./campgrounds");
exports.Comments = require("./comments");
exports.User = require("./user");

module.exports = exports;
