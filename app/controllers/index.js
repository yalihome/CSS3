var Movie = require("../models/movie");
exports.index = function(req,res){
    //首页
    Movie.fetch(function(err,movies){
        if(err){
            console.log(err);
        }
        res.render("index",{
            title:"imooc 首页",
            movies:movies
        });
    });
} 