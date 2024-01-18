const Obstetric = require("../models/Obstetric");

class ObstetricController {
    // index(req, res) {
    //     res.render('surgery');
    // }

    //get request to fetch data
    create(req, res, next) {
        res.render('obstetric/create')
}
//post request to add data
    store(req, res, next) {
        const formData = req.body;
        const obstetrics = new Obstetric(formData);
        obstetrics.save()
            .then(() => res.redirect('/obstetric'))
            .catch(next);
    }

    // get /obstetric/:id/edit
        
    // edit(req, res, next) {
    //     obstetric.findById(req.params.id)
    //     .then((obstetric)=> {
    //         obstetric = Array.from(obstetric).map(obstetric => obstetric.toObject())
    //         res.render ('obstetric/edit', {obstetric })
    //     })

    //     .catch((err)=> next(err))
    //     }
    edit(req, res, next) {
        Obstetric.findById(req.params.id)
          .lean()
          .then((obstetrics) => {
            res.render("obstetric/edit", { obstetrics });
          })
          .catch(next);
};

    // put /obstetric/:id
    update(req, res, next) {
        Obstetric.updateOne({ _id: req.params.id}, req.body)
        .then(() => res.redirect('../admin/stored/obstetric'))
        .catch(next)
    }
    // delete /obstetric/:id
    delete(req, res, next) {
        Obstetric.delete({ _id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next) 
    }
    //delete /obstetric/:id/force
    forceDelete(req, res, next) {
        Obstetric.deleteOne({ _id: req.params.id})
       .then(() => res.redirect('back'))
       .catch(next)
    }
    
    //patch /obstetric/:id/restore
    restore(req, res, next) {
        Obstetric.restore({ _id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next) 
    }

    
}
module.exports = new ObstetricController; 