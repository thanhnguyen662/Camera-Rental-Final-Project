const prisma = require('../models/prisma');

class CommentController {
   addCommentToProduct = async (req, res, next) => {
      try {
         const response = await prisma.productComment.create({
            data: {
               content: req.body.content,
               productId: req.body.productId,
               authorId: req.body.authorId,
            },
         });

         return res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };
}

module.exports = new CommentController();
