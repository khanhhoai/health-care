const expression = require('express');
const router = expression.Router();

const hospitalController = require('../app/controllers/HospitalController');


router.get('/create', hospitalController.create);
router.post('/store', hospitalController.store);
router.get ('/:id/edit', hospitalController.edit);
router.put ('/:id', hospitalController.update);
router.patch('/:id/restore', hospitalController.restore);
router.delete('/:id', hospitalController.delete);
router.delete('/:id/force', hospitalController.forceDelete);
// router.get ('/:slug', HospitalController.show);

module.exports = router;