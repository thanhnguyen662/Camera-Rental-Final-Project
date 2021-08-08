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
                     every: {
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
         const response = await prisma.order.update({
            where: {
               id: req.body.orderId,
            },
            data: {
               orderStatusId: req.body.orderStatusId,
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
}

module.exports = new OrderController();
