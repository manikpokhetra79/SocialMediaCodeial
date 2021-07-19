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
        if(req.xhr){
            comment = await comment.populate('user','name').execPopulate();
            return res.status(200).json({
                data : {
                    comment : comment
                },
                message : "Comment created"
            })
        }
        req.flash('success',"Comment created");
        console.log(post);
    }else{
        req.flash('error',"Post doesn't exist");
    }
    return res.redirect('back');
   } catch (error) {
    req.flash('error',"error");
    return res.redirect('back');
   }
}


// destroy
module.exports.destroy = async function(req,res){
    try {
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();
            let post = await Post.findByIdAndUpdate(postId,{
                $pull : {
                    comments : req.params.id
                }
            });
            if(req.xhr){
                return res.status(200).json({
                    data : {
                        comment_id : req.params.id
                    },
                    message : "Comment deleted"
                })
            }
            req.flash("Comment deleted");
            return res.redirect('back');
        }else{
            req.flash('error',"console.log('error','Unauthorized attempt to  delete comments');");
          
          return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}