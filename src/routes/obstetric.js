const expression = require('express');
const router = expression.Router();

const obstetricController = require('../app/controllers/ObstetricController');


router.get('/create', obstetricController.create);
router.post('/store', obstetricController.store);
router.get ('/:id/edit', obstetricController.edit);
router.put ('/:id', obstetricController.update);
router.patch('/:id/restore', obstetricController.restore);
router.delete('/:id', obstetricController.delete);
router.delete('/:id/force', obstetricController.forceDelete);
// router.get ('/:slug', obstetricController.show);

module.exports = router;