const expression = require('express');
const router = expression.Router();

const newsController = require('../app/controllers/NewsController');


router.get('/create', newsController.create);
router.post('/store', newsController.store);
router.get ('/:id/edit', newsController.edit);
router.put ('/:id', newsController.update);
router.patch('/:id/restore', newsController.restore);
router.delete('/:id', newsController.delete);
router.delete('/:id/force', newsController.forceDelete);
// router.get ('/:slug', newsController.show);

module.exports = router;