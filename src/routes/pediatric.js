const expression = require('express');
const router = expression.Router();

const pediatricController = require('../app/controllers/PediatricController');


router.get('/create', pediatricController.create);
router.post('/store', pediatricController.store);
router.get ('/:id/edit', pediatricController.edit);
router.put ('/:id', pediatricController.update);
router.patch('/:id/restore', pediatricController.restore);
router.delete('/:id', pediatricController.delete);
router.delete('/:id/force', pediatricController.forceDelete);
// router.get ('/:slug', pediatricController.show);

module.exports = router;