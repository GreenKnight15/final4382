var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
methodOverride = require("method-override"),
mongoose = require("mongoose");

var db = require('./config/db');

var port = process.env.PORT;
var host = process.env.IP;

mongoose.connect("mongodb://" + host +"/" + port);

var Student = require('./app/models/student');

app.use(bodyParser.json());

app.use(bodyParser.json({type:'application/vnd.api+json' }));

app.use(bodyParser.urlencoded({extended:true}));

app.use(methodOverride('X-HTTP-Method-Override'));

app.use(express.static(__dirname + '/public'));

require("./app/routes")(app);

app.listen(port);

console.log("Stuff happens on port " + port);

exports = module.exports = app;