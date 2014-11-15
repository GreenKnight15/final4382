var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
cookieParser = require("cookie-parser"),
expressSession = require("express-session"),
mongoStudent = require("connect-mongo")({session: expressSession}), //mongoStore
methodOverride = require("method-override"),
mongoose = require("mongoose");

require("./app/models/users.js");

var db = require('./config/db');

var Student = require('./app/models/student');

var port = process.env.PORT;
var host = process.env.IP;

mongoose.connect("mongodb://" + host +"/" + port)

app.engine('.html',require("ejs").__express);

app.set('views', __dirname + '/public/views');

app.set('view engine', 'html');

app.use(cookieParser());

app.use(expressSession({
    secret: 'SECRET',
    cookie: {maxAge: 60*60*1000},
    store: mongoStudent({
        db: mongoose.connection.db,
        collection: 'session'
    })
}));

app.use(bodyParser.json());

app.use(bodyParser.json({type:'application/vnd.api+json' }));

app.use(bodyParser.urlencoded({extended:true}));

app.use(methodOverride('X-HTTP-Method-Override'));

app.use(express.static(__dirname + '/public'));

require("./app/routes")(app);

app.listen(port);

console.log("Stuff happens on port " + port);

exports = module.exports = app;