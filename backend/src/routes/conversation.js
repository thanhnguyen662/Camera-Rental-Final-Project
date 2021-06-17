const express = require('express');
const router = express.Router();
const conversationController = require('../app/controllers/ConversationController');
const { verifyUser } = require('../utils/authenticate');

router.get('/:userId', verifyUser, conversationController.findConversation);
router.post('/', verifyUser, conversationController.createConversation);

module.exports = router;
