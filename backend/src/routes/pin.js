const express = require('express');
const router = express.Router();
const authMiddleware = require('../firebase/middleware/auth-middleware');
const pinController = require('../app/controllers/PinController');

router.get('/getAllPins', pinController.getAllPins);
router.get('/getPin', pinController.getPinInDistrict);
router.get('/getSearch', pinController.getSearch);

module.exports = router;
