var express = require("express");
var process = require("process");
var path = require("path");
var _ = require("underscore");
var mongoose= require("mongoose");
var Movie = require("./models/movie");
//连接本地数据库
mongoose.connect("mongodb://localhost/imooc");
var port = process.env.port || 3000;
var app = express();
var bodyParser = require('body-parser');

app.set("views","./views/pages");
app.set("view engine","jade");
app.use(express.static(path.join(__dirname,"public/libs")));
//body-parser 是一个express插件，可以对post请求的请求体进行解析， 涉及表单提交
// app.use(bodyParser.json);
// app.use(bodyParser.urlencoded({ extended: false }));
app.listen(port);

console.log("listen on port "+port);

//首页
app.get("/",function(req,res){
    Movie.fetch(function(err,movies){
        if(err){
            console.log(err);
        }
        res.render("index",{
            title:"imooc 首页",
            movies:movies
        });
    });
});

//详情页
app.get("/movie/:id",function(req,res){
    var id = req.params.id;
    Movie.findById(id,function(err,movie){
        if(err){
            console.log(err);
        }
        res.render("detail",{
            title:"imooc "+movie.title,
            movie:movie
        });
    });
});

//后台录入页
app.get("/admin/movie",function(req,res){
    res.render("admin",{
        title:"imooc 后台录入页",
        movie:{
            title:"",
            doctor:"",
            country:"",
            language:"",
            poster:"",
            flash:"",
            year:"",
            summary:""
        }
    });
});

//admin post movie 新增/更新电影
app.post("/admin/movie/new",function(req,res){
    var id = res.body._id;
    var movieObj = req.body.movie;
    var _movie;
    //跟更新
    if(id!=="undefined"){
        Movie.findById(id,function(err,movie){
            if(err){
                console.log(err);
            }
            //新对象替换老对象
            _movie = _.extend(movie,movieObj);
            _movie.save(function(e,re){
                if(e){
                    console.log(e);
                }
                //新增成功之后重定向到详情
                res.redirect("/movie/"+movie._id);
            });
        });
    }else{
        //新增电影
        _movie = new Movie({
            doctor:movieObj.doctor,
            title:movieObj.doctor,
            country:movieObj.doctor,
            language:movieObj.doctor,
            year:movieObj.doctor,
            poster:movieObj.doctor,
            summary:movieObj.doctor,
            flash:movieObj.doctor
        });
        _movie.save(function(e,re){
            if(e){
                console.log(e);
            }
            res.redirect("/movie/"+re._id);
        });
    }
});

//admin update movie todo 不太明白这个接口是为什么要添加，直接 a 链接跳转不行吗？
app.get("admin/update/:id",function(req,res){
    var id = req.params.id;
    if(id){
        Movie.findById(id,function(err,movie){
            res.render("admin",{
                title:"imooc 后台",
                movie: movie
            })
        });
    }
});

//列表页
app.get("/admin/list",function(req,res){
    Movie.fetch(function(err,movies){
        if(err){
            console.log(err);
        }
        res.render("list",{
            title:"imooc 列表页",
            movies:movies
        });
    });
});
