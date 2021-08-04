const prisma = require('../models/prisma');

class OrderController {
   createOrder = async (req, res, next) => {
      try {
         const response = await prisma.order.create({
            data: {
               address: req.body.address,
               userId: req.body.userId,
               totalPrice: Number(req.body.totalPrice),

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
               userId: req.query.firebaseId,
            },
            include: {
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

   myOrder = async (req, res, next) => {
      try {
         const response = await prisma.order.findMany({
            where: {
               orderItems: {
                  every: {
                     Product: {
                        User: {
                           firebaseId: req.query.firebaseId,
                        },
                     },
                  },
               },
            },
            include: {
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
}

module.exports = new OrderController();
