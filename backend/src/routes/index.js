const productRouter = require('./product');
const accountRouter = require('./account');
const conversationRouter = require('./conversation');
const messageRouter = require('./message');
const cartRouter = require('./cart');
const pinRouter = require('./pin');

function route(app) {
   app.use('/account', accountRouter);
   app.use('/product', productRouter);
   app.use('/conversation', conversationRouter);
   app.use('/message', messageRouter);
   app.use('/cart', cartRouter);
   app.use('/pin', pinRouter);
}

module.exports = route;
