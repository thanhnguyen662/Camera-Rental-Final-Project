const prisma = require('../models/prisma');

class PinController {
   getAllPins = async (req, res, next) => {
      try {
         const response = await prisma.pin.findMany({
            include: {
               product: {
                  include: {
                     User: true,
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

module.exports = new PinController();
