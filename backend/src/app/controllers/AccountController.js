const prisma = require('../models/prisma');

class AccountController {
   addUserInfo = async (req, res, next) => {
      try {
         const upsertUser = await prisma.user.upsert({
            create: {
               firebaseId: req.body.firebaseId,
               age: req.body.age,
               gender: req.body.gender,
               address: req.body.address,
               favouriteGear: req.body.favouriteGear,
               hasTag: req.body.hasTag,
               description: req.body.description,
               photoURL: String(req.body.photoURL),
               username: req.body.username,
               phoneNumber: req.body.phoneNumber,
            },
            update: {
               age: req.body.age,
               gender: req.body.gender,
               address: req.body.address,
               favouriteGear: req.body.favouriteGear,
               hasTag: req.body.hasTag,
               rate: req.body.rate,
               description: req.body.description,
               photoURL: String(req.body.photoURL),
               username: req.body.username,
               phoneNumber: req.body.phoneNumber,
            },
            where: {
               firebaseId: req.body.firebaseId,
            },
         });

         res.status(200).json(upsertUser);
      } catch (error) {
         return next(error);
      }
   };

   getUserInfo = async (req, res, next) => {
      try {
         const getUserInfoInDb = await prisma.user.findFirst({
            where: {
               firebaseId: req.query.firebaseId,
            },
         });
         res.status(200).json(getUserInfoInDb);
      } catch (error) {
         return next(error);
      }
   };

   getUserStats = async (req, res, next) => {
      try {
         const response = await prisma.userStat.findUnique({
            where: {
               userId: req.query.userId,
            },
         });

         res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };

   getUserComment = async (req, res, next) => {
      try {
         const response = await prisma.userComment.findMany({
            where: {
               userId: req.query.userId,
            },
            include: {
               user: true,
            },
         });

         res.status(200).send(response);
      } catch (error) {
         return next(error);
      }
   };

   createUserComment = async (req, res, next) => {
      try {
         const response = await prisma.userComment.create({
            data: {
               content: req.body.content,
               rate: req.body.rate,
               authorId: req.body.authorId,
               authorUsername: req.body.authorUsername,
               authorPhotoURL: req.body.authorPhotoURL,
               userId: req.body.userId,
            },
         });

         const findAllCommentOfUser = await prisma.user.findUnique({
            where: {
               firebaseId: req.body.userId,
            },
            include: {
               userComments: true,
            },
         });

         const plusRate = () => {
            let totalRate = 0;

            findAllCommentOfUser.userComments?.forEach(({ rate }) => {
               totalRate += parseInt(rate);
            });

            return totalRate;
         };
         const rateAverage =
            plusRate() / findAllCommentOfUser.userComments?.length;

         await prisma.user.update({
            where: {
               firebaseId: req.body.userId,
            },
            data: {
               rate: parseFloat(rateAverage.toFixed(1)),
            },
         });

         res.status(200).send(response);
      } catch (error) {
         return next(error);
      }
   };
}

module.exports = new AccountController();
