const Post = require('../models/posts');
const Comment = require('../models/comments');
module.exports.create = async function(req,res){
    try {
        let post = await Post.create({
            content: req.body.content,
            user : req.user._id
        });
        console.log("Post successfully created",req.body.content);
        return res.redirect('back');
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

module.exports.destroy =  async function(req,res){
    try {
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();
            console.log(post);
            await Comment.deleteMany({post: req.params.id});
        }
        return res.redirect('back');
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
  
}