const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const prisma = require('../models/prisma');

let initGoogleLocal = (res) => {
   passport.use(
      new GoogleStrategy(
         {
            clientID:
               '954370791076-l7jqpa5fo69gjsqjvbdva4cc2a9n217d.apps.googleusercontent.com',
            clientSecret: 'HXrb0fsQXvP43M5ZsZvBqs73',
            callbackURL: '/account/login/google/callback',
         },

         async (token, tokenSecret, profile, done) => {
            console.log('token: ', token);
            console.log('tokenSecret: ', tokenSecret);
            const existingUser = await prisma.user.findFirst({
               where: { googleId: profile.id },
            });

            if (existingUser) {
               return done(null, existingUser);
            }

            const user = await prisma.user.create({
               data: {
                  googleId: profile.id,
                  email: profile.emails[0].value,
               },
            });
            done(null, user);
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
      await prisma.user.findFirst({
         where: { id: id },
      })
   );
});

module.exports = initGoogleLocal;
