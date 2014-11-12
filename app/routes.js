var Student = require("./models/student");
var express = require("express");
var router = express.Router();

module.exports = function(app){
    
    app.get('/api/students',function(req,res){
        Student.find(function(err,student){
            if(err){
                res.send(err);
                res.json(student);
            }
        });
    });
    
    app.use(function(req,res, next){
        console.log("Somthing is happening");
        next();
    });
    
    router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});
    
 // (create student)
    router.route('/students')
        .post(function(req,res){
            
            var student = new Student({student_id:000001,fname:"James",lname:'Ritter',age:21,birthday:07/01/1993});
            student.fname = req.body.fname;
            
            student.save(function(err){
                if(err){
                    res.send(err);
                    }
                else res.send({message:'Student has been created'});
            });
            
        })
        //get all students
        .get(function(req, res) {
		Student.find(function(err, student) {
			if (err){
				res.send(err);
			}
			else res.json(student);
		});
	});

    router.route('/bears/:bear_id')    
    //get student by id
        .get(function(req,res){
            Student.find(req.params.student_id,function(err,student){
                if(err){
                    res.send(err);
                }
                else res.json(student);
            });
        })
         //updateing student
        .put(function(req,res){
            Student.find(req.params.student_id,function(err,student){
                if(err){
                    res.send(err);
                }
                
                student.fname = req.body.fname;
                
                student.save(function(err){
                   if(err){
                    res.send(err);
                }
                else res.json({message: "Student Updated"});
                });
            });
        })
        //deleting by id
        .delete(function(req,res){
            Student.remove({
                student_id: req.params.student_id
            }, function(err,student){
                if (err){
				res.send(err);
                }
			else res.json({ message: 'Successfully deleted' });
            });
        });
    
    
    
  app.use('/api',router);
     // route to handle delete goes here (app.delete)
    
    app.get('*',function(req,res){
        res.sendfile('./public/views/index.html');
    });
    
};
