var User = require("../models/user");
//注册 todo 注册的数据保存还有问题
exports.signup = function(req,res){
    var _user = req.body;
    
    User.find({name:_user.name},function(err,re){
        if(err){
            console.log(err);
        }
        if(re){
            //用户名已经存在，应该跳转去登录才对
            res.redirect("/signin");
        }else{
            var user = new User(_user);
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
        //用户不存在则去注册
        if(!r){
            res.redirect("/signup");
        }
        //用户存在
        user.comparePassword(password,function(e,isMatch){
            if(e){
                console.log(e);
            }
            if(isMatch){
                //密码匹配，登录成功，记录 session
                req.session.user = user;
                res.redirect("/");
            }else{
                //密码不匹配，则继续登录
                res.redirect("/signin");
                //console.log("password is not matched");
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
    // var user = req.session.user;
    // if(!user){
    //     req.redirect("/siginin");
    // }
    // //管理员才能查看用户列表
    // if(user.role>10){
        
    // }
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

//登录与否判断中间件
exports.signinRequired = function(req,res,next){
    var user = req.session.user;
    //已经登录了， 为何还要登录？没写错吧？
    if(user){
        return res.redirect("/signin");
    }
    next();
}

//访问权限判断中间件
exports.adminRequired = function(req,res,next){
    var user = req.session.user;
    //10以下用户无权访问管理员页面
    if(user.role <= 10){
        return res.redirect("/signin");
    }
    next();
}

//跳转到登录页面
//todo session中的user是在登录的时候赋值的
exports.showSignin = function(req,res){
    res.render("signin",{
        title:"登录页面"
    });
}

//跳转到注册页面
exports.showSignup = function(req,res){
    res.render("signup",{
        title:"注册页面"
    });
}