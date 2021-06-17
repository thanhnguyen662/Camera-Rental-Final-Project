const express = require('express');
const router = express.Router();
const messageController = require('../app/controllers/MessageController');
const { verifyUser } = require('../utils/authenticate');

router.get('/:conversationId', verifyUser, messageController.findMessage);
router.post('/', verifyUser, messageController.createMessage);

module.exports = router;
