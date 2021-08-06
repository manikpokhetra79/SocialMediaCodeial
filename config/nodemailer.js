const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

//create transporter : defines how communication is going to take place
let transporter = nodemailer.createTransport({
    service : 'gmail',
    host : 'smtp.gmail.com',
    port : 587,
    secure : false,
    //establish the identity
    auth : {
        user : 'dummyemail',
        pass : 'dummypass'
    }
});

//define the template rendering engine and its path
let renderTemplate = (data,relativePath) => {
let mailHtml ;
ejs.renderFile(
    path.join(__dirname,'../views/mailers',relativePath),
    data,
    function(err,template){
    if(err){
        console.log("Error in rendering template",err);
        return;
           }
    mailHtml = template;
    }           
            )
    return mailHtml;
}

module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}