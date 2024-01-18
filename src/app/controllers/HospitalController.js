const Hospital = require("../models/Hospital");

class HospitalController {
    // index(req, res) {
    //     res.render('hospitals');
    // }

    //get request to fetch data
    create(req, res, next) {
        res.render('hospital/create')
}
//post request to add data
    store(req, res, next) {
        const formData = req.body;
        const hospitals = new Hospital(formData);
        hospitals.save()
            .then(() => res.redirect('/'))
            .catch(next);
    }

    // get /hospital/:id/edit
        
    // edit(req, res, next) {
    //     hospital.findById(req.params.id)
    //     .then((news)=> {
    //         news = Array.from(news).map(news => news.toObject())
    //         res.render ('news/edit', {news })
    //     })

    //     .catch((err)=> next(err))
    //     }
    edit(req, res, next) {
        Hospital.findById(req.params.id)
          .lean()
          .then((hospitals) => {
            res.render("hospital/edit", { hospitals });
          })
          .catch(next);
};

    // put /hospital/:id
    update(req, res, next) {
        Hospital.updateOne({ _id: req.params.id}, req.body)
        .then(() => res.redirect('../admin/stored/hospital'))
        .catch(next)
    }
    // delete /hospital/:id
    delete(req, res, next) {
        Hospital.delete({ _id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next) 
    }
    //delete /hospital/:id/force
    forceDelete(req, res, next) {
        Hospital.deleteOne({ _id: req.params.id})
       .then(() => res.redirect('back'))
       .catch(next)
    }
    
    //patch /hospital/:id/restore
    restore(req, res, next) {
        Hospital.restore({ _id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next) 
    }

    
}
module.exports = new HospitalController; 