const express = require('express');
const router = express.Router();
const orderController = require('../app/controllers/OrderController');

// router.get('/updateStats', orderController.updateStats);
// router.patch('/updateOrder', orderController.updateOrder);
// router.patch('/updateOrderToPaid', orderController.updateToPaidStatus);
// router.patch('/updateOrderToBack', orderController.updateToBackStatus);
// router.patch('/updateIsComment', orderController.updateIsComment);
// router.delete('/deleteOrder', orderController.deleteOrder);
// router.get('/manageOrder', orderController.manageOrder);
// router.get('/myProductInOrder', orderController.myProductInOrder);
// router.get('/countMyProductOrder', orderController.countMyProductOrder);
// router.get(
//    '/myProductInOrderOverview',
//    orderController.myProductInOrderOverview
// );

router.post('/createOrder', orderController.createOrder);
/////////////////////
router.post(
   '/create/comment/user/seller',
   orderController.createUserCommentBySeller
);
router.post(
   '/create/comment/user/buyer',
   orderController.createUserCommentByBuyer
);
router.post('/create/comment/product', orderController.createOrderItemsComment);
router.patch('/update/user/come', orderController.updateUserComeStat);
router.patch(
   '/update/user/success',
   orderController.updateUserOrderSuccessStat
);
router.get('/revenue/time', orderController.orderRevenueInTime);
router.patch('/update/back', orderController.updateOrderToBack);
router.patch('/update/accept', orderController.updateOrderToAccept);
router.patch('/update/failure', orderController.updateOrderToFailure);
router.patch('/update/rented', orderController.updateOrderToRented);
router.get('/create/time', orderController.orderCreateInTime);
router.get('/count', orderController.overviewMyOrderStatus);
router.get('/my', orderController.getMyOrder);
router.get('/status', orderController.getOrderByStatus);
router.delete('/delete', orderController.deletePendingOrder);
router.get('/', orderController.getOrderById);
/////////////////////

module.exports = router;
