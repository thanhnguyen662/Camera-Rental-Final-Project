const express = require('express');
const router = express.Router();
const commentController = require('../app/controllers/CommentController');
const authMiddleware = require('../firebase/middleware/auth-middleware');

router.post('/create', authMiddleware, commentController.addCommentToProduct);

module.exports = router;
