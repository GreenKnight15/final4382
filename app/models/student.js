var mongoose = require("mongoose");

module.exports = mongoose.model('Student',{
fname:String,
lname:String,
age:Number,
birthday:Date,
});