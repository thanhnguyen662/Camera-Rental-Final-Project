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
         });

         response.sort((a, b) => {
            const dateA = a.messages.length
               ? new Date(a.messages[0].createdAt)
               : new Date(a.createdAt);
            const dateB = b.messages.length
               ? new Date(b.messages[0].createdAt)
               : new Date(b.createdAt);
            return dateB - dateA;
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

   sendMessage = async (req, res, next) => {
      try {
         const response = await prisma.messageBeta1.create({
            data: {
               content: req.body.content,
               conversationId: Number(req.body.conversationId),
               userId: req.body.userId,
            },
            include: {
               user: {
                  select: {
                     firebaseId: true,
                     username: true,
                     photoURL: true,
                  },
               },
            },
         });
         return res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };

   createConversation = async (req, res, next) => {
      try {
         const checkIsExist = await prisma.conversationBeta1.findFirst({
            where: {
               AND: [
                  {
                     members: {
                        some: { userId: req.body.userId1 },
                     },
                  },
                  {
                     members: {
                        some: { userId: req.body.userId2 },
                     },
                  },
               ],
            },
         });

         if (checkIsExist)
            return res.json({ ...checkIsExist, message: 'Exist' });

         const response = await prisma.conversationBeta1.create({
            data: {
               members: {
                  createMany: {
                     data: [
                        { userId: req.body.userId1 },
                        { userId: req.body.userId2 },
                     ],
                  },
               },
            },
         });

         return res.json(response);
      } catch (error) {
         return next(error);
      }
   };
}

module.exports = new ConversationBeta1Controller();
