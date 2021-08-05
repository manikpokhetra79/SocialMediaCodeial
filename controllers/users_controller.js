const User = require("../models/users");
const fs = require('fs');
const path = require('path');
module.exports.user = function(req,res){
    return res.render('users',{
        title : 'Users Page'
    });
}
// profile page
module.exports.profile = async function(req,res){

    try {
        let user = await User.findById(req.params.id);
        let populated_user = await User.findById(req.user).populate('friendships');
         
         return res.render('user_profile',{
            title: 'Profile Page',
            profile_user : user,
            populated_user
        });
    } catch (error) {
        
    }
   
}
// update profile action
module.exports.update = async function(req,res){
    if(req.user.id == req.params.id){
        try {
            let user = await User.findById(req.params.id);
            // parse data from multidata form
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log("*****Multer error",err);
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){


                    if(user.avatar){
                        //delete previous avatar
                        fs.unlinkSync(path.join(__dirname ,'..',user.avatar))
                    }
                    // saving the path of uploaded file into avatar field in the User
                        user.avatar = User.avatarPath + '/' + req.file.filename;
                    
                }
                user.save();
                return res.redirect('back');
            })

        } catch (error) {
            req.flash('error',error);
            return res.redirect('back');
        }
    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }  
    
}
// action for login page
module.exports.login = function(req,res){
    if(req.user){
        return res.redirect('/');
    }else{
        return res.render('user_login',{
            title : 'Login Page'
        });
    }
    
}
// action for register page
module.exports.register = function(req,res){
    if(req.user){
        return res.redirect('/');
    }else{
    return res.render('user_register',{
        title : 'Register Page'
    });
}
}
// action for create User
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        req.flash('error',"Passwords not same");
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log("Error while checking user email");
            return;
        }
        if(!user){
            //create user
            User.create(req.body,function(err,user){
                if(err){
                    console.log("Error while creating user");
                    return;
                }
                req.flash('success',user.name,"successfully registered");
                return res.redirect('/users/login');
            })
        }else{
            req.flash('success',"User already registered");
            return res.redirect('/users/login');
        }
    });
}

// action for create session

module.exports.createSession = function(req,res){

    req.flash('success',"Logged in successfully");

    return res.redirect('/');
}

// destroy session

module.exports.destroySession = function(req,res){

  req.logout();
  req.flash('success',"Logged Out successfully");
  return res.redirect('/');
}