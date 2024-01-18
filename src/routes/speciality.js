const expression = require('express');
const router = expression.Router();

const specialityController = require('../app/controllers/SpecialityController');


router.get('/create', specialityController.create);
router.post('/store', specialityController.store);
router.get ('/:id/edit', specialityController.edit);
router.put ('/:id', specialityController.update);
router.patch('/:id/restore', specialityController.restore);
router.delete('/:id', specialityController.delete);
router.delete('/:id/force', specialityController.forceDelete);
// router.get ('/:slug', HospitalController.show);

module.exports = router;