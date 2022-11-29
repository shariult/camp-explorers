const db = require("../models");

//Campground Get New
exports.getNewCampground = (req, res) => {
  res.render("campgrounds/new");
};
//Campground Post
exports.postNewCampground = async (req, res) => {
  //santize the body
  req.body.campground.description = req.sanitize(
    req.body.campground.description
  );
  try {
    //push the data to array
    const newCampground = await db.Campgrounds.create(req.body.campground);
    newCampground.author.username = req.user.username;
    newCampground.author.id = req.user._id;
    newCampground.save();
    //redirect to campground page
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

//Campground Show
exports.getCampground = async (req, res) => {
  try {
    const foundCampground = await db.Campgrounds.findById(
      req.params.id
    ).populate("comments");
    res.render("campgrounds/show", { campground: foundCampground });
  } catch (err) {
    req.flash("error", "Campground Not Found!");
    res.redirect("back");
  }
};

//Campground Get Edit
exports.getEditCampground = async (req, res) => {
  try {
    const foundCampground = await db.Campgrounds.findById(req.params.id);
    res.render("campgrounds/edit", { campground: foundCampground });
  } catch (err) {
    req.flash("error", "Unknown Campground");
    res.redirect("back");
  }
};

//Campground Put Edit
exports.putCampground = async (req, res) => {
  req.body.campground.description = req.sanitize(
    req.body.campground.description
  );
  try {
    const updateCampground = await db.Campgrounds.findByIdAndUpdate(
      req.params.id,
      req.body.campground
    );
    console.log(req.body.campground);
    res.redirect("/campgrounds/" + req.params.id);
  } catch (err) {
    req.flash("error", "Something Went Wrong!");
    res.redirect("/");
  }
};

//Campground Delete
exports.deleteCampground = async (req, res) => {
  try {
    const deleteCampground = await db.Campgrounds.findByIdAndDelete(
      req.params.id
    );
    const deleteComments = await db.Comments.deleteMany({
      _id: { $in: deleteCampground.comments },
    });
    res.redirect("/#campgrounds");
  } catch (err) {
    req.flash("error", "Something Went Wrong!");
    res.redirect("/");
  }
};

module.exports = exports;
