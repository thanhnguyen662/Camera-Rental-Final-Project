const prisma = require('../models/prisma');

class ConversationBeta1Controller {
   getConversationOfUser = async (req, res, next) => {
      try {
         const response = await prisma.conversationBeta1.findMany({
            where: {
               members: {
                  some: {
                     userId: req.query.userId,
                  },
               },
            },
            include: {
               members: {
                  include: {
                     user: {
                        select: {
                           firebaseId: true,
                           username: true,
                           photoURL: true,
                        },
                     },
                  },
               },
               messages: {
                  take: 1,
                  orderBy: {
                     createdAt: 'desc',
                  },
               },
            },
            orderBy: {
               createdAt: 'desc',
            },
         });

         response.map((r) => {
            const friend = r.members.filter(
               (m) => m.userId !== req.query.userId
            );
            r.members = friend;
         });

         return res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };

   getConversationMessages = async (req, res, next) => {
      try {
         const response = await prisma.conversationBeta1.findUnique({
            where: {
               id: Number(req.query.conversationId),
            },
            include: {
               messages: {
                  include: {
                     user: {
                        select: {
                           firebaseId: true,
                           username: true,
                           photoURL: true,
                        },
                     },
                  },
               },
               members: {
                  include: {
                     user: {
                        select: {
                           firebaseId: true,
                           username: true,
                           photoURL: true,
                        },
                     },
                  },
               },
            },
         });

         const myFriend = response.members.filter(
            (member) => member.userId !== req.query.userId
         );
         response.members = myFriend;

         return res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };
}

module.exports = new ConversationBeta1Controller();
