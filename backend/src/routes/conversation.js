const express = require('express');
const router = express.Router();
const conversationController = require('../app/controllers/ConversationController');
const authMiddleware = require('../firebase/middleware/auth-middleware');

router.get('/:userId', authMiddleware, conversationController.findConversation);
router.post('/', authMiddleware, conversationController.createConversation);

module.exports = router;
