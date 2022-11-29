const db = require("../models"),
  middlewareObj = require("../middleware");

//Post Comment
exports.postComment = async (req, res) => {
  try {
    const saveComment = await db.Comments.create({ comment: req.body.comment });
    const foundCampground = await db.Campgrounds.findById(req.params.id);
    saveComment.author.username = req.user.username;
    saveComment.author.id = req.user._id;
    saveComment.save();
    foundCampground.comments.push(saveComment);
    foundCampground.save();
    res.redirect("/campgrounds/" + req.params.id);
  } catch (err) {
    req.flash("error", "Something went wrong!!");
    res.redirect("/");
  }
};

// Get Comment Edit
exports.getEditComment = async (req, res) => {
  try {
    const foundComment = await db.Comments.findById(req.params.cId);
    res.render("comments/edit", {
      comment: foundComment,
      campground: req.params.id,
    });
  } catch (err) {
    req.flash("error", "Something went wrong!!");
    res.redirect("back");
  }
};

//Put Comment
exports.putComment = async (req, res) => {
  try {
    const updateComment = await db.Comments.findByIdAndUpdate(req.params.cId, {
      comment: req.body.comment,
    });
    res.redirect("/campgrounds/" + req.params.id);
  } catch (err) {
    req.flash("error", "Something went wrong!!");
    res.redirect("back");
  }
};

//Delete Comment
exports.deleteComment = async (req, res) => {
  try {
    const deletedComment = await db.Comments.findByIdAndDelete(req.params.cId);
    const foundCampground = await db.Campgrounds.findById(req.params.id);
    foundCampground.comments.pull(deletedComment._id);
    foundCampground.save();
    req.flash("success", "Comment Deleted");
    res.redirect("/campgrounds/" + req.params.id);
  } catch (err) {
    req.flash("error", "Something went wrong!!");
    res.redirect("back");
  }
};

module.exports = exports;
