const express = require('express');
const router = express.Router();
const messageController = require('../app/controllers/MessageController');
const authMiddleware = require('../firebase/middleware/auth-middleware');

router.get('/beta/:conversationId', messageController.findMessageBeta);
router.get('/:conversationId', authMiddleware, messageController.findMessage);
router.post('/', authMiddleware, messageController.createMessage);

module.exports = router;
