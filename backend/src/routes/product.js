const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductController');
const authMiddleware = require('../firebase/middleware/auth-middleware');

router.get('/myProduct', productController.getMyProduct);
router.get('/:productSlug', authMiddleware, productController.getProductDetail);
router.post(
   '/createProduct',
   authMiddleware,
   productController.createNewProduct
);
router.get('/', authMiddleware, productController.getProducts);

module.exports = router;
