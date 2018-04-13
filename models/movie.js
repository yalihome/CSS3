var mongoose = require("mongoose");
var MovieSchema = require("../schemas/movie");
var Movie = mongoose.model("Movie",MovieSchema);
//模型
models.exports = Movie;