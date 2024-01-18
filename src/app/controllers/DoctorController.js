const Doctor = require("../models/Doctor");

class DoctorController {
    // index(req, res) {
    //     res.render('hospitals');
    // }

    //get request to fetch data
    create(req, res, next) {
        res.render('doctor/create')
}
//post request to add data
    store(req, res, next) {
        const formData = req.body;
        const doctors = new Doctor(formData);
        doctors.save()
            .then(() => res.redirect('/'))
            .catch(next);
    }

    
    edit(req, res, next) {
        Doctor.findById(req.params.id)
          .lean()
          .then((doctors) => {
            res.render("doctor/edit", { doctors });
          })
          .catch(next);
};

    // put /doctor/:id
    update(req, res, next) {
        Doctor.updateOne({ _id: req.params.id}, req.body)
        .then(() => res.redirect('../admin/stored/doctor'))
        .catch(next)
    }
    // delete /doctor/:id
    delete(req, res, next) {
        Doctor.delete({ _id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next) 
    }
    //delete /doctor/:id/force
    forceDelete(req, res, next) {
        Doctor.deleteOne({ _id: req.params.id})
       .then(() => res.redirect('back'))
       .catch(next)
    }
    
    //patch /doctor/:id/restore
    restore(req, res, next) {
        Doctor.restore({ _id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next) 
    }

    
}
module.exports = new DoctorController; 