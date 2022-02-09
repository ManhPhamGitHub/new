const  mongoose  = require("mongoose");

const todoSchema = mongoose.Schema({
    title : String,
    img: Array
})

const todoMode = mongoose.model('todoImg',todoSchema)
module.exports = todoMode
// 61cbbdfa2aff5c38d4704652