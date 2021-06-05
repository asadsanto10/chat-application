const express = require('express');
// internal imports
const { getUsers } = require('../controller/usersController');
const htmlResponse = require('../middlewares/htmlResponse');

const router = express.Router();

// login page
router.get('/', htmlResponse('Users'), getUsers);

module.exports = router;
