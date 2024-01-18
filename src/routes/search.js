const expression = require('express');
const router = expression.Router();

const searchController = require('../app/controllers/SearchController');



router.post('/find', searchController.search);
router.get('/find/:slug', searchController.renderDetail)


// router.get ('/:slug', newsController.show);

module.exports = router;