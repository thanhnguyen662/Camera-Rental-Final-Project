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
            },
            update: {
               age: req.body.age,
               gender: req.body.gender,
               address: req.body.address,
               favouriteGear: req.body.favouriteGear,
               hasTag: req.body.hasTag,
               rate: req.body.rate,
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
         const getUserInfoInDb = await prisma.user.findUnique({
            where: {
               firebaseId: req.query.firebaseId,
            },
         });
         res.status(200).json(getUserInfoInDb);
      } catch (error) {
         return next(error);
      }
   };
}

module.exports = new AccountController();
