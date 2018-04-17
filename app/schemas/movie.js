var mongoose = require("mongoose");
//建模
var MovieSchema = new mongoose.Schema({
    doctor:String,
    title:String,
    language:String,
    country:String,
    summary:String,
    flash:String,
    poster:String,
    year:Number,
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
MovieSchema.pre("save",function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }
    next();
});

//这些方法，在实例化之后才能使用
MovieSchema.statics = {
    //查询列表
    fetch:function(cb){
        return this.find({}).sort("meat.updateAt").exec(cb);
    }
    //通过id查询
    ,findById:function(id,cb){
        return this.findOne({_id:id}).exec(cb);
    }
};

module.exports = MovieSchema;
