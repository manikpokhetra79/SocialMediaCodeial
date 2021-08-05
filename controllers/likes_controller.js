const Like = require('../models/likes');
const Post = require('../models/posts');
const Comment = require('../models/comments');

module.exports.toggleLike = async function(req,res){

try {
  // likes/toggle/?id=asdds&type=Post/Comment
  let likeable ;
  let deleted = false;

  if(req.query.type == "Post"){
  likeable = await Post.findById(req.query.id).populate('likes');
  }else{
    likeable = await Comment.findById(req.query.id).populate('likes');
  }

  //check if like already exists
  let existingLike = await Like.findOne({
      likeable : req.query.id,
      onModel : req.query.type,
      user : req.user._id
  });
  // if like already exists, pull like
  if(existingLike){
      likeable.likes.pull(existingLike._id); // pull like from type array
      likeable.save();
      existingLike.remove();
      deleted = true;

  }else{
      //else make a new like ie push like
      let newLike = await Like.create({
          user : req.user._id,
          likeable : req.query.id,
          onModel : req.query.type
      });
      //push like id into the parent object likes array
      likeable.likes.push(newLike._id);
      likeable.save();
  }
  
  return res.status(200).json({
      message : "Request Successful",
      data : {
          deleted : deleted
      }
  });
  
} catch (error) {
  
      console.log(error);
      return res.status(500).json({
          message : "Internal Error"
      });
}
}