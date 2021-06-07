const express = require('express');

// internal imports
const { getUsers, addUSer, removeUser } = require('../controller/usersController');
const checkLogin = require('../controller/checkLogin');
const avatarUpload = require('../middlewares/users/avatarUpload');
const htmlResponse = require('../middlewares/htmlResponse');
const { userValidator, addUserValidatorHandelar } = require('../middlewares/users/userValidator');

const router = express.Router();

// login page
router.get('/', htmlResponse('Users'), checkLogin, getUsers);

// add user
router.post('/', avatarUpload, userValidator, addUserValidatorHandelar, addUSer);

// delete user
router.delete('/:id', removeUser);

module.exports = router;
