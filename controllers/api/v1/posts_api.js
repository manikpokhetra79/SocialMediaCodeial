const Post = require('../../../models/posts');
const Comment = require('../../../models/comments');
module.exports.index = async function(req,res){

    let posts = await Post.find({}).
        sort('-createdAt').
        populate('user',['-password']).
        populate({
            path : 'comments',
            populate :{
                path : 'user',
                select : ['-password']
            }
        })
    return res.status(200).json({
        message : "List of Posts",
        posts : posts
    });
}


module.exports.destroy =  async function(req,res){
    try {
        let post = await Post.findById(req.params.id);
        console.log(post);
        // if(post.user == req.user.id){
            post.remove();
            console.log(post);
            await Comment.deleteMany({post: req.params.id});
        // }   
        return res.status(200).json({
            message : "Post deleted"
        });;
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Server Error"
        });
    }
  
}