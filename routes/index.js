const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_Controller');
router.get('/',homeController.home);
// route for /users
router.use('/users',require('./users'));
module.exports = router;



