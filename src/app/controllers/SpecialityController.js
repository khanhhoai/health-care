const Speciality = require("../models/Speciality");

class SpecialityController {
    // index(req, res) {
    //     res.render('hospitals');
    // }

    //get request to fetch data
    create(req, res, next) {
        res.render('speciality/create')
}
//post request to add data
    store(req, res, next) {
        const formData = req.body;
        const specialitys = new Speciality(formData);
        specialitys.save()
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
        Speciality.findById(req.params.id)
          .lean()
          .then((specialitys) => {
            res.render("speciality/edit", { specialitys });
          })
          .catch(next);
};

    // put /hospital/:id
    update(req, res, next) {
        Speciality.updateOne({ _id: req.params.id}, req.body)
        .then(() => res.redirect('../admin/stored/speciality'))
        .catch(next)
    }
    // delete /hospital/:id
    delete(req, res, next) {
        Speciality.delete({ _id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next) 
    }
    //delete /hospital/:id/force
    forceDelete(req, res, next) {
        Speciality.deleteOne({ _id: req.params.id})
       .then(() => res.redirect('back'))
       .catch(next)
    }
    
    //patch /hospital/:id/restore
    restore(req, res, next) {
        Speciality.restore({ _id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next) 
    }

    
}
module.exports = new SpecialityController; 