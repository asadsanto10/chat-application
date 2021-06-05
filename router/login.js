const express = require('express');
// internal imports
const { getlogin } = require('../controller/loginController');
const htmlResponse = require('../middlewares/htmlResponse');

const router = express.Router();

// login page
router.get('/', htmlResponse('Login'), getlogin);

module.exports = router;
