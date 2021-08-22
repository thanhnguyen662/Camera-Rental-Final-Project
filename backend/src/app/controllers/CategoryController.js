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
}

module.exports = new CategoryController();
