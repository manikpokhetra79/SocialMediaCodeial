const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const crypto = require('crypto');
const User = require('../models/users');
const env = require('./environment');
passport.use(
  new GithubStrategy(
    {
      clientID: env.github_clientID,
      clientSecret: env.github_clientSecret,
      callbackURL: env.github_callbackURL,
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log('error in finding user');
          return;
        }
        if (user) {
          //log in the user
          console.log('User logged in successfully');
          return cb(null, user);
        } else {
          User.create(
            {
              name: profile.name,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString('hex'),
            },
            function (err, user) {
              if (err) {
                console.log('Error in creating User', err);
                return;
              }
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
