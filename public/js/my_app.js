var angular = require("../libs/angular");

angular.module('myApp', []).
 controller('myController', ['$scope', '$http',function($scope, $http){
  $http.get('/user/profile')
    .sucsess(function(data,status,headers,config){
        $scope.user = data;
        $scope.error = "";
    });
 }]);