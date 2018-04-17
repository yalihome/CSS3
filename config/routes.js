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
app.get("/user/siginip",User.siginip);
//登录
app.get("/user/siginup",User.signup);
//登出
app.get("/user/logout",User.logout);
//用户列表
app.get("/admin/userlist",User.List);

//电影详情
app.get("/movie/id",Movie.detail);
//新增电影
app.get("/admin/new",Movie.new);
//更新电影
app.get("/admin/update/:id",Movie.update);
//保存电影
app.get("/admin/movie",Movie.save);
//电影管理列表
app.get("/admin/list",Movie.list);
//删除电影
app.delete("/admin/list",Movie.del);

}