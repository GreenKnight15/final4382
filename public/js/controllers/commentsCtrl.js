var mongoose = require("mongoose"),
    CommentThread = mongoose.model('CommentThread'),
    Reply = mongoose.model('Reply');

exports.getComment = function(req,res){
    CommentThread.findOne({_id: req.query.commentId})
    .exec(function(err,comment){
        if(!comment){
            res.json(404,{msg: "CommentThread Not found"});
        } else {
            res.json(comment);
        }
    });
};

exports.addComment = function(req,res){
    CommentThread.findOne({_id: req.body.rootCommentId})
    .exec(function(err, commentThread) {
        if(!commentThread){
            res.json(404,{msg: "CommentThread Not Found"});
        } else {
            var newComment = Reply(req.body.newComment);
            addComment(req,res, commentThread, commentThread,
            req.body.parentCommentId, newComment);
            
            var User = mongoose.model('User');
            User.findOne({_id: req.session.user})
            .exec(function(err,user){
            newComment.username = user.username
            });
        }
    });
};

function addComment(req,res, commentThread,currentComment, parentId,newComment){
    if(commentThread.id == parentId){
        commentThread.replies.push(newComment);
    } else {
        for (var i=0; i < currentComment.replies.length;i++){
            var c = currentComment.replies[i];
            if(c._id == parentId){
                c.replies.push(newComment);
                var replyThread = commentThread(req,res, commentThread);
                updateCommentThread(req,res,commentThread);
                break;
            } else {
                addComment(req,res,commentThread,c,parentId,newComment);
            }
        }
    }
}

function updateCommentThread(req,res, commentThread){
    CommentThread.update({_id:commentThread.id},
    {$set:{replies:commentThread.replies}})
    .exec(function(err,savedComment){
        if(err){
            res.json(404,{msg:"Failed to update commentThread"});
        } else {
            res.json({msg:"Updated Successfully"});
        }
    });
}




