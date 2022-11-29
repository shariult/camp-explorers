var mongoose = require("mongoose");

var commentsSchema = new mongoose.Schema({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comment: String,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Comments", commentsSchema);