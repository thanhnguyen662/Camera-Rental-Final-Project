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
