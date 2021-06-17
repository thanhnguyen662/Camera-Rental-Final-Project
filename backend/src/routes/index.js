const productRouter = require('./product');
const accountRouter = require('./account');
const conversationRouter = require('./conversation');
const messageRouter = require('./message');

function route(app) {
   app.use('/account', accountRouter);
   app.use('/product', productRouter);
   app.use('/conversation', conversationRouter);
   app.use('/message', messageRouter);
}

module.exports = route;
