const Post = require('../models/posts');
const Comment = require('../models/comments');
const postsMailer = require('../mailers/posts_mailer');
const queue = require('../config/kue');
const postEmailWorker = require('../workers/posts_email_worker');
const Like = require('../models/likes');

module.exports.create = async function(req,res){
try {
    let post = await Post.create({
        content: req.body.content,
        user : req.user._id
    });
    // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
    post = await post.populate('user','name email').execPopulate();
    // create a new job for post queue
    let job = queue.create('newPosts',post).save(function(err){
        if(err){
            console.log("Error in sending to the queue",err);
            return;
        }
        console.log("Job enqueued",job.id);
    })
    if(req.xhr){
        return res.status(200).json({
        data : {
            post : post
        },
        message : {
            message : "Post created" 
        }
        })
    }
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
    //delete the associated likes for the post and all its comments' likes too  
    await Like.deleteMany({likeable: post, onModel: 'Post'}); //delete likes from post (object,reference);
    await Like.deleteMany({_id: {$in: post.comments}}); // selects document in collection where _id holds the post.comment
    post.remove();
    
    await Comment.deleteMany({post: req.params.id});

        if (req.xhr){
            return res.status(200).json({
                data: {
                    post_id: req.params.id
                },
                message: "Post deleted"
            });
        }
    }   
    return res.redirect('back');
} catch (error) {
    console.log(error);
    return res.redirect('back');
}

}