const express = require('express');
const router = express.Router();
const searchController = require('../app/controllers/SearchController');
const authMiddleware = require('../firebase/middleware/auth-middleware');

router.get('/gear/suggestion', searchController.searchProductSuggestion);
router.get('/user/suggestion', searchController.searchUserSuggestion);
router.get('/result', searchController.searchResult);

module.exports = router;
