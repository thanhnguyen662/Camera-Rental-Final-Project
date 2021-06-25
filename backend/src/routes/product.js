const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductController');
const { verifyUser } = require('../utils/authenticate');
const authMiddleware = require('../firebase/auth-middleware');

router.get('/', authMiddleware, productController.getProducts);
router.get('/:productSlug', verifyUser, productController.getProductDetail);
router.post('/createProduct', verifyUser, productController.createNewProduct);

module.exports = router;
