const express = require('express');
// internal imports
const { getInbox } = require('../controller/inboxController');
const { checkLogin } = require('../middlewares/checkLogin');
const htmlResponse = require('../middlewares/htmlResponse');

const router = express.Router();

// login page
router.get('/', htmlResponse('Inbox'), checkLogin, getInbox);

module.exports = router;
