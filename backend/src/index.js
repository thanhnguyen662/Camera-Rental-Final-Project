const express = require('express');
const app = express();
const port = 4000;
const route = require('./routes');
// const passport = require('passport');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

app.use(
   cors({
      origin: 'http://localhost:3000',
      credentials: true,
   })
);

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
   express.urlencoded({
      extended: true,
   })
);

app.use(express.json());

// app.use(passport.initialize());

route(app);

app.listen(port, () => {
   console.log(`listening on http://localhost:${port}`);
});
