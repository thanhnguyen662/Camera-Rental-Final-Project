const prisma = require('../models/prisma');

class ConversationController {
   createConversation = async (req, res, next) => {
      try {
         const checkConversationIsExist = await prisma.conversation.findFirst({
            where: {
               members: {
                  hasEvery: [req.body.senderId, req.body.receiverId],
               },
            },
         });

         if (checkConversationIsExist)
            return res.send({
               message: 'Exist',
               id: checkConversationIsExist.id,
               members: checkConversationIsExist.members,
            });

         const newConversation = await prisma.conversation.create({
            data: {
               members: [req.body.senderId, req.body.receiverId],
            },
         });

         res.status(200).json(newConversation);
      } catch (error) {
         return next(error);
      }
   };

   findConversation = async (req, res, next) => {
      try {
         const findUserConversation = await prisma.conversation.findMany({
            where: {
               members: {
                  has: String(req.params.userId),
               },
            },
            include: {
               messages: true,
            },
         });

         res.status(200).json(findUserConversation);
      } catch (error) {
         return next(error);
      }
   };

   findConversationBeta = async (req, res, next) => {
      try {
         const response = await prisma.conversation.findMany({
            where: {
               members: {
                  has: req.params.userId,
               },
            },
            include: {
               messages: {
                  take: 1,
                  orderBy: {
                     createdAt: 'desc',
                  },
               },
            },
         });

         res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };
}

module.exports = new ConversationController();
