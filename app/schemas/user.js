var mongoose = require("mongoose");
var bcypt = require("bcrypt-nodejs");
var SALT_WORK_FACTOR = 10;
var UserSchema = new mongoose.Schema({
    name:{
        type:String,
        unique: true
    },
    password:String,
    //0:normal
    //1:verified user 邮件激活的用户
    //2:professional user 资料很完备
    //>10:admin  管理员
    //>50:super admin  超级管理员
    role:{
        type:Number,
        default:0
    },
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});

UserSchema.pre("save",function(next){
    var user = this;
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }
    bcypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
        if(err) return next(err);
        bcypt.hash(user.password,salt,function(err, hash){
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
    next();
});

//静态方法
UserSchema.statics = {
//查询列表
fetch:function(cb){
    return this.find({}).sort("meat.updateAt").exec(cb);
}
//通过id查询
,find:function(id,cb){
    return this.findOne({_id:id}).exec(cb);
}
};

//实例方法
UserSchema.methods = {
    comparePassword:function(_password, cb){
        bcrypt(_password,this.password,function(err,isMatch){
            if(err) return cb(err);
            cb(null, isMatch);
        });
    }
}

module.exports = UserSchema;