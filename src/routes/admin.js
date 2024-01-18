const expression = require('express');
const router = expression.Router();

const adminController = require('../app/controllers/AdminController');


router.get('/stored/news', adminController.storedNews);
router.get('/trash/news', adminController.trashNews);
router.get('/stored/hospital', adminController.storedHospital);
router.get('/trash/hospital', adminController.trashHospital);
router.get('/stored/doctor', adminController.storedDoctor);
router.get('/trash/doctor', adminController.trashDoctor);
router.get('/stored/domain', adminController.storedDomain);
router.get('/trash/domain', adminController.trashDomain);
router.get('/stored/speciality', adminController.storedSpeciality);
router.get('/trash/speciality', adminController.trashSpeciality);
router.get('/stored/surgery', adminController.storedSurgery);
router.get('/trash/surgery', adminController.trashSurgery);
router.get('/stored/pediatric', adminController.storedPediatric);
router.get('/trash/pediatric', adminController.trashPediatric);
router.get('/stored/obstetric', adminController.storedObstetric);
router.get('/trash/obstetric', adminController.trashObstetric);
router.get('/stored/internalmedicine', adminController.storedInternalmedicine);
router.get('/trash/internalmedicine', adminController.trashInternalmedicine); 
module.exports = router;