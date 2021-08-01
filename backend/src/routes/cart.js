const express = require('express');
const router = express.Router();
const cartController = require('../app/controllers/CartController');

router.get('/getCart', cartController.getCart);
router.post('/addProductToCart', cartController.addProductToCart);
router.patch('/editProductTime', cartController.editTimeOfProduct);
router.delete('/removeItemFromCart', cartController.removeItemFromCart);

module.exports = router;
