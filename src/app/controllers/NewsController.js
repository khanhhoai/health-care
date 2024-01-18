const News = require("../models/News");

class NewsController {
    // index(req, res) {
    //     res.render('news');
    // }

    //get request to fetch data
    create(req, res, next) {
        res.render('news/create')
}
//post request to add data
    store(req, res, next) {
        const formData = req.body;
        const news = new News(formData);
        news.save()
            .then(() => res.redirect('/'))
            .catch(next);
    }

    // get /news/:id/edit
        
    // edit(req, res, next) {
    //     News.findById(req.params.id)
    //     .then((news)=> {
    //         news = Array.from(news).map(news => news.toObject())
    //         res.render ('news/edit', {news })
    //     })

    //     .catch((err)=> next(err))
    //     }
    edit(req, res, next) {
        News.findById(req.params.id)
          .lean()
          .then((news) => {
            res.render("news/edit", { news });
          })
          .catch(next);
};

    // put /news/:id
    update(req, res, next) {
        News.updateOne({ _id: req.params.id}, req.body)
        .then(() => res.redirect('../admin/stored/news'))
        .catch(next)
    }
    // delete /news/:id
    delete(req, res, next) {
        News.delete({ _id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next) 
    }
    //delete /news/:id/force
    forceDelete(req, res, next) {
        News.deleteOne({ _id: req.params.id})
       .then(() => res.redirect('back'))
       .catch(next)
    }
    
    //patch /news/:id/restore
    restore(req, res, next) {
        News.restore({ _id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next) 
    }

    
}
module.exports = new NewsController; 