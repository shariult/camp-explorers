const db = require("../models");

const middleware = {};
middleware.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        req.flash("success", "Welcome to Yelpcamp");
        return next();
    } else{
        req.flash("error", "You have to login first");
        res.redirect("/login");
    }
};
middleware.checkCampgroundOwnership = function (req, res, next){
    if(req.isAuthenticated()){
        db.Campgrounds.findById(req.params.id, function(err, foundCampground){
            if (err) {
                req.flash("error", "Campground not Found!!!");
                res.redirect("back");
            } else {
                if (foundCampground.author.id.equals(req.user._id)) {
                    req.flash("success", "Operation Successful");
                    return next();
                } else {
                    req.flash("error", "Permission Denied");
                    res.redirect("back");
                }
            }
        });
    }else{
        res.redirect("back");
    }
};

middleware.checkCommentOwnerShip = function (req, res, next){
    if(req.isAuthenticated()){
        db.Comments.findById(req.params.cId, function(err, foundComment){
            if (err) {
                req.flash("error", "Campground not Found!!!");
                res.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    req.flash("success", "Operation Successful");
                    return next();
                } else {
                    req.flash("error", "Permission Denied");
                    res.redirect("back");
                }
            }
        });
    }else{
        res.redirect("back");
    }
};

module.exports = middleware;