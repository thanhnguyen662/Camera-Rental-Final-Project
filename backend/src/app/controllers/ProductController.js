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

         res.json(getProducts);
      } catch (error) {
         return next(error);
      }
   };

   getProductDetail = async (req, res) => {
      try {
         const getProductDetail = await prisma.product.findUnique({
            where: {
               slug: String(req.params.productSlug),
            },
         });

         return res.status(200).json(getProductDetail);
      } catch (error) {
         return res.status(404).send({ message: 'Cant find product details' });
      }
   };

   createNewProduct = async (req, res) => {
      try {
         const createNewProduct = await prisma.product.create({
            data: {
               name: req.body.name,
               description: req.body.description,
               firebaseId: req.user.id,
               slug: `${slugify(req.body.name)}-${shortid.generate()}`,
            },
         });

         res.status(200).json(createNewProduct);
      } catch (error) {
         return res.status(404).send({ message: 'Cant create product' });
      }
   };
}

module.exports = new ProductController();
