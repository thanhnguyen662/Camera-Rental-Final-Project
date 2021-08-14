const prisma = require('../models/prisma');

class OrderController {
   createOrder = async (req, res, next) => {
      try {
         const response = await prisma.order.create({
            data: {
               address: req.body.address,
               userId: req.body.userId,
               totalPrice: Number(req.body.totalPrice),
               orderStatusId: req.body.orderStatusId,
               orderItems: {
                  createMany: {
                     data: req.body.orderItem,
                  },
               },
            },
         });

         res.status(200).json({ ...response, message: 'success' });
      } catch (error) {
         return next(error);
      }
   };

   manageOrder = async (req, res, next) => {
      try {
         const response = await prisma.order.findMany({
            where: {
               AND: {
                  userId: req.query.userId,
                  orderStatusId: {
                     equals: parseInt(req.query.orderStatusId) || undefined,
                  },
               },
            },
            include: {
               orderStatus: true,
               User: true,
               orderItems: {
                  include: {
                     Product: {
                        include: {
                           User: true,
                        },
                     },
                  },
               },
            },
         });

         res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };

   myProductInOrder = async (req, res, next) => {
      try {
         const response = await prisma.order.findMany({
            where: {
               AND: {
                  orderItems: {
                     some: {
                        Product: {
                           User: {
                              firebaseId: req.query.firebaseId,
                           },
                        },
                     },
                  },
                  orderStatus: {
                     name: req.query.orderStatus || undefined,
                  },
               },
            },
            include: {
               User: true,
               orderStatus: true,
               orderItems: {
                  include: {
                     Product: {
                        include: {
                           User: true,
                        },
                     },
                  },
               },
            },
         });

         res.json(response);
      } catch (error) {
         return next(error);
      }
   };

   deleteOrder = async (req, res, next) => {
      try {
         const response = await prisma.order.delete({
            where: {
               id: req.body.orderId,
            },
         });

         return res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };

   updateOrder = async (req, res, next) => {
      try {
         const orderItemsBatch = req.body.orderItems;
         const orderStatusId = req.body.orderStatusId;

         const response = await prisma.order.update({
            where: {
               id: req.body.orderId,
            },
            data: {
               orderStatusId: req.body.orderStatusId,
               note: req.body.note,
               paidAt: new Date(req.body.paidAt),
               backAt: new Date(req.body.backAt),
            },
            include: {
               User: true,
               orderStatus: true,
               orderItems: {
                  include: {
                     Product: {
                        include: {
                           User: true,
                        },
                     },
                  },
               },
            },
         });

         parseInt(orderStatusId) === 5 &&
            orderItemsBatch.map(async (order) => {
               await prisma.product.update({
                  where: {
                     id: order.Product.id,
                  },
                  data: {
                     stock: parseInt(order.Product.stock) - 1,
                  },
               });
            });
         parseInt(orderStatusId) === 4 &&
            orderItemsBatch.map(async (order) => {
               await prisma.product.update({
                  where: {
                     id: order.Product.id,
                  },
                  data: {
                     stock: parseInt(order.Product.stock) + 1,
                  },
               });
            });

         return res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };

   updateToPaidStatus = async (req, res, next) => {
      try {
         const response = await prisma.order.update({
            where: {
               id: req.body.orderId,
            },
            data: {
               orderStatusId: req.body.orderStatusId,
               note: req.body.note,
               paidAt: new Date(req.body.paidAt),
            },
            include: {
               User: true,
               orderStatus: true,
               orderItems: {
                  include: {
                     Product: {
                        include: {
                           User: true,
                        },
                     },
                  },
               },
            },
         });

         return res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };

   updateToBackStatus = async (req, res, next) => {
      const orderItemsBatch = req.body.orderItems;
      const orderStatusId = req.body.orderStatusId;
      try {
         const response = await prisma.order.update({
            where: {
               id: req.body.orderId,
            },
            data: {
               orderStatusId: req.body.orderStatusId,
               backAt: new Date(req.body.backAt),
            },
            include: {
               User: true,
               orderStatus: true,
               orderItems: {
                  include: {
                     Product: {
                        include: {
                           User: true,
                        },
                     },
                  },
               },
            },
         });

         parseInt(orderStatusId) === 6 &&
            orderItemsBatch.map(async (order) => {
               await prisma.product.update({
                  where: {
                     id: order.Product.id,
                  },
                  data: {
                     stock: parseInt(order.Product.stock) + 1,
                  },
               });
            });

         return res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };

   updateStats = async (req, res, next) => {
      const getAllOrderOfUser = await prisma.order.findMany({
         where: {
            userId: req.query.userId,
         },
      });

      const getOrderExcludePendingAccept = await prisma.order.findMany({
         where: {
            AND: [
               {
                  userId: req.query.userId,
               },
               {
                  orderStatusId: {
                     notIn: 1, //PENDING
                  },
               },
               {
                  orderStatusId: {
                     notIn: 5, //ACCEPT
                  },
               },
            ],
         },
      });

      //get accept order but user come = paidAt
      const getPaidOrder = await prisma.order.findMany({
         where: {
            AND: [
               {
                  userId: req.query.userId,
               },
               {
                  paidAt: {
                     not: null,
                  },
               },
               {
                  orderStatusId: {
                     notIn: 4, //FAILURE
                  },
               },
            ],
         },
      });

      const getSuccessOrder = await prisma.order.findMany({
         where: {
            AND: [
               {
                  paidAt: {
                     not: null,
                  },
               },
               {
                  backAt: {
                     not: null,
                  },
               },
            ],
         },
      });

      const getSuccessOrderNotDelay = await prisma.order.findMany({
         where: {
            AND: [
               {
                  userId: req.query.userId,
               },
               {
                  orderItems: {
                     every: {
                        endDate: {
                           gte: new Date(req.query.date),
                        },
                     },
                  },
               },
               {
                  paidAt: {
                     not: null,
                  },
               },
               {
                  backAt: {
                     not: null,
                  },
               },
            ],
         },
      });

      console.log('getPaidOrder', getPaidOrder.length);
      console.log('getOrderExcludePending', getOrderExcludePendingAccept);
      console.log('getSuccessOrderNotDelay', getSuccessOrderNotDelay.length);
      console.log('getSuccessOrder', getSuccessOrder.length);

      const comeResult =
         (getPaidOrder.length / getOrderExcludePendingAccept.length) * 100;
      let successResultInTime = 0;

      if (getSuccessOrderNotDelay.length === 0) {
         successResultInTime = 100;
      } else {
         successResultInTime =
            (getSuccessOrderNotDelay.length / getSuccessOrder.length) * 100;
      }

      const updateStats = await prisma.userStat.upsert({
         where: {
            userId: req.query.userId,
         },
         update: {
            come: parseFloat(comeResult.toFixed(1)),
            success: parseFloat(successResultInTime.toFixed(1)),
            totalOrder: parseFloat(getAllOrderOfUser.length),
         },
         create: {
            userId: req.query.userId,
            come: parseFloat(comeResult.toFixed(1)),
            success: parseFloat(successResultInTime.toFixed(1)),
            totalOrder: parseFloat(getAllOrderOfUser.length),
         },
      });

      res.json(updateStats);
   };
}

module.exports = new OrderController();
