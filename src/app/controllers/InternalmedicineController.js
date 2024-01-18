const Internalmedicine = require("../models/Internalmedicine");

class InternalmedicineController {
    // index(req, res) {
    //     res.render('surgery');
    // }

    //get request to fetch data
    create(req, res, next) {
        res.render('internalmedicine/create')
}
//post request to add data
    store(req, res, next) {
        const formData = req.body;
        const internalmedicines = new Internalmedicine(formData);
        internalmedicines.save()
            .then(() => res.redirect('/internalmedicine'))
            .catch(next);
    }

    // get /internalmedicine/:id/edit
        
    // edit(req, res, next) {
    //     internalmedicine.findById(req.params.id)
    //     .then((internalmedicine)=> {
    //         internalmedicine = Array.from(internalmedicine).map(internalmedicine => internalmedicine.toObject())
    //         res.render ('internalmedicine/edit', {internalmedicine })
    //     })

    //     .catch((err)=> next(err))
    //     }
    edit(req, res, next) {
        Internalmedicine.findById(req.params.id)
          .lean()
          .then((internalmedicines) => {
            res.render("internalmedicine/edit", { internalmedicines });
          })
          .catch(next);
};

    // put /internalmedicine/:id
    update(req, res, next) {
        Internalmedicine.updateOne({ _id: req.params.id}, req.body)
        .then(() => res.redirect('../admin/stored/internalmedicine'))
        .catch(next)
    }
    // delete /internalmedicine/:id
    delete(req, res, next) {
        Internalmedicine.delete({ _id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next) 
    }
    //delete /Internalmedicine/:id/force
    forceDelete(req, res, next) {
        Internalmedicine.deleteOne({ _id: req.params.id})
       .then(() => res.redirect('back'))
       .catch(next)
    }
    
    //patch /internalmedicine/:id/restore
    restore(req, res, next) {
        Internalmedicine.restore({ _id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next) 
    }

    
}
module.exports = new InternalmedicineController; 