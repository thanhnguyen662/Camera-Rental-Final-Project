const express = require('express');
const router = express.Router();
const conversationBeta1 = require('../app/controllers/ConversationBeta1Controller');

router.get('/message', conversationBeta1.getConversationMessages);
router.get('/conversation', conversationBeta1.getConversationOfUser);

module.exports = router;
