var angular = require("./libs/angular");

angular.module('appRoutes',[]).config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
    $routeProvider
    .when('/',{
        templateUrl: '../views/home.html',
        controller: 'MainController'
    })
    
    .when('/students',{
        templateUrl: '../views/student.html',
        controller: 'studentController'
    });
    $locationProvider.html5Mode(true);
}]);