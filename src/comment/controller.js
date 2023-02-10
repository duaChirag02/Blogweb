const {Comment} = require ("./model");

const createComment = async (request,response) =>{
    
    var comment={comment:request.body.comment,user_id:request.body.user_id,blog_id:request.query.blog_id};
    var createdComment = await Comment.create(comment); 

    return response.json({"status":"comment added",createdComment});

}

const readComment = async (request,response) =>{

    var comments = await Comment.find({blog_id:request.query.blog_id});

    return response.json({"status":"Success",comments});
    
}
const updateComment = async (request,response) =>{
    var comment = await Comment.findOne({_id:request.query.comment_id});
    if(!comment){
        return response.json({"status":"comment does not exist!"});
    }
    
    if(comment.user_id!=request.body.user_id._id){  
        return response.json({"status":"User not authenticated to update this comment!"});
    }

    comment.comment=request.body.comment;

    var newComment = await comment.save();

    return response.json({"status":"comment updated",newComment});

}
const deleteComment = async (request,response) =>{
    var comment = await Comment.findOne({_id:request.query.comment_id});
    if(!comment){
        return response.json({"status":"comment does not exist!"});
    }
    if(comment.user_id!=request.body.user_id._id){  
        return response.json({"status":"User not authenticated to delete this comment!"});
    }

    var deletedComment = await Comment.findByIdAndDelete(comment._id);

    return response.json({"status":"comment deleted", deletedComment});

}

module.exports = {createComment,readComment,updateComment,deleteComment};
