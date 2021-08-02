const express = require('express');
const router = express.Router();
const orderController = require('../app/controllers/OrderController');

router.post('/createOrder', orderController.createOrder);

module.exports = router;
