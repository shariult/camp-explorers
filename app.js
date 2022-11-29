//==================================================
//Requirements
//==================================================

if (process.env.NODE_ENV === "dev") {
  require("dotenv").config();
}

const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  expressSanitizer = require("express-sanitizer"),
  expressSession = require("express-session"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose"),
  flash = require("connect-flash");

const db = require("./models"),
  errorHandler = require("./controller/error");

//==================================================
//Configuration
//==================================================
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(
  expressSession({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());
passport.use(new LocalStrategy(db.User.authenticate()));
app.use(flash());
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

//==================================================
//Routes
//==================================================
const indexRouter = require("./routes/index"),
  campgroundsRouter = require("./routes/campgrounds"),
  commentsRouter = require("./routes/comments");

app.use(indexRouter);
app.use(campgroundsRouter);
app.use(commentsRouter);
app.use(function (req, res, next) {
  let err = new Error("Not Found!");
  err.status = 404;
  next(err);
});
app.use(errorHandler);
//==================================================
//Server
//==================================================
app.listen(process.env.PORT, process.env.IP, () => {
  console.log("Server Running");
});
