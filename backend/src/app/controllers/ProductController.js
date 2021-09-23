const prisma = require('../models/prisma');
const slugify = require('slugify');
const shortid = require('shortid');

class ProductController {
   getProducts = async (req, res, next) => {
      try {
         const page = Number(req.query.page);
         const take = Number(req.query.take);
         const getProducts = await prisma.product.findMany({
            take: take,
            skip: (page - 1) * take,
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
               orderItems: true,
               pins: true,
               categories: true,
            },
         });

         return res.status(200).json(getProductDetail);
      } catch (error) {
         // return res.status(404).send({ message: 'Cant find product details' });
         return next(error);
      }
   };

   getProductComment = async (req, res, next) => {
      try {
         const page = Number(req.query.page);
         const take = 3;
         const response = await prisma.productComment.findMany({
            take: take,
            skip: (page - 1) * take,
            where: { productId: Number(req.query.productId) },
            include: { user: true },
            orderBy: {
               createdAt: 'desc',
            },
         });

         const count = await prisma.productComment.count({
            where: { productId: Number(req.query.productId) },
         });
         res.status(200).json({ comments: response, count: count });
      } catch (error) {
         return next(error);
      }
   };

   getOrderIncludeProductInDay = async (req, res, next) => {
      try {
         const response = await prisma.order.findMany({
            where: {
               AND: [
                  {
                     orderItems: {
                        some: {
                           Product: {
                              slug: req.query.slug,
                           },
                        },
                     },
                  },
                  {
                     orderStatusId: {
                        equals: 3,
                     },
                  },
                  {
                     paidAt: {
                        gte: new Date(req.query.date),
                     },
                  },
               ],
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
               categoryId: Number(req.body.categoryId),

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

   updateProduct = async (req, res, next) => {
      try {
         const response = await prisma.product.update({
            where: {
               id: parseInt(req.body.productId),
            },
            data: {
               name: req.body.name,
               description: req.body.description,
               productPhotoURL: req.body.productPhotoURL,
               brand: req.body.brand,
               price: String(req.body.price),
               stock: Number(req.body.stock),
               categoryId: Number(req.body.categoryId),

               pins: {
                  update: {
                     data: {
                        lat: String(req.body.lat),
                        long: String(req.body.long),
                        address: String(req.body.address),
                        ward: String(req.body.ward),
                        city: String(req.body.city),
                        district: String(req.body.district),
                     },
                     where: {
                        productId: parseInt(req.body.productId),
                     },
                  },
               },
            },
         });

         res.status(200).json(response);
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
         });
         return res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };

   getTopRenting = async (req, res, next) => {
      try {
         const response = await prisma.product.findMany({
            take: 5,
            orderBy: {
               completed: 'desc',
            },
         });

         return res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };

   getNewProduct = async (req, res, next) => {
      try {
         const response = await prisma.product.findMany({
            take: 4,
            orderBy: {
               createdAt: 'desc',
            },
            select: {
               id: true,
               name: true,
               productPhotoURL: true,
               User: {
                  select: {
                     photoURL: true,
                     address: true,
                     username: true,
                  },
               },
            },
         });

         return res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };

   getOtherProductInShop = async (req, res, next) => {
      try {
         const take = Number(req.query.take) || null;
         const page = Number(req.query.page) || 1;
         const response = await prisma.product.findMany({
            take: take,
            skip: (page - 1) * take,
            where: {
               User: { firebaseId: req.query.userId },
            },
            orderBy: { createdAt: 'desc' },
         });

         res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };

   getTopRentingProductInShop = async (req, res, next) => {
      try {
         const take = Number(req.query.take) || null;
         const page = Number(req.query.page) || 1;
         const response = await prisma.product.findMany({
            take: take,
            skip: (page - 1) * take,
            where: {
               User: { firebaseId: req.query.userId },
            },
            orderBy: {
               completed: 'desc',
            },
         });

         res.status(200).send(response);
      } catch (error) {
         return next(error);
      }
   };

   getMyProductInShop = async (req, res, next) => {
      try {
         const page = Number(req.query.page);
         const take = Number(req.query.take);
         const response = await prisma.product.findMany({
            take: take,
            skip: (page - 1) * take,
            where: {
               User: {
                  firebaseId: req.query.userId,
               },
            },
         });
         res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };

   countMyProductInShop = async (req, res, next) => {
      try {
         const response = await prisma.product.count({
            where: {
               User: {
                  firebaseId: req.query.userId,
               },
            },
         });
         res.status(200).json({ _count: response });
      } catch (error) {
         return next(error);
      }
   };

   getProductInShopByCategory = async (req, res, next) => {
      try {
         const page = Number(req.query.page);
         const take = Number(req.query.take);
         const response = await prisma.product.findMany({
            take: take,
            skip: (page - 1) * take,
            where: {
               AND: [
                  {
                     User: { firebaseId: req.query.userId },
                  },
                  {
                     categories: {
                        name: {
                           contains: req.query.categoryName,
                           mode: 'insensitive',
                        },
                     },
                  },
               ],
            },
         });

         const count = await prisma.product.count({
            where: {
               AND: [
                  {
                     User: { firebaseId: req.query.userId },
                  },
                  {
                     categories: {
                        name: {
                           contains: req.query.categoryName,
                           mode: 'insensitive',
                        },
                     },
                  },
               ],
            },
         });
         res.status(200).json({ result: response, count });
      } catch (error) {
         return next(error);
      }
   };

   searchInShop = async (req, res, next) => {
      try {
         const response = await prisma.product.findMany({
            where: {
               AND: [
                  {
                     User: { firebaseId: req.query.userId },
                  },
                  {
                     OR: [
                        {
                           name: {
                              contains: req.query.keyword,
                              mode: 'insensitive',
                           },
                        },
                        {
                           brand: {
                              contains: req.query.keyword,
                              mode: 'insensitive',
                           },
                        },
                     ],
                  },
               ],
            },
         });
         res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };
}

module.exports = new ProductController();
