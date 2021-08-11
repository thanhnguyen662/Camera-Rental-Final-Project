const express = require('express');
const router = express.Router();
const commentController = require('../app/controllers/CommentController');

router.post('/create', commentController.addCommentToProduct);

module.exports = router;
