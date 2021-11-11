const express = require('express');
const router = express.Router();
const conversationBeta1 = require('../app/controllers/ConversationBeta1Controller');
const authMiddleware = require('../firebase/middleware/auth-middleware');

router.post(
   '/conversation/create',
   authMiddleware,
   conversationBeta1.createConversation
);
router.post('/message/create', authMiddleware, conversationBeta1.sendMessage);
router.get(
   '/message',
   authMiddleware,
   conversationBeta1.getConversationMessages
);
router.get(
   '/conversation',
   authMiddleware,
   conversationBeta1.getConversationOfUser
);

module.exports = router;
