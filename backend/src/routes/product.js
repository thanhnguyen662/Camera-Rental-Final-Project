const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductController');
const authMiddleware = require('../firebase/middleware/auth-middleware');

router.get('/shop/category', productController.getProductInShopByCategory);
router.get('/shop/search', productController.searchInShop);
router.get('/shop/count', productController.countMyProductInShop);
router.get('/shop/all', productController.getMyProductInShop);
router.get('/shop/top', productController.getTopRentingProductInShop);
router.get('/shop/other', productController.getOtherProductInShop);
router.get('/comments', productController.getProductComment);
router.get('/topRenting', productController.getTopRenting);
router.get('/newProduct', productController.getNewProduct);
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
