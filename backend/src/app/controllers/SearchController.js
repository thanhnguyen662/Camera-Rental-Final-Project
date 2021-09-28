const prisma = require('../models/prisma');

class SearchController {
   searchProductSuggestion = async (req, res, next) => {
      try {
         const response = await prisma.product.findMany({
            take: 8,
            where: {
               OR: [
                  {
                     name: {
                        contains: req.query.searchKeyword,
                        mode: 'insensitive',
                     },
                  },
                  {
                     brand: {
                        contains: req.query.searchKeyword,
                        mode: 'insensitive',
                     },
                  },
               ],
            },
            select: {
               id: true,
               name: true,
            },
         });

         res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };

   searchUserSuggestion = async (req, res, next) => {
      try {
         const response = await prisma.user.findMany({
            take: 8,
            where: {
               username: {
                  contains: req.query.searchKeyword,
                  mode: 'insensitive',
               },
            },
            select: {
               firebaseId: true,
               username: true,
            },
         });

         res.status(200).send(response);
      } catch (error) {
         return next(error);
      }
   };

   searchResult = async (req, res, next) => {
      try {
         const page = Number(req.query.page);
         const take = Number(req.query.take);
         const sortBy = req.query.sortBy;
         const searchByBrand = req.query.searchByBrand || undefined;
         const searchByRate =
            req.query.searchByRate === 'All'
               ? undefined
               : parseFloat(req.query.searchByRate);
         const minPrice = Number(req.query.minPrice) || undefined;
         const maxPrice = Number(req.query.maxPrice) || undefined;
         const city =
            req.query.province === 'global' ? undefined : req.query.province;

         if (sortBy === 'all') {
            const response = await prisma.product.findMany({
               take: take,
               skip: (page - 1) * take,
               where: {
                  AND: [
                     {
                        name: {
                           contains: req.query.keyword,
                           mode: 'insensitive',
                        },
                     },
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
            });
            res.status(200).json(response);
         }

         if (sortBy === 'popular') {
            const response = await prisma.product.findMany({
               take: take,
               skip: (page - 1) * take,
               where: {
                  AND: [
                     {
                        name: {
                           contains: req.query.keyword,
                           mode: 'insensitive',
                        },
                     },
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
            });
            res.status(200).json(response);
         }

         if (sortBy === 'newest') {
            const response = await prisma.product.findMany({
               take: take,
               skip: (page - 1) * take,
               where: {
                  AND: [
                     {
                        name: {
                           contains: req.query.keyword,
                           mode: 'insensitive',
                        },
                     },
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
            });
            res.status(200).json(response);
         }
      } catch (error) {
         return next(error);
      }
   };
}

module.exports = new SearchController();
