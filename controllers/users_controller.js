const User = require("../models/users");

module.exports.user = function(req,res){
    return res.render('users',{
        title : 'Users Page'
    });
}
// profile page
module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title: 'Profile Page',
            profile_user : user
        });
    })
}
// update profile action
module.exports.update = async function(req,res){

    if(req.user.id == req.params.id){
        try {
            let user = await User.findByIdAndUpdate(req.params.id,req.body);
            console.log("Profile details successfully updated");
            return res.redirect('back');
        } catch (error) {
            console.log(error);
            return res.redirect('back');
        }
    }else{
        console.log('error', 'Unauthorized!');
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