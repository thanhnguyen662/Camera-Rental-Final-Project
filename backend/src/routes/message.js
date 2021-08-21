const express = require('express');
const router = express.Router();
const messageController = require('../app/controllers/MessageController');
const authMiddleware = require('../firebase/middleware/auth-middleware');

router.get('/beta/:conversationId/:page', messageController.findMessageBeta);
router.post('/', authMiddleware, messageController.createMessage);

module.exports = router;
