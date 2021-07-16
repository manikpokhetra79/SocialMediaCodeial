const User = require("../models/users");

module.exports.user = function(req,res){
    return res.render('users',{
        title : 'Users Page'
    });
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
        console.log("Password not same");
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
                console.log(user.name,"successfully registered");
                return res.redirect('/users/login');
            })
        }else{
            console.log("User already registered");
            return res.redirect('/users/login');
        }
    });
}

// action for create session

module.exports.createSession = function(req,res){

    return res.redirect('/');
}

// destroy session

module.exports.destroySession = function(req,res){

  req.logout();
  return res.redirect('/');
}