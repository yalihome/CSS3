import { INSPECT_MAX_BYTES } from "buffer";

var express = require("express");
var process = require("process");
var path = require("path");
var _ = require("underscore");
var mongoose= require("mongoose");
var Movie = require("./models/movie");
var User = require("./models/user");
var dbUrl = "mongodb://127.0.0.1:27017/shop";
//连接本地数据库
mongoose.connect(dbUrl);
var port = process.env.port || 3000;
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoStore = require("connect-mongo")(session);

app.set("views","./views/pages");
app.set("view engine","jade");
app.use(express.static(path.join(__dirname,"public")));

//body-parser 是一个express插件，可以对post请求的请求体进行解析， 涉及表单提交
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//session 是用来弥补http协议无状态的不足
//session持久化方式：cookie、内存、redis、mongodb
app.use(session({
    secret:"imooc",
    store:new mongoStore({
        url: dbUrl,   //mongodb地址
        collection: "session"   //存在 mongodb 中的 session 的集合名称
    }),
    resave: false,
    saveUninitialized: true
}));
app.use(cookieParser());
require("./config/routes")(app);
app.listen(port);

console.log("listen on port "+port);

//预处理 user
app.use(function(req,res,next){
    var _user = req.session.user;
    if(_user){
        app.locals.user = _user;
        next();
    }
});

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
    var id = req.body._id;
    var movieObj = req.body;
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
            title:movieObj.title,
            country:movieObj.country,
            language:movieObj.language,
            year:movieObj.year,
            poster:movieObj.poster,
            summary:movieObj.summary,
            flash:movieObj.flash
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

//list delete movie 列表页删除数据
app.delete("/admin/list",function(req,res){
    var id = req.query.id;
    if(id){
        Movie.remove({_id:id},function(err,movice){
            if(err){
                console.log(err);
            }else{
                res.json({success:1});
            }

        });
    }
});

//注册 todo 注册的数据保存还有问题
app.post("/user/signup",function(req,res){
    var _user = req.body;
    var user = new User(_user);
    User.find({name:user.name},function(err,re){
        if(err){
            console.log(err);
        }
        if(user){
            res.redirect("/");
        }else{
            user.save(user,function(e,r){
                if(err){
                    console.log(err);
                }
                res.redirect("/");
            });
        }
    })
});

//登陆
app.post("/user/signin",function(req,res){
    var _user = req.body;
    var name = _user.name;
    var password = _user.password;
    User.find({name:name},function(err,r){
        if(err){
            console.log(err);
        }
        if(!user){
            res.redirect("/");
        }
        user.comparePassword(password,function(e,isMatch){
            if(e){
                console.log(e);
            }
            if(isMatch){
                //匹配
                req.session.user = user;
                res.redirect("/");
            }else{
                console.log("password is not matched");
            }
        });
    })
});

//登出
app.get("/logout",function(req,res){
    delete req.session.user;
    delete app.locals.user;   //为什么要保存在locals属性下？
    req.redirect("/");
})

//admin userlist page
app.get("/admin/userlist",function(req,res){
    User.fetch(function(err,users){
        if(err){
            console.log(err);
        }
        res.render("userlist",{
            title:"imooc 用户列表",
            users:users
        })
    });
});

