var Index = require("../app/controllers/index");
var User = require("../app/controllers/user");
var Movie = require("../app/controllers/movie");
// var User = require("../models/user");
var _ = require("underscore");

module.exports = function(app){
//预处理 user
app.use(function(req,res,next){
    var _user = req.session.user;
    if(_user){
        app.locals.user = _user;
        next();
    }
});

//首页
app.get("/",Index.index);

//注册
app.get("/user/signin",User.signin);
//登录
app.get("/user/signup",User.signup);
//登出
app.get("/user/logout",User.logout);
//注册页面
app.get("/signin",User.showSignin);
//登录页面
app.get("/signup",User.showSignup);
//用户列表
app.get("/admin/user/list",User.signinRequired,User.adminRequired,User.list);

//电影详情
app.get("/movie/id",Movie.detail);
//新增电影
app.get("/admin/movie/new",User.signinRequired,User.adminRequired,Movie.new);
//更新电影
app.get("/admin/movie/update/:id",User.signinRequired,User.adminRequired,Movie.update);
//保存电影
app.get("/admin/movie",User.signinRequired,User.adminRequired,Movie.save);
//电影管理列表
app.get("/admin/movie/list",User.signinRequired,User.adminRequired,Movie.list);
//删除电影
app.delete("/admin/list",Movie.del);

}