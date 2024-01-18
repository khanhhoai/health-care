const Surgery = require("../models/Surgery");

class SurgeryController {
    // index(req, res) {
    //     res.render('surgery');
    // }

    //get request to fetch data
    create(req, res, next) {
        res.render('surgery/create')
}
//post request to add data
    store(req, res, next) {
        const formData = req.body;
        const surgerys = new Surgery(formData);
        surgerys.save()
            .then(() => res.redirect('/surgery'))
            .catch(next);
    }

    // get /surgery/:id/edit
        
    // edit(req, res, next) {
    //     surgery.findById(req.params.id)
    //     .then((surgery)=> {
    //         surgery = Array.from(surgery).map(surgery => surgery.toObject())
    //         res.render ('surgery/edit', {surgery })
    //     })

    //     .catch((err)=> next(err))
    //     }
    edit(req, res, next) {
        Surgery.findById(req.params.id)
          .lean()
          .then((surgerys) => {
            res.render("surgery/edit", { surgerys });
          })
          .catch(next);
};

    // put /surgery/:id
    update(req, res, next) {
        Surgery.updateOne({ _id: req.params.id}, req.body)
        .then(() => res.redirect('../admin/stored/surgery'))
        .catch(next)
    }
    // delete /surgery/:id
    delete(req, res, next) {
        Surgery.delete({ _id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next) 
    }
    //delete /surgery/:id/force
    forceDelete(req, res, next) {
        Surgery.deleteOne({ _id: req.params.id})
       .then(() => res.redirect('back'))
       .catch(next)
    }
    
    //patch /surgery/:id/restore
    restore(req, res, next) {
        Surgery.restore({ _id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next) 
    }

    
}
module.exports = new SurgeryController; 