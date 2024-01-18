const Domain = require("../models/Domain");

class DomainController {
    // index(req, res) {
    //     res.render('hospitals');
    // }

    //get request to fetch data
    create(req, res, next) {
        res.render('domain/create')
}
//post request to add data
    store(req, res, next) {
        const formData = req.body;
        const domains = new Domain(formData);
        domains.save()
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
        Domain.findById(req.params.id)
          .lean()
          .then((domains) => {
            res.render("domain/edit", { domains });
          })
          .catch(next);
};

    // put /hospital/:id
    update(req, res, next) {
        Domain.updateOne({ _id: req.params.id}, req.body)
        .then(() => res.redirect('../admin/stored/domain'))
        .catch(next)
    }
    // delete /hospital/:id
    delete(req, res, next) {
        Domain.delete({ _id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next) 
    }
    //delete /hospital/:id/force
    forceDelete(req, res, next) {
        Domain.deleteOne({ _id: req.params.id})
       .then(() => res.redirect('back'))
       .catch(next)
    }
    
    //patch /hospital/:id/restore
    restore(req, res, next) {
        Domain.restore({ _id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next) 
    }

    
}
module.exports = new DomainController; 