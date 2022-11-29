//Requirements
const express = require("express"),
  router = express.Router(),
  campground = require("../controller/campgrounds"),
  middleware = require("../middleware");

//Create New Campground
router.get(
  "/campgrounds/new",
  middleware.isLoggedIn,
  campground.getNewCampground
);

router.post(
  "/campgrounds",
  middleware.isLoggedIn,
  campground.postNewCampground
);

//Show Route
router.get("/campgrounds/:id", campground.getCampground);

//Edit Route
router.get(
  "/campgrounds/:id/edit",
  middleware.checkCampgroundOwnership,
  campground.getEditCampground
);
router.put(
  "/campgrounds/:id",
  middleware.checkCampgroundOwnership,
  campground.putCampground
);

//Delete
router.delete(
  "/campgrounds/:id",
  middleware.checkCampgroundOwnership,
  campground.deleteCampground
);

module.exports = router;
