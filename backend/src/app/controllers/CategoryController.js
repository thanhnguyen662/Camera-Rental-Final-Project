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
      const searchByBrand = req.query.searchByBrand || undefined;
      const page = Number(req.query.page);
      const take = Number(req.query.take);
      const minPrice = Number(req.query.minPrice) || undefined;
      const maxPrice = Number(req.query.maxPrice) || undefined;
      const city =
         req.query.province === 'global' ? undefined : req.query.province;
      const searchByRate =
         req.query.searchByRate === 'All'
            ? undefined
            : parseFloat(req.query.searchByRate);
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
                     where: {
                        AND: [
                           {
                              brand: {
                                 search: searchByBrand,
                              },
                           },
                           {
                              qualityRate: {
                                 gte: searchByRate,
                                 lt:
                                    typeof searchByRate === 'number'
                                       ? searchByRate + 1
                                       : searchByRate,
                              },
                           },
                           {
                              price: {
                                 gte: minPrice,
                                 lte: maxPrice,
                              },
                           },
                           {
                              pins: {
                                 some: {
                                    city: city,
                                 },
                              },
                           },
                        ],
                     },
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
                     where: {
                        AND: [
                           {
                              brand: {
                                 search: searchByBrand,
                              },
                           },
                           {
                              qualityRate: {
                                 gte: searchByRate,
                                 lt:
                                    typeof searchByRate === 'number'
                                       ? searchByRate + 1
                                       : searchByRate,
                              },
                           },
                           {
                              price: {
                                 gte: minPrice,
                                 lte: maxPrice,
                              },
                           },
                           {
                              pins: {
                                 some: {
                                    city: city,
                                 },
                              },
                           },
                        ],
                     },
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
                     where: {
                        AND: [
                           {
                              brand: {
                                 search: searchByBrand,
                              },
                           },
                           {
                              qualityRate: {
                                 gte: searchByRate,
                                 lt:
                                    typeof searchByRate === 'number'
                                       ? searchByRate + 1
                                       : searchByRate,
                              },
                           },
                           {
                              price: {
                                 gte: minPrice,
                                 lte: maxPrice,
                              },
                           },
                           {
                              pins: {
                                 some: {
                                    city: city,
                                 },
                              },
                           },
                        ],
                     },
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
