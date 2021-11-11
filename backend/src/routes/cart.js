const express = require('express');
const router = express.Router();
const cartController = require('../app/controllers/CartController');
const authMiddleware = require('../firebase/middleware/auth-middleware');

router.get('/getCart', authMiddleware, cartController.getCart);
router.post(
   '/addProductToCart',
   authMiddleware,
   cartController.addProductToCart
);
router.patch(
   '/editProductTime',
   authMiddleware,
   cartController.editTimeOfProduct
);
router.delete(
   '/removeItemFromCart',
   authMiddleware,
   cartController.removeItemFromCart
);

module.exports = router;
