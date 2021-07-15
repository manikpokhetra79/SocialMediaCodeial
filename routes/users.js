const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
router.get('/',usersController.user);
// route for login and register page
router.get('/login',usersController.login);
router.get('/register',usersController.register);
router.post('/create',usersController.create);
module.exports = router;
