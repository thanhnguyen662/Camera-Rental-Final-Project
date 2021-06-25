const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductController');
const authMiddleware = require('../firebase/middleware/auth-middleware');

router.get('/', authMiddleware, productController.getProducts);
router.get('/:productSlug', authMiddleware, productController.getProductDetail);
router.post(
   '/createProduct',
   authMiddleware,
   productController.createNewProduct
);

module.exports = router;
