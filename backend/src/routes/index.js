const productRouter = require('./product');
const accountRouter = require('./account');
const conversationRouter = require('./conversation');
const messageRouter = require('./message');
const cartRouter = require('./cart');
const pinRouter = require('./pin');
const orderRouter = require('./order');
const commentRouter = require('./comment');

function route(app) {
   app.use('/account', accountRouter);
   app.use('/product', productRouter);
   app.use('/conversation', conversationRouter);
   app.use('/message', messageRouter);
   app.use('/cart', cartRouter);
   app.use('/pin', pinRouter);
   app.use('/order', orderRouter);
   app.use('/comment', commentRouter);
}

module.exports = route;
