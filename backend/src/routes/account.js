const express = require('express');
const router = express.Router();
const getUserInfoMiddleware = require('../firebase/middleware/getInfo-middleware');
const authMiddleware = require('../firebase/middleware/auth-middleware');
const accountController = require('../app/controllers/AccountController');

router.get('/getUserByUid', authMiddleware, getUserInfoMiddleware);
router.post('/addUserInfo', accountController.addUserInfo);
router.get('/getUserProfileByUid', accountController.getUserInfo);

module.exports = router;
