const prisma = require('../models/prisma');

const main = async () => {
   await prisma.category.upsert({
      where: {
         id: 6,
      },
      create: {
         name: 'DSLR',
         description:
            'Proident sunt amet tempor incididunt non ea culpa anim fugiat consectetur.',
      },
      update: {},
   });
   await prisma.category.upsert({
      where: {
         id: 6,
      },
      create: {
         name: 'Lens',
         description:
            'Reprehenderit ex et ad mollit. Laboris veniam magna amet mollit dolore.',
      },
      update: {},
   });
   await prisma.category.upsert({
      where: {
         id: 6,
      },
      create: {
         name: 'Accessories',
         description:
            'Aliquip amet commodo non culpa eu officia deserunt aute culpa quis.',
      },
      update: {},
   });

   await prisma.user.upsert({
      where: { firebaseId: 'UYU4Nk1gEbdqMiBNGSKqXQMuVXB2' },
      update: {},
      create: {
         firebaseId: 'BegV8GsLqzWuJ92z3EIb5q58xRp1',
         username: 'The Thanh 1',
         address: '52 Thanh Thuỷ, Thanh Bình, Hải Châu, Thành phố Đà Nẵng',
         phoneNumber: '0762634797',
         gender: 'Male',

         products: {
            createMany: [
               {
                  name: 'Canon EOS R5',
                  description:
                     '<p><a href="https://vjshop.vn/may-anh-mirrorless/canon-eos-r5-body-only"><strong>Canon EOS R5</strong></a> owns a 45MP Full-frame sensor designed and developed by Canon itself, providing high resolution images and videos. The DIGIC X processor featured on the 1DX III is also used for the EOS R5, providing fast data reading and processing.</p>',
                  slug: 'Canon-EOS-R5-oO696LquU',
                  brand: 'Canon',
                  price: 142,
                  qualityRate: 3.3,
                  stock: 21,
                  publicStatus: false,
                  productPhotoURL: [
                     'https://firebasestorage.googleapis.com/v0/b/camera-rental-firbase.appspot.com/o/products%2Ftest3%40gmail.com%2Fproduct%2Fb94212ac-8a84-41b7-a06b-9b0ff47e33d4.jpeg?alt=media&token=88c9c224-9848-4063-8e6a-22689656a81b',
                     'https://firebasestorage.googleapis.com/v0/b/camera-rental-firbase.appspot.com/o/products%2Ftest3%40gmail.com%2Fproduct%2F5c80c2af-145f-44a0-9ba4-bf6833366a9a.jpeg?alt=media&token=39223b7d-c3cf-46b2-8b79-71afb667fce7',
                     'https://firebasestorage.googleapis.com/v0/b/camera-rental-firbase.appspot.com/o/products%2Ftest3%40gmail.com%2Fproduct%2F71e3194e-c04a-4d25-8291-1cd8eabe5a9c.jpeg?alt=media&token=93f57563-af09-4016-9279-f26e2b044b4c',
                     'https://firebasestorage.googleapis.com/v0/b/camera-rental-firbase.appspot.com/o/products%2Ftest3%40gmail.com%2Fproduct%2Fc639a421-ac8f-46ae-9e37-8e9e60f17510.jpeg?alt=media&token=53ab08e9-277f-4566-bc23-339207ec12ce',
                  ],
                  categoryId: 1,
                  pins: {
                     create: {
                        address: '436 Hùng Vương',
                        lat: '16.06750357477243',
                        long: '108.21095047017435',
                        ward: 'Phường Vĩnh Trung',
                        district: 'Quận Sơn Trà',
                        city: 'Thành phố Đà Nẵng',
                     },
                  },
               },
               {
                  name: 'Canon EOS 5D IV',
                  description:
                     '<p>At $2500, the Canon EOS <strong>5D Mark IV</strong> is Canon s high-end camera line aimed at professional photographers. The premium design comes with lots of cutting-edge technology, making it the perfect choice for today s top photographers.</p>',
                  slug: 'Canon-EOS-5D-Mark-IV-LCWS75ERY',
                  brand: 'Canon',
                  price: 453,
                  qualityRate: 3.7,
                  stock: 67,
                  publicStatus: false,
                  productPhotoURL: [
                     'https://firebasestorage.googleapis.com/v0/b/camera-rental-firbase.appspot.com/o/products%2Ftest3%40gmail.com%2Fproduct%2F968caaf0-f1bb-4928-9d81-cbd613284ee5.jpeg?alt=media&token=40430627-3154-40e4-9153-f46f6b0a2aa9',
                     'https://firebasestorage.googleapis.com/v0/b/camera-rental-firbase.appspot.com/o/products%2Ftest3%40gmail.com%2Fproduct%2Fcb3d8baf-5d85-4e78-a4c8-aeb9236027ce.jpeg?alt=media&token=189ed223-03cd-4483-adde-e3fee9da7294',
                     'https://firebasestorage.googleapis.com/v0/b/camera-rental-firbase.appspot.com/o/products%2Ftest3%40gmail.com%2Fproduct%2F0b02920c-59c5-438c-8650-5cdf6fc56880.jpeg?alt=media&token=2b60d43d-ade0-43a0-9d11-1a4ffe723a59',
                     'https://firebasestorage.googleapis.com/v0/b/camera-rental-firbase.appspot.com/o/products%2Ftest3%40gmail.com%2Fproduct%2Fa1ed8563-a1b7-454e-9608-007fb2b5912e.jpeg?alt=media&token=173f9d4d-c449-4c8f-a3db-7569b341acbc',
                  ],
                  categoryId: 1,
                  pins: {
                     create: {
                        address: '113 Đường Hà Huy Tập',
                        lat: '16.06544101029933',
                        long: '108.19217145527819',
                        ward: 'Phường Hòa Khê',
                        district: 'Quận Thanh Khê',
                        city: 'Thành phố Đà Nẵng',
                     },
                  },
               },
            ],
         },
      },
   });

   await prisma.orderStatus.upsert({
      where: {
         id: 1,
      },
      create: {
         name: 'PENDING',
      },
      update: {},
   });
   await prisma.orderStatus.upsert({
      where: {
         id: 2,
      },
      create: {
         name: 'DELIVERY',
      },
      update: {},
   });
   await prisma.orderStatus.upsert({
      where: {
         id: 3,
      },
      create: {
         name: 'RENTED',
      },
      update: {},
   });
   await prisma.orderStatus.upsert({
      where: {
         id: 4,
      },
      create: {
         name: 'FAILURE',
      },
      update: {},
   });
   await prisma.orderStatus.upsert({
      where: {
         id: 5,
      },
      create: {
         name: 'ACCEPT',
      },
      update: {},
   });
   await prisma.orderStatus.upsert({
      where: {
         id: 6,
      },
      create: {
         name: 'BACK',
      },
      update: {},
   });
};

main()
   .catch((e) => {
      console.error(e);
      process.exit(1);
   })
   .finally(async () => {
      await prisma.$disconnect();
   });
