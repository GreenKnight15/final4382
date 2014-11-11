var Student = require("./models/student");

module.exports = function(app){
    
    app.get('/api/students',function(req,res){
        Student.find(function(err,students){
            if(err){
                res.send(err);
                res.json(students);
            }
        });
    });
    
    
     // route to handle creating goes here (app.post)
     // route to handle delete goes here (app.delete)
    
    app.get('*',function(req,res){
        res.sendfile('./public/views/index.html');
    });
    
};