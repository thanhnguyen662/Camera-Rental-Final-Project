const express = require('express');
const router = express.Router();
const messageController = require('../app/controllers/MessageController');
const authMiddleware = require('../firebase/auth-middleware');

router.get('/:conversationId', authMiddleware, messageController.findMessage);
router.post('/', authMiddleware, messageController.createMessage);

module.exports = router;
