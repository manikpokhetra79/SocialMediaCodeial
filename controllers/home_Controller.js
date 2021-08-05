const Post = require('../models/posts');
const User = require('../models/users');
module.exports.home = async function(req,res){
    try {
        let posts = await Post.find({}).
        sort('-createdAt').
        populate('user').
        populate({
            path : 'comments',
            populate :{
                path : 'user'
            },
            populate :{
                path : 'likes'
            }
        }).populate('likes');

        let users = await User.find({});
        let user;
        if(req.user){
            user = await User.findById(req.user._id)
            .populate({
                path : 'friendships',
                populate : {
                    path : 'from_user',
                    select : ['name',"id","avatar"]
                }
            })
            .populate({
                path : 'friendships',
                populate : {
                    path : 'to_user',
                    select : ['name',"id","avatar"]
                }
            })
        }
        
        return res.render('home',{
           title: "Codeial | Homepage",
           all_posts : posts,
           users : users,
           user: user
        });
    } catch (error) {
        return res.redirect('back');
    }
    
   
}