const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const env = require('./environment');
//import user
const User = require('../models/users');

// use new Google passport Strategy
passport.use(
  new googleStrategy(
    {
      //options
      clientID: env.google_clientID,
      clientSecret: env.google_clientSecret,
      callbackURL: env.google_callbackURL,
      passReqToCallback: true,
    },

    function (req, accessToken, refreshToken, profile, done) {
      //find user
      User.findOne({ email: profile.emails[0].value }).exec(function (
        error,
        user
      ) {
        if (error) {
          console.log('Error in google strategy-passport', error);
          return;
        }
        // console.log(profile);
        if (user) {
          //if user found,set this user as req.user
          console.log('User Logged in successfully');
          return done(null, user);
        } else {
          //if not found,create the user and set it as req.user(sign in the user)
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString('hex'),
            },
            function (err, user) {
              if (error) {
                console.log('Error in creating User', error);
                return;
              }
              req.flash('success', 'Registered via Google successfully');
              console.log('User Registered successfully');
              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
