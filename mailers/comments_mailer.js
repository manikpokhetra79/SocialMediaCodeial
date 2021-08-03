const nodemailer = require('../config/nodemailer');

//create a func to send a mail
//email body
exports.newComment = (comment) => {
    // console.log("Inside new comment mailer");

    nodemailer.transporter.sendMail({
        from : 'testingbymanik@gmail.com',
        to:     comment.user.email,
        subject : 'New comment published',
        html :'<h1>Yup, your comment is published</h1>' 
    },(err,info)=>{
        if(err){
            console.log("Error in sending mail",err);
            return;
        }
        console.log("Mail delevered",info);
        return;
    })
}