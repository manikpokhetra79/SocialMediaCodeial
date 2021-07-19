// configure passport
//Authentication strategies
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/users');

// local Strategy for authentication
passport.use(new localStrategy(
    // parameter
    {
        usernameField  : 'email',
        passReqToCallback : true 
    },
    function(req,email,password,done){
        User.findOne({email : email},function(err,user){
            if(err){
                return done(err);
            }
            if(!user || user.password != password){
                req.flash('error',"Invalid E-mail or Password !");
                // console.log("Invalid E-mail or Password !");
                return done(null,false);
            }
            // if credentials are valid, provide call with the user that is authenticated
            console.log("User Authenticated");
            return done(null,user);
        });
    }
));

passport.serializeUser(function(user,done){
     done(null,user.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("error in finding user");
            return done(err);
        }
        done(err,user);
    })
});

//create middlewares
passport.checkAuthentication = function(req,res,next){
    //if user signed in , pass user to function
    if(req.isAuthenticated()){
        return next();
    }else{
        return res.redirect('/users/login');
    }
}
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;