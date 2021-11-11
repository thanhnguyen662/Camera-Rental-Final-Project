const express = require('express');
const router = express.Router();
const adminController = require('../app/controllers/AdminController');
const authMiddleware = require('../firebase/middleware/auth-middleware');

router.get(
   '/revenue/analytics',
   authMiddleware,
   adminController.revenueAnalytics
);
router.get('/order/count', authMiddleware, adminController.orderAnalytics);
router.get(
   '/product/manage',
   authMiddleware,
   adminController.adminManageProduct
);
router.patch(
   '/product/action',
   authMiddleware,
   adminController.adminApproveProduct
);

module.exports = router;
