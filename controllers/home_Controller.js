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
            }
        })
        let users = await User.find({});
        return res.render('home',{
            title: "Codeial | Homepage",
           all_posts : posts,
           users : users
        });
    } catch (error) {
        return res.redirect('back');
    }
    
   
}