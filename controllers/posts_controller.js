const Post = require('../models/posts');
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