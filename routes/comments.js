//Requirements
var express = require("express"),
  router = express.Router(),
  comments = require("../controller/comments"),
  middleware = require("../middleware");

//Comments Routes
router.post(
  "/campgrounds/:id/comments",
  middleware.isLoggedIn,
  comments.postComment
);

//Edit Comment
router.get(
  "/campgrounds/:id/comments/:cId/edit",
  middleware.checkCommentOwnerShip,
  comments.getEditComment
);
router.put(
  "/campgrounds/:id/comments/:cId",
  middleware.checkCommentOwnerShip,
  comments.putComment
);

//Delete Comment
router.delete(
  "/campgrounds/:id/comments/:cId",
  middleware.checkCommentOwnerShip,
  comments.deleteComment
);

module.exports = router;
