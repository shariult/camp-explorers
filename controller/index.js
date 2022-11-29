const passport = require("passport"),
  User = require("../models/user"),
  db = require("../models");

// Getting Index Page
exports.getLandingPage = async (req, res) => {
  try {
    Campgrounds = await db.Campgrounds.find({});
    res.render("index", { Campgrounds: Campgrounds });
  } catch (err) {
    next(err);
  }
};
//Getting Register
exports.getRegister = (req, res) => {
  res.render("members/register");
};
// Posting Register
exports.postRegister = async (req, res) => {
  const userInfo = {
    username: req.body.username,
    fullname: req.body.fullname,
    email: req.body.email,
    contact: req.body.contact,
    birth: req.body.dateOfBirth,
    country: req.body.country,
    about: req.body.about,
  };
  try {
    const registration = await User.register(
      new User(userInfo),
      req.body.password
    );
    passport.authenticate("local")(req, res, function () {
      res.redirect("/");
    });
  } catch (err) {
    req.flash("error", err.message);
    return res.redirect("/register");
  }
};
// Getting Login
exports.getLogin = (req, res) => {
  res.render("members/login");
};
// Logout
exports.getLogout = (req, res) => {
  req.logOut();
  req.flash("success", "Logged You Out!");
  res.redirect("/");
};

module.exports = exports;
