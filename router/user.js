const express = require('express');

// internal imports
const { getUsers } = require('../controller/usersController');
const avaterUpload = require('../middlewares/avaterUpload');
const htmlResponse = require('../middlewares/htmlResponse');
const { userValidator, addUserValidatorHandelar } = require('../middlewares/userValidator');

const router = express.Router();

// login page
router.get('/', htmlResponse('Users'), getUsers);

// add user
router.post('/', avaterUpload, userValidator, addUserValidatorHandelar);

module.exports = router;
