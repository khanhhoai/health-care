const Doctor = require("../models/Doctor");

class SearchController {

search(req, res) {


var regex = new RegExp(req.body.key, 'i');
    Promise.all([Doctor.find({ 
    $or: [
        { name: regex },
        { speciality: regex },
        { address: regex }
    ]
}).lean(), Doctor.countDocuments({ 
    $or: [
        { name: regex },
        { speciality: regex },
        { address: regex }
    ]
})]).then(([doctors,counts])=>{
    res.render('search', { doctors, counts });

})
}

renderDetail(req, res, next) {
    Doctor.findOne({slug: req.params.slug}).lean()
            .then((doctors)=>{
                res.render('details',{doctors})
            })
            .catch(next);
}

// renderDentist(req, res, next) {

//     var speciality = 'dental clinic';
//     Promise.all([Doctor.find({speciality: new RegExp('^'+speciality+'$', "i")}).lean(), 
//     Doctor.countDocuments({speciality: new RegExp('^'+speciality+'$', "i")})]).then(([doctors,counts])=>{
//     res.render('search', { doctors, counts });
//     })
// }

// renderObgyn(req, res, next) {

//     var speciality = 'obstetrician';
//     Promise.all([Doctor.find({speciality: new RegExp('^'+speciality+'$', "i")}).lean(), 
//     Doctor.countDocuments({speciality: new RegExp('^'+speciality+'$', "i")})]).then(([doctors,counts])=>{
//     res.render('search', { doctors, counts });
//     })
// }

// renderDermatologist(req, res){

//     var speciality = 'dermatologist';
//     Promise.all([Doctor.find({speciality: new RegExp('^'+speciality+'$', "i")}).lean(), 
//     Doctor.countDocuments({speciality: new RegExp('^'+speciality+'$', "i")})]).then(([doctors,counts])=>{
//     res.render('search', { doctors, counts });
//     })
// }

// renderPsychiatrist(req, res){

//     var speciality = 'Psycho doctor';
//     Promise.all([Doctor.find({speciality: new RegExp('^'+speciality+'$', "i")}).lean(), 
//     Doctor.countDocuments({speciality: new RegExp('^'+speciality+'$', "i")})]).then(([doctors,counts])=>{
//     res.render('search', { doctors, counts });
//     })
// }


// renderEyedoctor(req, res){

//     var speciality = 'Eye-doctor';
//     Promise.all([Doctor.find({speciality: new RegExp('^'+speciality+'$', "i")}).lean(), 
//     Doctor.countDocuments({speciality: new RegExp('^'+speciality+'$', "i")})]).then(([doctors,counts])=>{
//     res.render('search', { doctors, counts });
//     })
// }
}





module.exports = new SearchController; 