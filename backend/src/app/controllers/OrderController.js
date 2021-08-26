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
         const page = req.query.page;
         const take = page ? 4 : undefined;
         const response = await prisma.order.findMany({
            take: take,
            skip: (page - 1) * 4 || undefined,
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
         const page = req.query.page;
         const take = page ? 10 : undefined;
         const response = await prisma.order.findMany({
            take: take,
            skip: (page - 1) * 10 || undefined,
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

         res.status(200).json(response);
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
                     completed: parseInt(order.Product.completed) + 1,
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

      const filterDeclineOrder = getOrderExcludePendingAccept.filter(
         (o) => o.note !== 'Decline'
      );

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
               {
                  userId: req.query.userId,
               },
            ],
         },
         include: {
            orderItems: true,
         },
      });

      let inTimeArray = [];
      getSuccessOrder?.map((order) => {
         let backAt = order.backAt;
         order.orderItems.map((item) => {
            if (
               new Date(item.endDate).getDate() >= new Date(backAt).getDate()
            ) {
               inTimeArray.push(order.id);
            }
         });
      });
      const inTimeUniqueOrder = [...new Set(inTimeArray)];

      const inTimeRate =
         (inTimeUniqueOrder.length / getSuccessOrder.length) * 100;
      const comeRate = (getPaidOrder.length / filterDeclineOrder.length) * 100;

      const updateStats = await prisma.userStat.upsert({
         where: {
            userId: req.query.userId,
         },
         update: {
            come: parseFloat(comeRate.toFixed(1)),
            success: parseFloat(inTimeRate.toFixed(1)),
            totalOrder: parseFloat(getAllOrderOfUser.length),
         },
         create: {
            userId: req.query.userId,
            come: parseFloat(inTimeRate.toFixed(1)),
            success: parseFloat(inTimeRate.toFixed(1)),
            totalOrder: parseFloat(getAllOrderOfUser.length),
         },
      });

      res.json(updateStats);
   };

   countMyProductOrder = async (req, res, next) => {
      try {
         const response = await prisma.order.groupBy({
            by: ['orderStatusId'],
            where: {
               orderItems: {
                  some: {
                     Product: {
                        User: {
                           firebaseId: req.query.firebaseId,
                        },
                     },
                  },
               },
            },
            _count: {
               _all: true,
            },
         });

         return res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };

   myProductInOrderOverview = async (req, res, next) => {
      try {
         const response = await prisma.order.findMany({
            where: {
               AND: [
                  {
                     orderItems: {
                        some: {
                           Product: {
                              User: {
                                 firebaseId: req.query.firebaseId,
                              },
                           },
                        },
                     },
                  },
               ],
            },
            select: {
               paidAt: true,
               totalPrice: true,
               createdAt: true,
            },
         });

         return res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };
}

module.exports = new OrderController();
