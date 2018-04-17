var mongoose = require("mongoose");
var CommentSchema = require("../schemas/comment");
var Comment = mongoose.model("User",CommentSchema);
//模型
module.exports = Comment;