const newsRouter = require('./news');
const siteRouter = require('./site');
const adminRouter = require('./admin');
const hospitalRouter = require('./hospital');
const searchRouter = require('./search');
const doctorRouter = require('./doctor');
const domainRouter = require('./domain');
const specialityRouter = require('./speciality');
const surgeryRouter = require('./surgery');
const pediatricRouter = require('./pediatric')
const obstetricRouter = require('./obstetric')
const internalmedicineRouter = require('./internalmedicine')

function route(app) {
    //local host --- Hosting
//action ---> Dispatcher ---> Function handler
    app.use('/news', newsRouter);
    app.use('/search', searchRouter);
    app.use('/surgery', surgeryRouter);
    app.use('/pediatric', pediatricRouter);
    app.use('/obstetric', obstetricRouter);
    app.use('/internalmedicine', internalmedicineRouter);
    app.use('/domain', domainRouter);
    app.use('/speciality', specialityRouter);
    app.use('/hospital', hospitalRouter);
    app.use('/doctor', doctorRouter);
    app.use('/admin', adminRouter);
    app.use('/', siteRouter);


//     app.get('/contact', (req, res) => {
//     res.render('contact')
//   })
}
 
module.exports = route;