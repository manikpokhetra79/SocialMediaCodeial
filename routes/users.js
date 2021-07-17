const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller');
router.get('/',usersController.user);
router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/profile/update/:id',passport.checkAuthentication,usersController.update);
// route for login and register page
router.get('/login',usersController.login);
router.get('/register',usersController.register);
router.post('/create',usersController.create);
// use passport as a middleware to auth user
router.post('/create-session',passport.authenticate(
    'local',{
        failureRedirect : '/users/login'
    }
),usersController.createSession);
// destroySession
router.get('/destroy-session',usersController.destroySession)
module.exports = router;
