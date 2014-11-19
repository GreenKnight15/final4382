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

require("./app/models/comment.js");
require("./app/models/page.js");
require("./app/models/photo.js");

var CommentThread = mongoose.model('CommentThread');

var Reply  = mongoose.model('Reply');

var Photo = mongoose.model('Photo');

var Page = mongoose .model('Page');

function addPhoto(title,filename){
    var comment = new CommentThread({title: title + " Comments"});
    comment.save(function(err,comment){
    var photo = new Photo({title:title,filename:filename});
    photo.commentId = comment.id;
    photo.save(function(){
        console.log(title + " Saved.");
     });
    });
}

CommentThread.remove().exec(function(){
    Photo.remove().exec(function(){
        Page.remove().exec(function(){
            var comment = new CommentThread({title:"Photo Page Comments"});
            comment.save(function(err,comment){
                var page = new Page({name:"Photo Page"});
                page.commentId = comment.id;
                page.save();
            });
            addPhoto('James', 'rally_img.jpeg');
        });
    });
});

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