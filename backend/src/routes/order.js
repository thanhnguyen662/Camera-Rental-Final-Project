const express = require('express');
const router = express.Router();
const orderController = require('../app/controllers/OrderController');

router.post('/createOrder', orderController.createOrder);
router.delete('/deleteOrder', orderController.deleteOrder);
router.get('/manageOrder', orderController.manageOrder);
router.get('/myProductInOrder', orderController.myProductInOrder);

module.exports = router;
