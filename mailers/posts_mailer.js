const nodemailer = require('../config/nodemailer');

exports.newPost = (post) => {

    let htmlString = nodemailer.renderTemplate({post : post},'/posts/new_posts.ejs');
    nodemailer.transporter.sendMail({
        from : 'dummy@gmail.com',
        to:     post.user.email,
        subject : 'New Post published Successfully',
        html : htmlString
    },(err,info)=>{
        if(err){
            console.log("Error in sending mail",err);
            return;
        }
        // console.log("Mail delevered",info);
        return;
    })
}