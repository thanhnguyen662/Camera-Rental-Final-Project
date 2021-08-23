const prisma = require('../models/prisma');

class MessageController {
   createMessage = async (req, res, next) => {
      try {
         const newMessage = await prisma.message.create({
            data: {
               text: req.body.text,
               sender: String(req.body.sender),
               conversationId: Number(req.body.conversationId),
            },
         });

         res.status(200).json(newMessage);
      } catch (error) {
         return next(error);
      }
   };

   findMessageBeta = async (req, res, next) => {
      const page = req.params.page;
      const take = 20;
      try {
         const response = await prisma.message.findMany({
            take: take,
            skip: (page - 1) * take,
            where: {
               conversationId: parseInt(req.params.conversationId),
            },
            orderBy: {
               createdAt: 'desc',
            },
         });
         res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };
}

module.exports = new MessageController();
