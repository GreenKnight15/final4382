var Student = require("./models/student");
var express = require("express");
var router = express.Router();
var crypto = require("crypto");


module.exports = function(app){
 ///Authentication   
    
    var users = require("../public/js/controllers/user_controller");
    
    app.use('./public', express.static('./public')).
      //  use('/lib',express.static('../lib')).
        use('/images',express.static('../public'));
        
    app.get('/',function(req,res){
        if(req.session.user){
            res.render('index',{username: req.session.username, msg:req.session.msg});
        }else{
            req.session.msg = 'Access denied!';
            res.redirect('/login');
        }
    }),
    app.get('/user', function(req,res){
        if(req.session.user){
            res.render('user',{msg:req.session.msg});
        } else {
            req.session.msg = 'Access denied!';
            res.redirect('/login');
        }
    }),
    
    app.get('/signup',function(req, res) {
        if(req.session.user){
            res.redirect('/');
        }
        res.render('signup',{msg:req.session.msg});
    }),
    
    app.get('/login',function(req, res) {
        if(req.session.user){
            res.redirect('/');
        }
        res.render('login',{msg:req.session.msg});
    }),
    
    app.get('/logout', function(req, res) {
        req.session.destroy(function(){
            res.redirect('/login');
        });
    });
    
    
    app.post('/signup', users.signup);
    app.post('/user/update', users.updateUser);
    app.post('/user/delete',users.deleteUser);
    app.post('/login', users.login); 
    app.get('/user/profile',users.getUserProfile);
///// end of authintication

//Comment Thread

var photos = require("../public/js/controllers/photoCtrl");
var pages = require("../public/js/controllers/pagesCtrl");
var comments = require("../public/js/controllers/commentsCtrl");

app.get('/photos',photos.getPhotos);
app.get('/photo', photos.getPhoto);
app.get('/page',pages.getPage);
app.get('/comments/get',comments.getComment);
app.get('/comments/add',comments.addComment);
//End of comment thread




//     app.get('/api/students',function(req,res){
//         Student.find(function(err,student){
//             if(err){
//                 res.send(err);
//                 res.json(student);
//             }
//         });
//     });
    
//     app.use(function(req,res, next){
//         console.log("Somthing is happening");
//         next();
//     });
    
//     router.get('/', function(req, res) {
// 	res.json({ message: 'hooray! welcome to our api!' });	
// });
    
//  // (create student)
//     router.route('/students')
//         .post(function(req,res){
            
//             var student = new Student({student_id:000001,fname:"James",lname:'Ritter',age:21,birthday:07/01/1993});
//             student.fname = req.body.fname;
            
//             student.save(function(err){
//                 if(err){
//                     res.send(err);
//                     }
//                 else res.send({message:'Student has been created'});
//             });
            
//         })
//         //get all students
//         .get(function(req, res) {
// 		Student.find(function(err, student) {
// 			if (err){
// 				res.send(err);
// 			}
// 			else res.json(student);
// 		});
// 	});

//     router.route('/students/:student_id')    
//     //get student by id
//         .get(function(req,res){
//             Student.find(req.params.student_id,function(err,student){
//                 if(err){
//                     res.send(err);
//                 }
//                 else res.json(student);
//             });
//         })
//          //updateing student
//         .put(function(req,res){
//             Student.find(req.params.student_id,function(err,student){
//                 if(err){
//                     res.send(err);
//                 }
                
//                 student.fname = req.body.fname;
                
//                 student.save(function(err){
//                   if(err){
//                     res.send(err);
//                 }
//                 else res.json({message: "Student Updated"});
//                 });
//             });
//         })
//         //deleting by id
//         .delete(function(req,res){
//             Student.remove({
//                 student_id: req.params.student_id
//             }, function(err,student){
//                 if (err){
// 				res.send(err);
//                 }
// 			else res.json({ message: 'Successfully deleted' });
//             });
//         });
    
    
    
//   app.use('/api',router);
//      // route to handle delete goes here (app.delete)
    
//     app.get('*',function(req,res){
//         res.sendfile('./public/views/index1.html');
//     });
    
};
