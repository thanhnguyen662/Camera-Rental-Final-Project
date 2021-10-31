const express = require('express');
const router = express.Router();
const adminController = require('../app/controllers/AdminController');

router.get('/revenue/analytics', adminController.revenueAnalytics);
router.get('/order/count', adminController.orderAnalytics);
router.get('/product/manage', adminController.adminManageProduct);

module.exports = router;
