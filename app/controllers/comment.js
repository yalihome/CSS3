var Comment = require("../models/comment");

exports.save = function(req,res){
    var _comment = req.body;
    var movieId = _comment.movie;
    var comment = new Comment(_comment);
    //保存评论之后去电影详情查看评论
    comment.save(function(err,comment){
        if(err){
            console.log(err);
        }
       
        res.redirect("/movie/"+movieId);
    });
} 