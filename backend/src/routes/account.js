const express = require('express');
const router = express.Router();
const getUserInfoMiddleware = require('../firebase/middleware/getInfo-middleware');
const authMiddleware = require('../firebase/middleware/auth-middleware');
const accountController = require('../app/controllers/AccountController');

router.post(
   '/comment/create',
   authMiddleware,
   accountController.createUserComment
);
router.get('/comment', accountController.getUserComment);
router.get('/getUserByUid', authMiddleware, getUserInfoMiddleware);
router.post('/addUserInfo', authMiddleware, accountController.addUserInfo);
router.get('/getUserProfileByUid', accountController.getUserInfo);
router.get('/getUserStats', accountController.getUserStats);

module.exports = router;
