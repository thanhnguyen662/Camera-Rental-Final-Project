const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductController');
const authMiddleware = require('../firebase/middleware/auth-middleware');

router.get('/topRenting', productController.getTopRenting);
router.get('/myProduct', productController.getMyProduct);
router.get(
   '/orderItemsIncludeProduct',
   productController.getOrderIncludeProductInDay
);
router.post(
   '/createProduct',
   authMiddleware,
   productController.createNewProduct
);
router.patch('/update', productController.updateProduct);
router.get('/:productSlug', authMiddleware, productController.getProductDetail);
router.get('/', authMiddleware, productController.getProducts);

module.exports = router;
