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
                        contains: req.query.productName,
                        mode: 'insensitive',
                     },
                  },
                  {
                     brand: {
                        contains: req.query.productName,
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

   searchResult = async (req, res, next) => {
      try {
         const response = await prisma.product.findMany({
            where: {
               OR: [
                  {
                     name: {
                        contains: req.query.keyword,
                        mode: 'insensitive',
                     },
                  },
                  {
                     brand: {
                        contains: req.query.keyword,
                        mode: 'insensitive',
                     },
                  },
               ],
            },
         });

         res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };
}

module.exports = new SearchController();
