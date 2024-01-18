const expression = require('express');
const router = expression.Router();
const siteController = require('../app/controllers/SiteController');
// const adminAuthMiddleware = require('./basicAuth');


// const isAuthenticated = (req, res, next) => {
//     if (req.session.isAuthenticated) {
//       next()
//     } else {

//       res.redirect('/login'); // Redirect to the login page
//     }
//   };
  
  const isAuthenticatedAndIsUser = (req, res, next) => {
    if (req.session.isAuthenticated && req.session.user && req.session.user.role === 'user') {
      next();
    } else {
      res.redirect('/login');
    }
  };
  
  const isAuthenticatedAndIsAdmin = (req, res, next) => {
    if (req.session.isAuthenticated && req.session.user && req.session.user.role === 'admin') {
      next();
    } else {
      res.redirect('/login');
    }
  };
  

router.get('/', siteController.homepage)
router.put('/profile-edit', isAuthenticatedAndIsUser, siteController.updateProfile)
// router.get('/profile/edit', isAuthenticatedAndIsUser, siteController.edit)
router.get('/user', isAuthenticatedAndIsUser, siteController.user)
router.get('/profile',isAuthenticatedAndIsUser, siteController.showProfile)
router.get('/profile/edit', isAuthenticatedAndIsUser, siteController.storedProfile)
router.get('/change-password', isAuthenticatedAndIsUser, siteController.password)
router.put('/change-password/:id',isAuthenticatedAndIsUser, siteController.changePassword)
router.post('/logout',siteController.logout)
router.post('/register', siteController.registerFunction)
router.post('/login', siteController.loginFunction)
// router.get('/homepage',siteController.home)
router.get('/admin/dashboard', isAuthenticatedAndIsAdmin, siteController.admin)
router.get('/login', siteController.login)
router.get('/register', siteController.register)
router.get('/contact', siteController.contact)
router.get('/surgery', siteController.surgery)
router.get('/surgery/:slug', siteController.renderSurgery)
router.get('/pediatric', siteController.pediatric)
router.get('/pediatric/:slug', siteController.renderPediatric)
router.get('/obstetric', siteController.obstetric)
router.get('/obstetric/:slug', siteController.renderObstetric)
router.get('/internalmedicine', siteController.internalmedicine) 
router.get('/internalmedicine/:slug', siteController.renderInternalmedicine)
router.get('/news', siteController.renderNews)
router.get('/:slug', siteController.renderArticle)
router.get('/api/doctors', siteController.renderDoctors)

module.exports = router;