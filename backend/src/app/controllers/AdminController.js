const prisma = require('../models/prisma');
const moment = require('moment');

class AdminController {
   revenueAnalytics = async (req, res, next) => {
      try {
         const startDate = moment().subtract(60, 'days').toDate();
         const endDate = moment().toDate();

         const getOrderByDate = await prisma.order.findMany({
            where: {
               AND: [
                  {
                     paidAt: {
                        gte: startDate,
                     },
                  },
                  {
                     paidAt: {
                        lte: endDate,
                     },
                  },
               ],
            },
            orderBy: {
               paidAt: 'desc',
            },
            select: {
               id: true,
               totalPrice: true,
               paidAt: true,
            },
         });

         const calculateRevenueByDate = getOrderByDate.reduce((array, item) => {
            const paidAtDate = moment(item.paidAt).format('YYYY-MM-DD');
            if (array.some((a) => a.paidAt === paidAtDate)) {
               const findIndex = array.findIndex(
                  (i) => i.paidAt === paidAtDate
               );
               array[findIndex].totalPrice += item.totalPrice;
               array[findIndex].orders += 1;
            } else {
               array.push({
                  ...item,
                  paidAt: paidAtDate,
                  orders: 1,
               });
            }
            return array;
         }, []);

         res.json(calculateRevenueByDate);
      } catch (error) {
         return next(error);
      }
   };

   orderAnalytics = async (req, res, next) => {
      try {
         const startDate = moment().subtract(60, 'days').toDate();
         const endDate = moment().toDate();

         const getOrderByCreated = await prisma.order.findMany({
            where: {
               AND: [
                  {
                     createdAt: {
                        gte: startDate,
                     },
                  },
                  {
                     createdAt: {
                        lte: endDate,
                     },
                  },
               ],
            },
            select: {
               id: true,
               createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
         });

         const countOrderByDate = getOrderByCreated.reduce((array, item) => {
            const createdDate = moment(item.createdAt).format('YYYY-MM-DD');
            if (array.some((a) => a.createdAt === createdDate)) {
               const findIndex = array.findIndex(
                  (f) => f.createdAt === createdDate
               );
               array[findIndex].orders += 1;
            } else {
               array.push({
                  ...item,
                  createdAt: createdDate,
                  orders: 1,
               });
            }
            return array;
         }, []);

         return res.status(200).json(countOrderByDate);
      } catch (error) {
         return next(error);
      }
   };

   adminManageProduct = async (req, res, next) => {
      try {
         const page = Number(req.query.page) || 1;
         const take = Number(req.query.take) || 10;
         const type = req.query.type;
         const keyword = req.query.keyword || undefined;

         const response = await prisma.product.findMany({
            take: take,
            skip: (page - 1) * take,
            where:
               type === 'product'
                  ? {
                       name: {
                          contains: keyword,
                          mode: 'insensitive',
                       },
                    }
                  : {
                       User: {
                          OR: [
                             {
                                username: {
                                   contains: keyword,
                                   mode: 'insensitive',
                                },
                             },
                             {
                                firebaseId: {
                                   contains: keyword,
                                   mode: 'insensitive',
                                },
                             },
                          ],
                       },
                    },
            include: {
               User: {
                  select: {
                     firebaseId: true,
                     photoURL: true,
                     username: true,
                     userStats: true,
                     rate: true,
                  },
               },
            },
            orderBy: {
               createdAt: 'desc',
            },
         });
         return res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };
}

module.exports = new AdminController();
