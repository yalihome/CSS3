// import { INSPECT_MAX_BYTES } from "buffer";

var express = require("express");
var process = require("process");
var path = require("path");
var mongoose= require("mongoose");
var morgan = require("morgan");
var dbUrl = "mongodb://127.0.0.1:27017/shop";
//连接本地数据库
mongoose.connect(dbUrl);
var port = process.env.port || 3000;
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoStore = require("connect-mongo")(session);

app.set("views","./app/views/pages");
app.set("view engine","jade");
app.use(express.static(path.join(__dirname,"public")));

//body-parser 是一个express插件，可以对post请求的请求体进行解析， 涉及表单提交
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
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

if("development"===app.get("env")){
    app.set("showStackError",true);
    app.use(morgan(":method :url :status"));
    app.locals.pretty = true;
    mongoose.set("debug",true);
}

require("./config/routes")(app);
app.listen(port);

console.log("listen on port "+port);

