var app = angular.module('myApp', []);

 app.controller('myController', ['$scope', '$http',function($scope, $http){
  $http.get('/user/profile')
    .sucsess(function(data,status,headers,config){
        $scope.user = data;
        $scope.error = "";
    });
 }]);

function CommentObj ($http){
    this.getComment = function(commentId,callback){
        $http.get('/comments/get',{params:{commentId:commentId}})
        .success(function(data,status,headers,config){
            callback(null,data);
        })
        .error(function(data,status,headers,config){
            callback(data,{});
        });
    };
    this.addComment = function(rootCommentId,parentId, newComent,callback){
        $http.post('/comments/add',{rootCommentId:rootCommentId,parentCommentId:parentId,newComent:newComent})
        .success(function(data,status,header,config){
            callback(null,data);
        })
        .error(function(data,status,headers,config){
        });
    };
}

app.service('commentSrv',['$http', CommentObj]);

app.controller('photoCtrl',['$scope','$http','commentSrv',function($scope,$http,commentSrv){
    $http.get('/photos')
    .success(function(data,status,header,config){
        $scope.photos = data;
        $scope.photo = $scope.photos[0];
        $scope.loadComment();
        $scope.msg ="sucess";
    })
    .error(function(data,status,headers,config){
        $scope.photos = [];
        $scope.msg = "Error";
    });
    $scope.loadComments = function(){
        commentSrv.getComment($scope.photo.commentId,function(err,comment){
            if(err){
                $scope.commentThread = {};
            } else {
                $scope.commentThread = comment;
            }
        });
    };
    $scope.addReply = function(parentCommentId, subject,body){
        var newComent = {subject:subject, body:body};
        commentSrv.addComment($scope.commentThread._id, parentCommentId,newComent,function(err,comment){
            $scope.loadComments();
        });
    };
    $scope.setPhoto = function(photoId){
        $http.get('/photo',{params:{photoId:photoId}})
        .success(function(data,status,headers,config){
            $scope.photo = data;
            $scope.loadComments();
        });
    };
}]);

app.controller('pagesCtrl',['$scope','$http','commentSrv',function($scope,$http,commentSrv){
    $http.get('/page',{params:{pageName:"Photos Page"}})
    .success(function(data,status,headers,config){
        $scope.page = data;
        $scope.loadComments();
    })
    .error(function(data,status,headers,config){
        $scope.Page = {};
    });
    $scope.addReply = function(parentCommentId,subject,body){
        var newComent = {subject:subject, body:body};
        commentSrv.addComment($scope.commentThread._id, parentCommentId, newComent, function(err,comment){
            $scope.loadComments();
        });
    };
    $scope.loadComments = function(){
        commentSrv.getComment($scope.page.commentId,function(err, comment){
            if(err){
                $scope.commentThread = {};
            } else {
                $scope.commentThread = comment;
            }
        });
    };
}]);
 