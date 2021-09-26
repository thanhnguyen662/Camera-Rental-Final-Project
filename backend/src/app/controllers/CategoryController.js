const prisma = require('../models/prisma');

class CategoryController {
   getCategory = async (req, res, next) => {
      try {
         const response = await prisma.category.findMany();

         res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };

   getProductInCategory = async (req, res, next) => {
      const sortBy = req.query.sortBy;
      const page = Number(req.query.page);
      const take = Number(req.query.take);
      try {
         if (sortBy === 'all') {
            const response = await prisma.category.findMany({
               where: {
                  name: req.query.name,
               },
               include: {
                  Product: {
                     take: take,
                     skip: (page - 1) * take,
                  },
                  _count: true,
               },
            });
            return res.status(200).json(response);
         }
         if (sortBy === 'popular') {
            const response = await prisma.category.findMany({
               where: {
                  name: req.query.name,
               },
               include: {
                  Product: {
                     take: take,
                     skip: (page - 1) * take,
                     orderBy: {
                        completed: 'desc',
                     },
                  },
                  _count: true,
               },
            });
            return res.status(200).json(response);
         }
         if (sortBy === 'newest') {
            const response = await prisma.category.findMany({
               where: {
                  name: req.query.name,
               },
               include: {
                  Product: {
                     take: take,
                     skip: (page - 1) * take,
                     orderBy: {
                        createdAt: 'desc',
                     },
                  },
                  _count: true,
               },
            });
            return res.status(200).json(response);
         }
      } catch (error) {
         return next(error);
      }
   };
}

module.exports = new CategoryController();
