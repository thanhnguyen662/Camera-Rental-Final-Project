const prisma = require('../models/prisma');

class CommentController {
   addCommentToProduct = async (req, res, next) => {
      try {
         const response = await prisma.productComment.create({
            data: {
               content: req.body.content,
               productId: req.body.productId,
               authorId: req.body.authorId,
               rate: req.body.rate,
            },
         });

         const findProductCommentInProduct = await prisma.product.findUnique({
            where: {
               id: req.body.productId,
            },
            include: {
               productComments: true,
            },
         });

         const plusRate = () => {
            let totalRate = 0;
            findProductCommentInProduct.productComments?.forEach(({ rate }) => {
               totalRate += parseInt(rate);
            });
            return totalRate;
         };

         const rateAverage =
            plusRate() / findProductCommentInProduct.productComments.length;

         await prisma.product.update({
            where: {
               id: req.body.productId,
            },
            data: {
               qualityRate: parseFloat(rateAverage.toFixed(1)),
            },
         });

         return res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };
}

module.exports = new CommentController();
