const nodemailer = require('../config/nodemailer');
//create a func to send a mail
//email body
exports.newComment = (comment) => {
    // console.log("Inside new comment mailer");
    let htmlString = nodemailer.renderTemplate({comment : comment},'/comments/new_comment.ejs');

    nodemailer.transporter.sendMail({
        from : 'dummy@gmail.com',
        to:     comment.user.email,
        subject : 'New comment published',
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