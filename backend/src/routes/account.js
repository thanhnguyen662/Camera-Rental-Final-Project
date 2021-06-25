const express = require('express');
const router = express.Router();
const getUserInfoMiddleware = require('../firebase/middleware/getInfo-middleware');
const authMiddleware = require('../firebase/middleware/auth-middleware');

router.get('/getUserByUid', authMiddleware, getUserInfoMiddleware);

module.exports = router;
