const express = require('express');
const router = express.Router();
const adminController = require('../app/controllers/AdminController');

router.get('/revenue/analytics', adminController.revenueAnalytics);

module.exports = router;
