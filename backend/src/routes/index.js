const accountRouter = require('./account');

function route(app) {
  app.use('/account', accountRouter);
}

module.exports = route;
