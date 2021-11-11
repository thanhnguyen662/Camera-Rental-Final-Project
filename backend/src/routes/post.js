const express = require('express');
const router = express.Router();
const authMiddleware = require('../firebase/middleware/auth-middleware');
const postController = require('../app/controllers/PostController');

router.get('/stats/user', postController.getUserSocialStats);
router.post(
   '/create/comment',
   authMiddleware,
   postController.createPostComment
);
router.patch(
   '/update/add',
   authMiddleware,
   postController.updateAddToCartCount
);
// router.get('/detail', postController.getPostById);
router.get('/latest', postController.getLatestPost);
router.get('/comments', postController.getCommentInPost);
router.post('/create', authMiddleware, postController.createNewPost);
router.patch('/like', authMiddleware, postController.likePost);
router.patch('/unlike', authMiddleware, postController.unlikePost);
router.get('/', postController.getPost);

module.exports = router;
