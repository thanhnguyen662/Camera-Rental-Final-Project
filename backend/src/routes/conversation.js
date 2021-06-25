const express = require('express');
const router = express.Router();
const conversationController = require('../app/controllers/ConversationController');
const { verifyUser } = require('../utils/authenticate');
const authMiddleware = require('../firebase/auth-middleware');

router.get('/:userId', authMiddleware, conversationController.findConversation);
router.post('/', authMiddleware, conversationController.createConversation);

module.exports = router;
