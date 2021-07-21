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

   findMessage = async (req, res, next) => {
      try {
         const findUserMessage = await prisma.message.findMany({
            where: {
               conversationId: Number(req.params.conversationId),
            },
         });

         res.status(200).json(findUserMessage);
      } catch (error) {
         return next(error);
      }
   };

   findMessageBeta = async (req, res, next) => {
      try {
         const response = await prisma.message.findMany({
            where: {
               conversationId: Number(req.params.conversationId),
            },
         });
         res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };
}

module.exports = new MessageController();
