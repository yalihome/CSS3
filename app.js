var express = require("express");
var process = require("process");
var path = require("path");
var port = process.env.port || 3000;
var app = express();
var bodyParser = require('body-parser');

app.set("views","./views/pages");
app.set("view engine","jade");
app.use(express.static(path.join(__dirname,"bower_components")));
//body-parser 是一个express插件，可以对post请求的请求体进行解析， 涉及表单提交
// app.use(bodyParser.json);
// app.use(bodyParser.urlencoded({ extended: false }));
app.listen(port);

console.log("listen on port "+port);

//首页
app.get("/",function(req,res){
    res.render("index",{
        title:"imooc 首页",
        movies:[
            {
                _id:1,
                title:"唐人街探案2",
                poster:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520439934758&di=aad637d7fb6867384371fde2c2a07762&imgtype=0&src=http%3A%2F%2Fpic30.photophoto.cn%2F20140108%2F0005018307841789_b.jpg"
            },
            {
                _id:2,
                title:"唐人街探案2",
                poster:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520439934758&di=aad637d7fb6867384371fde2c2a07762&imgtype=0&src=http%3A%2F%2Fpic30.photophoto.cn%2F20140108%2F0005018307841789_b.jpg"
            },
            {
                _id:3,
                title:"唐人街探案2",
                poster:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520439934758&di=aad637d7fb6867384371fde2c2a07762&imgtype=0&src=http%3A%2F%2Fpic30.photophoto.cn%2F20140108%2F0005018307841789_b.jpg"
            }
        ]
    });
});

//详情页
app.get("/movie/:id",function(req,res){
    res.render("detail",{
        title:"imooc 详情页",
        movie:{
            title:"唐人街探案2",
            language:"中文",
            year:2018,
            country:"中国",
            doctor:"陈思诚",
            summary:"就覅估计打广告，fg8ifisjdifsjfs，圣诞节覅事发时的，水电费计算就覅，大护法ID回复胡覅和杜甫的护肤和杜甫的护肤和杜甫活动，都护府福蝴蝶飞虎的核辐射uhufhu蝴蝶飞，都护府福弧度回复的回复数地方大幅度",
            flash:"http://www.baidu.com"
        }
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

//列表页
app.get("/admin/list",function(req,res){
    res.render("list",{
        title:"imooc 列表页",
        movies:[
            {
                _id:1,
                title:"唐人街探案2",
                year:2018,
                country:"中国",
                doctor:"陈思诚",
                meta:{
                    createdAt:2017
                }
            },
            {
                _id:2,
                title:"唐人街探案2",
                year:2018,
                country:"中国",
                doctor:"陈思诚",
                meta:{
                    createdAt:2017
                }
            },
            {
                _id:3,
                title:"唐人街探案2",
                year:2018,
                country:"中国",
                doctor:"陈思诚",
                meta:{
                    createdAt:2017
                }
            }
        ]
    });
});
