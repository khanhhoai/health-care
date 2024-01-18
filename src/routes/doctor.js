const expression = require('express');
const router = expression.Router();

const doctorController = require('../app/controllers/DoctorController');


router.get('/create', doctorController.create);
router.post('/store', doctorController.store);
router.get ('/:id/edit', doctorController.edit);
router.put ('/:id', doctorController.update);
router.patch('/:id/restore', doctorController.restore);
router.delete('/:id', doctorController.delete);
router.delete('/:id/force', doctorController.forceDelete);
// router.get ('/:slug', doctorController.show);

module.exports = router;