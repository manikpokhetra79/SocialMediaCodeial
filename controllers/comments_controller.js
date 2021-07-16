const Post = require('../models/posts');
const Comment = require('../models/comments');

module.exports.create = async function(req,res){
   try {
    let post = await Post.findById(req.body.post);
    if(post){
        let comment = await Comment.create({
            content: req.body.content,
            user : req.user._id,
            post : req.body.post
        });
        //push comment to post , then save the post
        await post.comments.push(comment);
        await post.save();
        console.log(post);
    }else{
        console.log("Post doesn't exist");
    }
    return res.redirect('back');
   } catch (error) {
       console.log(error);
    return res.redirect('back');
   }
}