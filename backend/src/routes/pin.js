const express = require('express');
const router = express.Router();
const authMiddleware = require('../firebase/middleware/auth-middleware');
const pinController = require('../app/controllers/PinController');

router.get('/getAllPins', authMiddleware, pinController.getAllPins);

module.exports = router;
