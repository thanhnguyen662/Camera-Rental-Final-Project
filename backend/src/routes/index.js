const productRouter = require('./product');
const accountRouter = require('./account');
const conversationRouter = require('./conversation');
const messageRouter = require('./message');
const cartRouter = require('./cart');
const pinRouter = require('./pin');
const orderRouter = require('./order');
const commentRouter = require('./comment');
const searchRouter = require('./search');
const categoryRouter = require('./category');
const postRouter = require('./post');
const conversationBeta1 = require('./conversationBeta1');

function route(app) {
   app.use('/conversationBeta1', conversationBeta1);
   app.use('/account', accountRouter);
   app.use('/product', productRouter);
   app.use('/conversation', conversationRouter);
   app.use('/message', messageRouter);
   app.use('/cart', cartRouter);
   app.use('/pin', pinRouter);
   app.use('/order', orderRouter);
   app.use('/comment', commentRouter);
   app.use('/search', searchRouter);
   app.use('/category', categoryRouter);
   app.use('/post', postRouter);
}

module.exports = route;
