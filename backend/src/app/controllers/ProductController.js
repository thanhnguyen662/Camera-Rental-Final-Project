const prisma = require('../models/prisma');
const slugify = require('slugify');
const shortid = require('shortid');

class ProductController {
   getProducts = async (req, res, next) => {
      try {
         const getProducts = await prisma.product.findMany({
            include: {
               User: true,
            },
         });

         res.status(200).json(getProducts);
      } catch (error) {
         return next(error);
      }
   };

   getProductDetail = async (req, res, next) => {
      try {
         const getProductDetail = await prisma.product.findUnique({
            where: {
               slug: String(req.params.productSlug),
            },
            include: {
               User: true,
               productComments: {
                  include: {
                     user: true,
                  },
               },
            },
         });

         return res.status(200).json(getProductDetail);
      } catch (error) {
         // return res.status(404).send({ message: 'Cant find product details' });
         return next(error);
      }
   };

   createNewProduct = async (req, res, next) => {
      try {
         const createNewProduct = await prisma.product.create({
            data: {
               name: req.body.name,
               description: req.body.description,
               firebaseId: req.body.id,
               productPhotoURL: req.body.productPhotoURL,
               slug: `${slugify(req.body.name)}-${shortid.generate()}`,
               brand: req.body.brand,
               price: String(req.body.price),
               stock: Number(req.body.stock),

               pins: {
                  create: {
                     lat: String(req.body.lat),
                     long: String(req.body.long),
                     address: String(req.body.address),
                     ward: String(req.body.ward),
                     city: String(req.body.city),
                     district: String(req.body.district),
                  },
               },
            },
         });

         res.status(200).json(createNewProduct);
      } catch (error) {
         return next(error);
      }
   };

   getMyProduct = async (req, res, next) => {
      try {
         const response = await prisma.product.findMany({
            where: {
               User: {
                  firebaseId: req.query.firebaseId,
               },
            },
            include: {
               User: true,
            },
         });
         return res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };
}

module.exports = new ProductController();
