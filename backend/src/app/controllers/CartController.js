const prisma = require('../models/prisma');

class CartController {
   getCart = async (req, res, next) => {
      try {
         const productInCart = await prisma.cart.findMany({
            where: {
               firebaseId: req.query.firebaseId,
            },
            include: {
               User: true,
               Product: true,
            },
         });

         res.status(200).json(productInCart);
      } catch (error) {
         return next(error);
      }
   };

   addProductToCart = async (req, res, next) => {
      try {
         const checkProductIsExists = await prisma.cart.findFirst({
            where: {
               firebaseId: req.body.firebaseId,
               productId: Number(req.body.productId),
            },
         });

         if (checkProductIsExists)
            return res.json({ message: 'Product already in cart' });

         const addProduct = await prisma.cart.create({
            data: {
               firebaseId: req.body.firebaseId,
               productId: Number(req.body.productId),
            },
         });

         res.status(200).json(addProduct);
      } catch (error) {
         return next(error);
      }
   };
}

module.exports = new CartController();
