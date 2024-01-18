const Pediatric = require("../models/Pediatric");

class PediatricController {
    // index(req, res) {
    //     res.render('surgery');
    // }

    //get request to fetch data
    create(req, res, next) {
        res.render('pediatric/create')
}
//post request to add data
    store(req, res, next) {
        const formData = req.body;
        const pediatrics = new Pediatric(formData);
        pediatrics.save()
            .then(() => res.redirect('/pediatric'))
            .catch(next);
    }

    // get /pediatric/:id/edit
        
    // edit(req, res, next) {
    //     pediatric.findById(req.params.id)
    //     .then((pediatric)=> {
    //         pediatric = Array.from(pediatric).map(pediatric => pediatric.toObject())
    //         res.render ('pediatric/edit', {pediatric })
    //     })

    //     .catch((err)=> next(err))
    //     }
    edit(req, res, next) {
        Pediatric.findById(req.params.id)
          .lean()
          .then((pediatrics) => {
            res.render("pediatric/edit", { pediatrics });
          })
          .catch(next);
};

    // put /pediatric/:id
    update(req, res, next) {
        Pediatric.updateOne({ _id: req.params.id}, req.body)
        .then(() => res.redirect('../admin/stored/pediatric'))
        .catch(next)
    }
    // delete /pediatric/:id
    delete(req, res, next) {
        Pediatric.delete({ _id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next) 
    }
    //delete /pediatric/:id/force
    forceDelete(req, res, next) {
        Pediatric.deleteOne({ _id: req.params.id})
       .then(() => res.redirect('back'))
       .catch(next)
    }
    
    //patch /pediatric/:id/restore
    restore(req, res, next) {
        Pediatric.restore({ _id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next) 
    }

    
}
module.exports = new PediatricController; 