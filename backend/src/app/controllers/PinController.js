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

   getPinInDistrict = async (req, res, next) => {
      try {
         const { district, district1, district2, productName } = req.query;

         const response = await prisma.pin.findMany({
            where: {
               OR: [
                  {
                     district: {
                        contains: district,
                     },
                     AND: [
                        {
                           product: {
                              name: {
                                 contains: productName,
                              },
                           },
                        },
                     ],
                  },
                  {
                     district: {
                        contains: district1,
                     },
                     AND: [
                        {
                           product: {
                              name: {
                                 contains: productName,
                              },
                           },
                        },
                     ],
                  },
                  {
                     district: {
                        contains: district2,
                     },
                     AND: [
                        {
                           product: {
                              name: {
                                 contains: productName,
                              },
                           },
                        },
                     ],
                  },
               ],
            },
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

   getSearch = async (req, res, next) => {
      const { address, city, district, ward, productName } = req.query;

      try {
         const response = await prisma.pin.findMany({
            where: {
               AND: [
                  {
                     address: {
                        contains: address,
                     },
                  },
                  {
                     city: {
                        contains: city,
                     },
                  },
                  {
                     district: {
                        contains: district,
                     },
                  },
                  {
                     ward: {
                        contains: ward,
                     },
                  },
                  {
                     product: {
                        name: {
                           contains: productName,
                        },
                     },
                  },
               ],
            },
            include: {
               product: {
                  include: {
                     User: true,
                  },
               },
            },
         });

         return res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };
}

module.exports = new PinController();
