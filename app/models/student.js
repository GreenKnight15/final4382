var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Student = new Schema({
student_id:Number, 
fname:String,
lname:String,
age:Number,
birthday:Date,
});


var student = module.exports = mongoose.model('Student',Student);

//({fname:"James",lname:'Ritter',age:21,birthday:07/01/1993})