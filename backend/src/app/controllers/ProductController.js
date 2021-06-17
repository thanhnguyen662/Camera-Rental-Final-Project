const prisma = require('../models/prisma');

class ProductController {
   getProducts = async (req, res, next) => {
      try {
         const getProducts = await prisma.product.findMany();

         res.json(getProducts);
      } catch (error) {
         return next(error);
      }
   };
}

module.exports = new ProductController();
