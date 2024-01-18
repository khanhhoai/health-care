const expression = require('express');
const router = expression.Router();

const domainController = require('../app/controllers/DomainController');


router.get('/create', domainController.create);
router.post('/store', domainController.store);
router.get ('/:id/edit', domainController.edit);
router.put ('/:id', domainController.update);
router.patch('/:id/restore', domainController.restore);
router.delete('/:id', domainController.delete);
router.delete('/:id/force', domainController.forceDelete);
// router.get ('/:slug', HospitalController.show);

module.exports = router;