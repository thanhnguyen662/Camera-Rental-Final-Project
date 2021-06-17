const express = require('express');
const router = express.Router();
const accountController = require('../app/controllers/AccountController');
const secureRoute = require('../routes/secure-routes');
const { verifyUser } = require('../utils/authenticate');

router.post('/register', accountController.register);
router.post('/login', accountController.login);
router.post('/refreshToken', accountController.refreshToken);
router.get('/logout', verifyUser, accountController.logout);
router.get('/profile', verifyUser, secureRoute);
router.get('/', accountController.getUser);

module.exports = router;
