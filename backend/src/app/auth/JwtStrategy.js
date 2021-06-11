const prisma = require('../models/prisma');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const passport = require('passport');

let initJWTstrategy = () => {
  passport.use(
    new JWTstrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (token, done) => {
        try {
          //extract token and check user info in db
          const userInDb = prisma.user.findUnique({
            where: { id: token.id },
          });
          if (!userInDb) return res.status(401);

          return done(null, token.user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

module.exports = initJWTstrategy;
