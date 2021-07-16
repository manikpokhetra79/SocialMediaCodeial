const Post = require('../models/posts');
module.exports.home = async function(req,res){
    
    try {
        let posts = await Post.find({}).
        populate('user').
        sort('-createdAt');
        return res.render('home',{
            title: "Codeial | Homepage",
           all_posts : posts
        });
    } catch (error) {
        return res.redirect('back');
    }
    
   
}