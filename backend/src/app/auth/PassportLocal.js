const passport = require('passport');
const prisma = require('../models/prisma');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

let initPassportLocal = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          let user = await prisma.user.findUnique({
            where: { email: String(email) },
          });

          if (!user) {
            return done(null, false);
          }

          let checkPassword = bcrypt.compareSync(password, user.password);

          if (!checkPassword) {
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          console.log(error);
          return done(null, false);
        }
      }
    )
  );
};

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  return done(
    null,
    await prisma.user.findUnique({
      where: { id: Number(id) },
    })
  );
});

module.exports = initPassportLocal;
