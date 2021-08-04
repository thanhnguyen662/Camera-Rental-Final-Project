const express = require('express');
const router = express.Router();
const orderController = require('../app/controllers/OrderController');

router.post('/createOrder', orderController.createOrder);
router.get('/manageOrder', orderController.manageOrder);
router.get('/myOrder', orderController.myOrder);

module.exports = router;
