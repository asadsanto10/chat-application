const express = require('express');
const checkLogin = require('../controller/checkLogin');
// internal imports
const { getlogin, loginUser, logOut } = require('../controller/loginController');
const htmlResponse = require('../middlewares/htmlResponse');
const { loginValidator, loginValidatorHandeler } = require('../middlewares/login/loginValidator');

const router = express.Router();

// login page
router.get('/', htmlResponse('Login'), getlogin);

// user login
router.post('/', htmlResponse('Login'), loginValidator, loginValidatorHandeler, loginUser);

// logout
router.delete('/', logOut);

module.exports = router;
