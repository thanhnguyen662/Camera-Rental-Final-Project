const passport = require('passport');
const jwt = require('jsonwebtoken');
const initJWTstrategy = require('../app/auth/JwtStrategy');

initJWTstrategy();

exports.COOKIE_OPTIONS = {
  httpOnly: true,
  signed: true,
  maxAge: process.env.COOKIE_EXPIRY,
};

exports.getToken = (user) => {
  const getToken = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.SESSION_EXPIRY,
  });
  return getToken;
};

exports.getRefreshToken = (user) => {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
  return refreshToken;
};

exports.verifyRefreshToken = (refreshToken) => {
  const verifyRefreshToken = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
  return verifyRefreshToken;
};

exports.verifyUser = passport.authenticate('jwt', { session: false });
