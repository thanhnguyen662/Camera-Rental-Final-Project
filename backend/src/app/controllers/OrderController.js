const prisma = require('../models/prisma');

class OrderController {
   createOrder = async (req, res, next) => {
      try {
         const orderItemArray = JSON.parse(req.body.orderItem);
         const response = await prisma.order.create({
            data: {
               address: req.body.address,
               userId: req.body.userId,
               totalPrice: Number(req.body.totalPrice),

               orderItems: {
                  createMany: {
                     data: orderItemArray,
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
}

module.exports = new OrderController();
