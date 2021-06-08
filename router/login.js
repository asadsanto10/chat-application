const express = require('express');

// internal imports
const { getlogin, loginUser, logOut } = require('../controller/loginController');
const { redirectLoggedInUser } = require('../middlewares/checkLogin');
const htmlResponse = require('../middlewares/htmlResponse');
const { loginValidator, loginValidatorHandeler } = require('../middlewares/login/loginValidator');

const router = express.Router();

// login page
router.get('/', htmlResponse('Login'), redirectLoggedInUser, getlogin);

// user login
router.post('/', htmlResponse('Login'), loginValidator, loginValidatorHandeler, loginUser);

// logout
router.delete('/', logOut);

module.exports = router;
