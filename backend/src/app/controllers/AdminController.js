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

   // orderByDate = async (req, res, next) => {
   //    try {
   //       const
   //    } catch (error) {
   //       return next(error);
   //    }
   // }
}

module.exports = new AdminController();
