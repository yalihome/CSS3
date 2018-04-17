var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

//populate 方法可用于文档、模型
var CommentSchema = new Schema({
    movie:{
        type:ObjectId,
        ref:"Movie"
    },
    from:{  
        type:ObjectId,
        ref:"User"
    },
    to:{
        type:ObjectId,
        ref:"User"
    },
    content:String,
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

//保存模式
CommentSchema.pre("save",function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }
    next();
});

//这些方法，在实例化之后才能使用
CommentSchema.statics = {
    //查询列表
    fetch:function(cb){
        return this.find({}).sort("meta.updateAt").exec(cb);
    }
    //通过id查询
    ,findById:function(id,cb){
        return this.findOne({movie:id}).exec(cb);
    }
};

module.exports = CommentSchema;

