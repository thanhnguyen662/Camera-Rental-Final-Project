const prisma = require('../models/prisma');

class PostController {
   createNewPost = async (req, res, next) => {
      try {
         const { products, caption, images, userId } = req.body;
         const preparePostProductData = products?.reduce((array, item) => {
            array.push({
               productId: item,
            });
            return array;
         }, []);

         const response = await prisma.post.create({
            data: {
               caption: caption,
               images: images,
               userId: userId,
               postProducts: {
                  create: preparePostProductData,
               },
            },
            include: {
               user: true,
               comments: {
                  take: 3,
                  orderBy: {
                     createdAt: 'asc',
                  },
               },
               postProducts: {
                  include: {
                     product: {
                        select: {
                           id: true,
                           productPhotoURL: true,
                           brand: true,
                           slug: true,
                           price: true,
                           name: true,
                           categories: {
                              select: {
                                 name: true,
                              },
                           },
                        },
                     },
                  },
               },
               _count: {
                  select: {
                     comments: true,
                  },
               },
            },
         });

         response.like = 0;

         return res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };

   getPost = async (req, res, next) => {
      try {
         const response = await prisma.post.findMany({
            orderBy: {
               updatedAt: 'desc',
            },
            include: {
               user: true,
               comments: {
                  take: 3,
                  orderBy: {
                     createdAt: 'asc',
                  },
               },
               postProducts: {
                  include: {
                     product: {
                        select: {
                           id: true,
                           productPhotoURL: true,
                           brand: true,
                           slug: true,
                           price: true,
                           name: true,
                           categories: {
                              select: {
                                 name: true,
                              },
                           },
                        },
                     },
                  },
               },
               _count: {
                  select: {
                     comments: true,
                  },
               },
            },
         });

         req.query.userId &&
            response.map((post) => {
               post.isLike = post.like.some((l) => l === req.query.userId)
                  ? true
                  : false;
               post.like = post.like.length;
            });

         return res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };

   likePost = async (req, res, next) => {
      try {
         const response = await prisma.post.findUnique({
            where: {
               id: Number(req.body.postId),
            },
            select: {
               like: true,
            },
         });

         if (!response) return res.status(404);
         response.like.push(req.body.userId);

         const updateLikeOfPost = await prisma.post.update({
            where: {
               id: Number(req.body.postId),
            },
            data: {
               like: response.like,
            },
            select: {
               id: true,
               like: true,
            },
         });

         updateLikeOfPost.like = updateLikeOfPost.like.length;
         updateLikeOfPost.isLike = true;

         return res.status(200).json(updateLikeOfPost);
      } catch (error) {
         return next(error);
      }
   };

   unlikePost = async (req, res, next) => {
      try {
         const response = await prisma.post.findUnique({
            where: {
               id: Number(req.body.postId),
            },
            select: {
               like: true,
            },
         });

         if (!response) return res.status(404);
         const filter = response.like.filter(
            (user) => user !== req.body.userId
         );

         const updateLikeOfPost = await prisma.post.update({
            where: {
               id: Number(req.body.postId),
            },
            data: {
               like: filter,
            },
            select: {
               id: true,
               like: true,
            },
         });

         updateLikeOfPost.like = updateLikeOfPost.like.length;
         updateLikeOfPost.isLike = false;

         return res.status(200).json(updateLikeOfPost);
      } catch (error) {
         return next(error);
      }
   };
}

module.exports = new PostController();
