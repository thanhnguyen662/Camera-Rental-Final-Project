const express = require('express');
const router = express.Router();
const orderController = require('../app/controllers/OrderController');
const authMiddleware = require('../firebase/middleware/auth-middleware');

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

router.post('/createOrder', authMiddleware, orderController.createOrder);
/////////////////////
router.post(
   '/create/comment/user/seller',
   authMiddleware,
   orderController.createUserCommentBySeller
);
router.post(
   '/create/comment/user/buyer',
   authMiddleware,
   orderController.createUserCommentByBuyer
);
router.post(
   '/create/comment/product',
   authMiddleware,
   orderController.createOrderItemsComment
);
router.patch(
   '/update/user/come',
   authMiddleware,
   orderController.updateUserComeStat
);
router.patch(
   '/update/user/success',
   authMiddleware,
   orderController.updateUserOrderSuccessStat
);
router.get('/revenue/time', authMiddleware, orderController.orderRevenueInTime);
router.patch('/update/back', authMiddleware, orderController.updateOrderToBack);
router.patch(
   '/update/accept',
   authMiddleware,
   orderController.updateOrderToAccept
);
router.patch(
   '/update/failure',
   authMiddleware,
   orderController.updateOrderToFailure
);
router.patch(
   '/update/rented',
   authMiddleware,
   orderController.updateOrderToRented
);
router.get('/create/time', authMiddleware, orderController.orderCreateInTime);
router.get('/count', authMiddleware, orderController.overviewMyOrderStatus);
router.get('/my', authMiddleware, orderController.getMyOrder);
router.get('/status', authMiddleware, orderController.getOrderByStatus);
router.delete('/delete', authMiddleware, orderController.deletePendingOrder);
router.get('/', authMiddleware, orderController.getOrderById);
/////////////////////

module.exports = router;
