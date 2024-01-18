const expression = require('express');
const router = expression.Router();

const surgeryController = require('../app/controllers/SurgeryController');


router.get('/create', surgeryController.create);
router.post('/store', surgeryController.store);
router.get ('/:id/edit', surgeryController.edit);
router.put ('/:id', surgeryController.update);
router.patch('/:id/restore', surgeryController.restore);
router.delete('/:id', surgeryController.delete);
router.delete('/:id/force', surgeryController.forceDelete);
// router.get ('/:slug', surgeryController.show);

module.exports = router;