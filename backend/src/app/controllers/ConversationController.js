const prisma = require('../models/prisma');

class ConversationController {
   createConversation = async (req, res, next) => {
      try {
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
         });

         res.status(200).json(findUserConversation);
      } catch (error) {
         return next(error);
      }
   };
}

module.exports = new ConversationController();
