const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductController');

router.get('/', productController.getProducts);

module.exports = router;
