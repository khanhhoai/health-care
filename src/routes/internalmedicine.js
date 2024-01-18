const expression = require('express');
const router = expression.Router();

const internalmedicineController = require('../app/controllers/InternalmedicineController');


router.get('/create', internalmedicineController.create);
router.post('/store', internalmedicineController.store);
router.get ('/:id/edit', internalmedicineController.edit);
router.put ('/:id', internalmedicineController.update);
router.patch('/:id/restore', internalmedicineController.restore);
router.delete('/:id', internalmedicineController.delete);
router.delete('/:id/force', internalmedicineController.forceDelete);
// router.get ('/:slug', internalmedicineController.show);

module.exports = router;