//Requirements
const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  indexController = require("../controller");

//Landing Page
router.get("/", indexController.getLandingPage);

//Register
router.get("/register", indexController.getRegister);
router.post("/register", indexController.postRegister);

//Login
router.get("/login", indexController.getLogin);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    successFlash: "Hey! Welcome Back!",
    failureRedirect: "/",
    failureFlash: "Username or Password Error!!!",
  }),
  function (req, res) {}
);

//logout
router.get("/logout", indexController.getLogout);

//Miscellenious
const website = {
  name: "Camp Explorers",
  url: "http://shariul.com/explorers-camp",
};
router.get("/terms", (req, res) => res.render("terms", { website: website }));
router.get("/privacy", (req, res) =>
  res.render("privacy", { website: website })
);
router.get("/credits", (req, res) => res.render("credits"));
module.exports = router;
