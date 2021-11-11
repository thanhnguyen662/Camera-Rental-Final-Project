const prisma = require('../models/prisma');
const moment = require('moment');
class OrderController {
   createOrder = async (req, res, next) => {
      try {
         const orderData = req.body.orderData;
         const uniqueUsername = orderData.reduce((array, item) => {
            array.some((username) => username === item.Product.User.username)
               ? null
               : array.push(item.Product.User.username);
            return array;
         }, []);

         const filterOrderByUsername = (user) => {
            const filter = orderData.filter(
               (order) => user === order.Product.User.username
            );
            return filter;
         };

         let isEqual = true;
         uniqueUsername.map((user) => {
            const filterByUsername = filterOrderByUsername(user);
            if (filterByUsername.length <= 1) return;
            filterByUsername.map((order) => {
               const baseStartDate = new Date(filterByUsername[0].startDate);
               const baseEndDate = new Date(filterByUsername[0].endDate);
               if (filterByUsername.indexOf(order) === 0) return;

               !moment(order.startDate).isSame(moment(baseStartDate)) ||
               !moment(order.endDate).isSame(moment(baseEndDate))
                  ? (isEqual = false)
                  : (isEqual = true);
            });
         });
         if (!isEqual)
            return res.status(200).json({ message: 'Date not equal' });

         uniqueUsername.map(async (user) => {
            let totalPrice = 0;
            let orderItems = [];
            const filterByUsername = filterOrderByUsername(user);
            filterByUsername.map((order) => {
               const startDate = moment(order.startDate);
               const endDate = moment(order.endDate);
               const during = endDate.diff(startDate, 'hours');
               const pricePerRow =
                  parseInt(order.Product.price) * parseInt(during);
               totalPrice += pricePerRow;

               return orderItems.push({
                  productId: Number(order.Product.id),
                  startDate: new Date(order.startDate),
                  endDate: new Date(order.endDate),
                  price: Number(order.Product.price),
                  totalPricePerHour: String(pricePerRow),
                  during: String(during),
               });
            });
            await prisma.order.create({
               data: {
                  orderStatusId: 1,
                  address: req.body.userAddress,
                  userId: req.body.userId,
                  totalPrice: totalPrice,
                  orderItems: {
                     createMany: { data: orderItems },
                  },
               },
            });
         });
         return res.status(200).json({ message: 'Create Order Success' });
      } catch (error) {
         return next(error);
      }
   };

   // manageOrder = async (req, res, next) => {
   //    try {
   //       const page = req.query.page;
   //       const take = page ? 4 : undefined;
   //       const response = await prisma.order.findMany({
   //          take: take,
   //          skip: (page - 1) * 4 || undefined,
   //          where: {
   //             AND: {
   //                userId: req.query.userId,
   //                orderStatusId: {
   //                   equals: parseInt(req.query.orderStatusId) || undefined,
   //                },
   //             },
   //          },
   //          include: {
   //             orderStatus: true,
   //             User: true,
   //             orderItems: {
   //                include: {
   //                   Product: {
   //                      include: {
   //                         User: true,
   //                      },
   //                   },
   //                },
   //             },
   //          },
   //       });

   //       res.status(200).json(response);
   //    } catch (error) {
   //       return next(error);
   //    }
   // };

   // myProductInOrder = async (req, res, next) => {
   //    try {
   //       const page = req.query.page;
   //       const take = page ? 10 : undefined;
   //       const response = await prisma.order.findMany({
   //          take: take,
   //          skip: (page - 1) * 10 || undefined,
   //          where: {
   //             AND: {
   //                orderItems: {
   //                   some: {
   //                      Product: {
   //                         User: {
   //                            firebaseId: req.query.firebaseId,
   //                         },
   //                      },
   //                   },
   //                },
   //                orderStatus: {
   //                   name: req.query.orderStatus || undefined,
   //                },
   //             },
   //          },
   //          include: {
   //             User: true,
   //             orderStatus: true,
   //             orderItems: {
   //                include: {
   //                   Product: {
   //                      include: {
   //                         User: true,
   //                      },
   //                   },
   //                },
   //             },
   //          },
   //       });

   //       res.status(200).json(response);
   //    } catch (error) {
   //       return next(error);
   //    }
   // };

   // deleteOrder = async (req, res, next) => {
   //    try {
   //       const response = await prisma.order.delete({
   //          where: {
   //             id: req.body.orderId,
   //          },
   //       });

   //       return res.status(200).json(response);
   //    } catch (error) {
   //       return next(error);
   //    }
   // };

   // updateOrder = async (req, res, next) => {
   //    try {
   //       const orderItemsBatch = req.body.orderItems;
   //       const orderStatusId = req.body.orderStatusId;

   //       const response = await prisma.order.update({
   //          where: {
   //             id: req.body.orderId,
   //          },
   //          data: {
   //             orderStatusId: req.body.orderStatusId,
   //             note: req.body.note,
   //             paidAt: new Date(req.body.paidAt),
   //             backAt: new Date(req.body.backAt),
   //          },
   //          include: {
   //             User: true,
   //             orderStatus: true,
   //             orderItems: {
   //                include: {
   //                   Product: {
   //                      include: {
   //                         User: true,
   //                      },
   //                   },
   //                },
   //             },
   //          },
   //       });

   //       parseInt(orderStatusId) === 5 &&
   //          orderItemsBatch.map(async (order) => {
   //             await prisma.product.update({
   //                where: {
   //                   id: order.Product.id,
   //                },
   //                data: {
   //                   stock: parseInt(order.Product.stock) - 1,
   //                },
   //             });
   //          });
   //       parseInt(orderStatusId) === 4 &&
   //          orderItemsBatch.map(async (order) => {
   //             await prisma.product.update({
   //                where: {
   //                   id: order.Product.id,
   //                },
   //                data: {
   //                   stock: parseInt(order.Product.stock) + 1,
   //                },
   //             });
   //          });

   //       return res.status(200).json(response);
   //    } catch (error) {
   //       return next(error);
   //    }
   // };

   // updateToPaidStatus = async (req, res, next) => {
   //    try {
   //       const response = await prisma.order.update({
   //          where: {
   //             id: req.body.orderId,
   //          },
   //          data: {
   //             orderStatusId: req.body.orderStatusId,
   //             note: req.body.note,
   //             paidAt: new Date(req.body.paidAt),
   //          },
   //          include: {
   //             User: true,
   //             orderStatus: true,
   //             orderItems: {
   //                include: {
   //                   Product: {
   //                      include: {
   //                         User: true,
   //                      },
   //                   },
   //                },
   //             },
   //          },
   //       });

   //       return res.status(200).json(response);
   //    } catch (error) {
   //       return next(error);
   //    }
   // };

   // updateToBackStatus = async (req, res, next) => {
   //    const orderItemsBatch = req.body.orderItems;
   //    const orderStatusId = req.body.orderStatusId;
   //    try {
   //       const response = await prisma.order.update({
   //          where: {
   //             id: req.body.orderId,
   //          },
   //          data: {
   //             orderStatusId: req.body.orderStatusId,
   //             backAt: new Date(req.body.backAt),
   //          },
   //          include: {
   //             User: true,
   //             orderStatus: true,
   //             orderItems: {
   //                include: {
   //                   Product: {
   //                      include: {
   //                         User: true,
   //                      },
   //                   },
   //                },
   //             },
   //          },
   //       });

   //       parseInt(orderStatusId) === 6 &&
   //          orderItemsBatch.map(async (order) => {
   //             await prisma.product.update({
   //                where: {
   //                   id: order.Product.id,
   //                },
   //                data: {
   //                   stock: parseInt(order.Product.stock) + 1,
   //                   completed: parseInt(order.Product.completed) + 1,
   //                },
   //             });
   //          });

   //       return res.status(200).json(response);
   //    } catch (error) {
   //       return next(error);
   //    }
   // };

   // updateStats = async (req, res, next) => {
   //    const getAllOrderOfUser = await prisma.order.findMany({
   //       where: {
   //          userId: req.query.userId,
   //       },
   //    });

   //    const getOrderExcludePendingAccept = await prisma.order.findMany({
   //       where: {
   //          AND: [
   //             {
   //                userId: req.query.userId,
   //             },
   //             {
   //                orderStatusId: {
   //                   notIn: 1, //PENDING
   //                },
   //             },
   //             {
   //                orderStatusId: {
   //                   notIn: 5, //ACCEPT
   //                },
   //             },
   //          ],
   //       },
   //    });

   //    const filterDeclineOrder = getOrderExcludePendingAccept.filter(
   //       (o) => o.note !== 'Decline'
   //    );

   //    //get accept order but user come = paidAt
   //    const getPaidOrder = await prisma.order.findMany({
   //       where: {
   //          AND: [
   //             {
   //                userId: req.query.userId,
   //             },
   //             {
   //                paidAt: {
   //                   not: null,
   //                },
   //             },
   //             {
   //                orderStatusId: {
   //                   notIn: 4, //FAILURE
   //                },
   //             },
   //          ],
   //       },
   //    });

   //    const getSuccessOrder = await prisma.order.findMany({
   //       where: {
   //          AND: [
   //             {
   //                paidAt: {
   //                   not: null,
   //                },
   //             },
   //             {
   //                backAt: {
   //                   not: null,
   //                },
   //             },
   //             {
   //                userId: req.query.userId,
   //             },
   //          ],
   //       },
   //       include: {
   //          orderItems: true,
   //       },
   //    });

   //    let inTimeArray = [];
   //    getSuccessOrder?.map((order) => {
   //       let backAt = order.backAt;
   //       order.orderItems.map((item) => {
   //          if (
   //             new Date(item.endDate).getDate() >= new Date(backAt).getDate()
   //          ) {
   //             inTimeArray.push(order.id);
   //          }
   //       });
   //    });

   //    const inTimeUniqueOrder = [...new Set(inTimeArray)];

   //    console.log(inTimeUniqueOrder.length);
   //    console.log(getSuccessOrder.length);

   //    const inTimeRate =
   //       (inTimeUniqueOrder.length / getSuccessOrder.length) * 100;
   //    const comeRate = (getPaidOrder.length / filterDeclineOrder.length) * 100;

   //    const updateStats = await prisma.userStat.upsert({
   //       where: {
   //          userId: req.query.userId,
   //       },
   //       update: {
   //          come: parseFloat(comeRate.toFixed(1)),
   //          success: parseFloat(inTimeRate.toFixed(1)),
   //          totalOrder: parseFloat(getAllOrderOfUser.length),
   //       },
   //       create: {
   //          userId: req.query.userId,
   //          come: parseFloat(inTimeRate.toFixed(1)),
   //          success: parseFloat(inTimeRate.toFixed(1)),
   //          totalOrder: parseFloat(getAllOrderOfUser.length),
   //       },
   //    });

   //    res.json(updateStats);
   // };

   // countMyProductOrder = async (req, res, next) => {
   //    try {
   //       const response = await prisma.order.groupBy({
   //          by: ['orderStatusId'],
   //          where: {
   //             orderItems: {
   //                some: {
   //                   Product: {
   //                      User: {
   //                         firebaseId: req.query.firebaseId,
   //                      },
   //                   },
   //                },
   //             },
   //          },
   //          _count: {
   //             _all: true,
   //          },
   //       });

   //       return res.status(200).json(response);
   //    } catch (error) {
   //       return next(error);
   //    }
   // };

   // myProductInOrderOverview = async (req, res, next) => {
   //    try {
   //       const response = await prisma.order.findMany({
   //          where: {
   //             AND: [
   //                {
   //                   orderItems: {
   //                      some: {
   //                         Product: {
   //                            User: {
   //                               firebaseId: req.query.firebaseId,
   //                            },
   //                         },
   //                      },
   //                   },
   //                },
   //             ],
   //          },
   //          select: {
   //             paidAt: true,
   //             totalPrice: true,
   //             createdAt: true,
   //          },
   //       });

   //       return res.status(200).json(response);
   //    } catch (error) {
   //       return next(error);
   //    }
   // };

   // updateIsComment = async (req, res, next) => {
   //    try {
   //       if (req.body.type === 'isShopComment') {
   //          const check = await prisma.order.findUnique({
   //             where: {
   //                id: req.body.orderId,
   //             },
   //             select: {
   //                isShopComment: true,
   //             },
   //          });
   //          if (check.isShopComment) {
   //             await prisma.userComment.delete({
   //                where: {
   //                   id: req.body.commentId,
   //                },
   //             });
   //             return res.status(200).send({ message: 'Already Comment' });
   //          }

   //          const response = await prisma.order.update({
   //             where: {
   //                id: req.body.orderId,
   //             },
   //             data: {
   //                isShopComment: true,
   //             },
   //          });

   //          res.status(200).send(response);
   //       }

   //       if (req.body.type === 'isUserComment') {
   //          const check = await prisma.order.findUnique({
   //             where: {
   //                id: req.body.orderId,
   //             },
   //             select: {
   //                isUserComment: true,
   //             },
   //          });
   //          if (check.isUserComment) {
   //             await prisma.userComment.delete({
   //                where: {
   //                   id: req.body.commentId,
   //                },
   //             });
   //             return res.status(200).send({ message: 'Already Comment' });
   //          }
   //          const response = await prisma.order.update({
   //             where: {
   //                id: req.body.orderId,
   //             },
   //             data: {
   //                isUserComment: true,
   //             },
   //          });

   //          res.status(200).send(response);
   //       }

   //       if (req.body.type === 'isProductComment') {
   //          const check = await prisma.order.findUnique({
   //             where: {
   //                id: req.body.orderId,
   //             },
   //             select: {
   //                isProductComment: true,
   //             },
   //          });
   //          if (check.isProductComment) {
   //             await prisma.productComment.delete({
   //                where: {
   //                   id: req.body.commentId,
   //                },
   //             });
   //             return res.status(200).send({ message: 'Already Comment' });
   //          }

   //          const response = await prisma.order.update({
   //             where: {
   //                id: req.body.orderId,
   //             },
   //             data: {
   //                isProductComment: true,
   //             },
   //          });

   //          res.status(200).send(response);
   //       }
   //    } catch (error) {
   //       return next(error);
   //    }
   // };

   //////////////////////////////
   overviewMyOrderStatus = async (req, res, next) => {
      try {
         const response = await prisma.order.groupBy({
            by: ['orderStatusId'],
            where: {
               orderItems: {
                  some: {
                     Product: {
                        User: { firebaseId: req.query.userId },
                     },
                  },
               },
            },
            _count: { _all: true },
         });

         res.status(200).send(response);
      } catch (error) {
         return next(error);
      }
   };

   orderRevenueInTime = async (req, res, next) => {
      try {
         const response = await prisma.order.findMany({
            where: {
               AND: [
                  {
                     orderItems: {
                        some: {
                           Product: {
                              User: { firebaseId: req.query.userId },
                           },
                        },
                     },
                  },
                  {
                     paidAt: { gte: new Date(req.query.startDate) },
                  },
                  {
                     paidAt: { lte: new Date(req.query.endDate) },
                  },
               ],
            },
            orderBy: { paidAt: 'desc' },
            select: {
               id: true,
               paidAt: true,
               totalPrice: true,
            },
         });

         const calculateRevenueByDay = response.reduce((unique, item) => {
            const paidAt = moment(item.paidAt).format('YYYY-MM-DD');
            if (unique.some((u) => u.paidAt === paidAt)) {
               const findIndex = unique.findIndex((i) => i.paidAt === paidAt);
               unique[findIndex].totalPrice =
                  unique[findIndex].totalPrice + item.totalPrice;
               unique[findIndex].orders = unique[findIndex].orders + 1;
            } else {
               unique.push({
                  paidAt: paidAt,
                  totalPrice: item.totalPrice,
                  orders: 1,
               });
            }
            return unique;
         }, []);

         calculateRevenueByDay.sort((a, b) => {
            return new Date(a.paidAt) - new Date(b.paidAt);
         });

         res.status(200).json(calculateRevenueByDay);
      } catch (error) {
         return next(error);
      }
   };

   orderCreateInTime = async (req, res, next) => {
      try {
         const response = await prisma.order.findMany({
            where: {
               AND: [
                  {
                     orderItems: {
                        some: {
                           Product: {
                              User: { firebaseId: req.query.userId },
                           },
                        },
                     },
                  },
                  {
                     createdAt: { gte: new Date(req.query.startDate) },
                  },
                  {
                     createdAt: { lte: new Date(req.query.endDate) },
                  },
               ],
            },
            orderBy: { createdAt: 'desc' },
            select: { id: true, createdAt: true },
         });

         const calculateCreateByDay = response.reduce((unique, item) => {
            const createdAt = moment(item.createdAt).format('YYYY-MM-DD');
            if (unique.some((u) => u.createdAt === createdAt)) {
               const findIndex = unique.findIndex(
                  (i) => i.createdAt === createdAt
               );
               unique[findIndex].orders = unique[findIndex].orders + 1;
            } else {
               unique.push({
                  createdAt: createdAt,
                  orders: 1,
               });
            }
            return unique;
         }, []);

         calculateCreateByDay.sort((a, b) => {
            return new Date(a.createdAt) - new Date(b.createdAt);
         });

         res.status(200).json(calculateCreateByDay);
      } catch (error) {
         return next(error);
      }
   };

   getOrderByStatus = async (req, res, next) => {
      try {
         const page = Number(req.query.page);
         const take = 10;
         const response = await prisma.order.findMany({
            take: take,
            skip: (page - 1) * take,
            where: {
               AND: [
                  {
                     orderItems: {
                        some: {
                           Product: {
                              User: { firebaseId: req.query.userId },
                           },
                        },
                     },
                  },
                  {
                     orderStatus: { name: req.query.statusName },
                  },
               ],
            },
            include: {
               orderItems: {
                  include: {
                     Product: {
                        select: {
                           productPhotoURL: true,
                           name: true,
                           price: true,
                        },
                     },
                  },
               },
               User: {
                  select: {
                     photoURL: true,
                     firebaseId: true,
                     username: true,
                  },
               },
               orderStatus: true,
            },
            orderBy: { createdAt: 'desc' },
         });

         res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };

   getMyOrder = async (req, res, next) => {
      try {
         const page = Number(req.query.page);
         const take = 10;
         const response = await prisma.order.findMany({
            take: take,
            skip: (page - 1) * take,
            where: {
               AND: [
                  { userId: req.query.userId },
                  {
                     orderStatus: { name: req.query.statusName },
                  },
               ],
            },
            include: {
               orderItems: {
                  include: {
                     Product: {
                        include: {
                           User: {
                              select: {
                                 photoURL: true,
                                 firebaseId: true,
                                 username: true,
                              },
                           },
                        },
                     },
                  },
               },
               User: {
                  select: {
                     photoURL: true,
                     firebaseId: true,
                     username: true,
                  },
               },
               orderStatus: true,
            },
            orderBy: {
               createdAt: 'desc',
            },
         });
         res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };

   updateOrderToAccept = async (req, res, next) => {
      try {
         const response = await prisma.order.update({
            where: { id: req.body.orderId },
            data: {
               orderStatusId: 5,
               acceptAt: moment().toISOString(),
            },
            include: {
               orderStatus: true,
               orderItems: {
                  include: {
                     Product: {
                        select: {
                           stock: true,
                        },
                     },
                  },
               },
            },
         });

         response.orderItems.map(async (item) => {
            await prisma.product.update({
               where: {
                  id: item.productId,
               },
               data: {
                  stock: item.Product.stock - 1,
               },
            });
         });

         res.status(200).json({
            message: 'Accept Order Success',
            id: response.id,
         });
      } catch (error) {
         return next(error);
      }
   };

   updateOrderToFailure = async (req, res, next) => {
      try {
         const response = await prisma.order.update({
            where: { id: req.body.orderId },
            data: {
               orderStatusId: 4,
               cancelAt: moment().toISOString(),
               note: req.body.note,
            },
         });

         res.status(200).json({
            id: response.id,
            userId: response.userId,
            message: 'Decline Order Success',
         });
      } catch (error) {
         return next(error);
      }
   };

   updateOrderToRented = async (req, res, next) => {
      try {
         const response = await prisma.order.update({
            where: { id: req.body.orderId },
            data: {
               orderStatusId: 3,
               paidAt: moment().toISOString(),
            },
         });

         res.status(200).json({
            id: response.id,
            userId: response.userId,
            message: 'Rented Order Success',
         });
      } catch (error) {
         return next(error);
      }
   };

   updateOrderToBack = async (req, res, next) => {
      try {
         const response = await prisma.order.update({
            where: { id: req.body.orderId },
            data: {
               orderStatusId: 6,
               backAt: moment().toISOString(),
            },
            include: {
               orderStatus: true,
               orderItems: {
                  include: {
                     Product: {
                        select: {
                           stock: true,
                           completed: true,
                        },
                     },
                  },
               },
            },
         });

         response.orderItems.map(async (item) => {
            await prisma.product.update({
               where: {
                  id: item.productId,
               },
               data: {
                  stock: parseInt(item.Product.stock) + 1,
                  completed: parseInt(item.Product.completed) + 1,
               },
            });
         });

         res.status(200).json({
            id: response.id,
            userId: response.userId,
            message: 'Back Order Success',
         });
      } catch (error) {
         return next(error);
      }
   };

   updateUserComeStat = async (req, res, next) => {
      try {
         const orderExcludePendingAcceptShopDecline =
            await prisma.order.findMany({
               where: {
                  AND: [
                     { userId: req.body.userId },
                     { orderStatusId: { notIn: 1 } }, //PENDING
                     { orderStatusId: { notIn: 5 } }, //ACCEPT
                  ],
               },
            });

         const filterExcludePendingAcceptShopDecline =
            orderExcludePendingAcceptShopDecline.filter(
               (o) => o.note !== 'Decline'
            );

         const paidAtOrder = await prisma.order.count({
            where: {
               AND: [{ userId: req.body.userId }, { paidAt: { not: null } }],
            },
         });

         const calculateComeRate =
            (paidAtOrder / filterExcludePendingAcceptShopDecline.length) * 100;

         await prisma.userStat.update({
            where: {
               userId: req.body.userId,
            },
            data: {
               come: parseFloat(calculateComeRate.toFixed(1)),
            },
         });
      } catch (error) {
         console.log(error);
      }
   };

   updateUserOrderSuccessStat = async (req, res, next) => {
      const getSuccessOrder = await prisma.order.findMany({
         where: {
            AND: [
               { paidAt: { not: null } },
               { backAt: { not: null } },
               { userId: req.body.userId },
            ],
         },
         include: { orderItems: true },
      });

      const orderBackInTime = getSuccessOrder.reduce((number, item) => {
         const endDateOfOrderItems = item.orderItems[0].endDate;
         const backDateOfOrder = item.backAt;
         if (moment(backDateOfOrder).isBefore(endDateOfOrderItems)) {
            number += 1;
         }
         return number;
      }, 0);

      const successRate = (orderBackInTime / getSuccessOrder.length) * 100;

      await prisma.userStat.update({
         where: { userId: req.body.userId },
         data: { success: parseInt(successRate.toFixed(1)) },
      });
   };

   getOrderById = async (req, res, next) => {
      try {
         const response = await prisma.order.findUnique({
            where: { id: req.query.orderId },
            include: {
               orderStatus: true,
               orderItems: {
                  include: {
                     Product: {
                        include: {
                           User: {
                              select: {
                                 firebaseId: true,
                                 username: true,
                                 phoneNumber: true,
                                 photoURL: true,
                              },
                           },
                        },
                     },
                  },
               },
               User: {
                  include: {
                     userStats: true,
                     _count: {
                        select: {
                           orders: true,
                        },
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

   createUserCommentBySeller = async (req, res, next) => {
      try {
         const checkShopIsComment = await prisma.order.findUnique({
            where: { id: req.body.orderId },
            select: { isShopComment: true },
         });

         if (checkShopIsComment.isShopComment) {
            return res
               .status(200)
               .json({ message: 'Already Comment', type: 'error' });
         }

         const createCommentByShop = await prisma.userComment.create({
            data: {
               content: req.body.content,
               rate: req.body.rate,
               userId: req.body.userId,
               authorId: req.body.authorId,
            },
         });

         await prisma.order.update({
            where: { id: req.body.orderId },
            data: { isShopComment: true },
         });

         const rateAverage = await prisma.userComment.aggregate({
            where: { userId: createCommentByShop.userId },
            _avg: { rate: true },
         });

         await prisma.user.update({
            where: { firebaseId: createCommentByShop.userId },
            data: { rate: parseFloat(rateAverage._avg.rate.toFixed(1)) },
         });

         createCommentByShop.message = 'Create Success';
         createCommentByShop.type = 'success';
         res.status(200).json(createCommentByShop);
      } catch (error) {
         return next(error);
      }
   };

   createUserCommentByBuyer = async (req, res, next) => {
      try {
         const checkUserIsComment = await prisma.order.findUnique({
            where: { id: req.body.orderId },
            select: { isUserComment: true },
         });

         if (checkUserIsComment.isUserComment) {
            return res
               .status(200)
               .json({ message: 'Already Comment', type: 'error' });
         }

         const createCommentByUser = await prisma.userComment.create({
            data: {
               content: req.body.content,
               rate: req.body.rate,
               userId: req.body.userId,
               authorId: req.body.authorId,
            },
         });

         await prisma.order.update({
            where: { id: req.body.orderId },
            data: { isUserComment: true },
         });

         const rateAverage = await prisma.userComment.aggregate({
            where: { userId: createCommentByUser.userId },
            _avg: { rate: true },
         });

         await prisma.user.update({
            where: { firebaseId: createCommentByUser.userId },
            data: { rate: parseFloat(rateAverage._avg.rate.toFixed(1)) },
         });

         createCommentByUser.message = 'Create Success';
         createCommentByUser.type = 'success';
         res.status(200).json(createCommentByUser);
      } catch (error) {
         return next(error);
      }
   };

   createOrderItemsComment = async (req, res, next) => {
      try {
         const checkOrderItemsIsComment = await prisma.orderItem.findUnique({
            where: { id: req.body.orderItemId },
            select: { isOrderItemComment: true },
         });

         if (checkOrderItemsIsComment.isOrderItemComment) {
            return res
               .status(200)
               .json({ message: 'Already Comment', type: 'error' });
         }

         const createProductComment = await prisma.productComment.create({
            data: {
               authorId: req.body.authorId,
               content: req.body.content,
               rate: req.body.rate,
               productId: req.body.productId,
            },
         });

         await prisma.orderItem.update({
            where: { id: req.body.orderItemId },
            data: { isOrderItemComment: true },
         });

         const rateAverage = await prisma.productComment.aggregate({
            where: { productId: req.body.productId },
            _avg: { rate: true },
         });

         await prisma.product.update({
            where: { id: req.body.productId },
            data: { qualityRate: parseFloat(rateAverage._avg.rate.toFixed(1)) },
         });

         createProductComment.message = 'Create Success';
         createProductComment.type = 'success';
         res.status(200).json(createProductComment);
      } catch (error) {
         return next(error);
      }
   };

   deletePendingOrder = async (req, res, next) => {
      try {
         await prisma.orderItem.deleteMany({
            where: {
               orderId: req.body.orderId,
            },
         });

         const response = await prisma.order.delete({
            where: {
               id: req.body.orderId,
            },
         });
         res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };
}

module.exports = new OrderController();
