var angular = require("libs/angular");

angular.module('StudentService',[]).factory('Student',['$http',function($http){
    return{
        get : function(){
            return $http.get('/api/students');
        },
        create : function(studentData){
            return $http.post('/api/students',studentData);
        },
        delete : function(id) {
            return $http.delete('/api/students' + id);
        }
    };
}]);