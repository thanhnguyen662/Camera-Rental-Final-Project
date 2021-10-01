const express = require('express');
const router = express.Router();
const conversationBeta1 = require('../app/controllers/ConversationBeta1Controller');

router.post('/conversation/create', conversationBeta1.createConversation);
router.post('/message/create', conversationBeta1.sendMessage);
router.get('/message', conversationBeta1.getConversationMessages);
router.get('/conversation', conversationBeta1.getConversationOfUser);

module.exports = router;
