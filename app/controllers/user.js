var User = require("../models/user");
//注册 todo 注册的数据保存还有问题
exports.signup = function(req,res){
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
}

//登陆
exports.signin = function(req,res){
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
}

//登出
exports.logout = function(req,res){
    //delete req.session.user;
    //delete app.locals.user;   //为什么要保存在locals属性下？
    req.redirect("/");
}

//admin userlist page
exports.list = function(req,res){
    User.fetch(function(err,users){
        if(err){
            console.log(err);
        }
        res.render("userlist",{
            title:"imooc 用户列表",
            users:users
        })
    });
}