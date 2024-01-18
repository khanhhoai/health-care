const News = require("../models/News");
const Hospital = require("../models/Hospital")
const Doctor = require("../models/Doctor")
const Domain = require("../models/Domain");
const Speciality = require("../models/Speciality");
const Surgery = require("../models/Surgery")
const Pediatric = require("../models/Pediatric")
const Obstetric = require("../models/Obstetric")
const Internalmedicine = require("../models/Internalmedicine")


class AdminController {
    storedNews(req, res, next) {
        Promise.all([News.find({}), News.countDocumentsDeleted()])
        .then(([news, deletedCount]) => {
            
            news = news.map (news => news.toObject())
            res.render ('admin/stored-news', { deletedCount, news })
        })
        .catch(next)
        }
    
    trashNews(req, res, next) {
        News.findDeleted({})
        .then((news)=> {
            news = news.map(news => news.toObject())
            res.render ('admin/trash-news', { news })
        })
        .catch((err)=> next(err))
        }

        storedHospital(req, res, next) {
            Promise.all([Hospital.find({}), Hospital.countDocumentsDeleted()])
            .then(([hospitals, deletedCount]) => {
                
                hospitals = hospitals.map (hospitals => hospitals.toObject())
                res.render ('admin/stored-hospitals', { deletedCount, hospitals })
            })
            .catch(next)
            }
        
        trashHospital(req, res, next) {
            Hospital.findDeleted({})
            .then((hospitals)=> {
                hospitals = hospitals.map(hospitals => hospitals.toObject())
                res.render ('admin/trash-hospitals', { hospitals })
            })
            .catch((err)=> next(err))
            }

            storedDoctor(req, res, next) {
                Promise.all([Doctor.find({}), Doctor.countDocumentsDeleted()])
                .then(([doctors, deletedCount]) => {
                    
                    doctors = doctors.map (doctors => doctors.toObject())
                    res.render ('admin/stored-doctors', { deletedCount, doctors })
                })
                .catch(next)
                }
            
            trashDoctor(req, res, next) {
                Doctor.findDeleted({})
                .then((doctors)=> {
                    doctors = doctors.map(doctors => doctors.toObject())
                    res.render ('admin/trash-doctors', { doctors })
                })
                .catch((err)=> next(err))
                }

                storedDomain(req, res, next) {
                    Promise.all([Domain.find({}), Domain.countDocumentsDeleted()])
                    .then(([domains, deletedCount]) => {
                        
                        domains = domains.map (domains => domains.toObject())
                        res.render ('admin/stored-domains', { deletedCount, domains })
                    })
                    .catch(next)
                    }
                
                trashDomain(req, res, next) {
                    Domain.findDeleted({})
                    .then((domains)=> {
                        domains = domains.map(domains => domains.toObject())
                        res.render ('admin/trash-domains', { domains })
                    })
                    .catch((err)=> next(err))
                    }

                    storedSpeciality(req, res, next) {
                        Promise.all([Speciality.find({}), Speciality.countDocumentsDeleted()])
                        .then(([specialitys, deletedCount]) => {
                            
                            specialitys = specialitys.map (specialitys => specialitys.toObject())
                            res.render ('admin/stored-Specialitys', { deletedCount, specialitys })
                        })
                        .catch(next)
                        }
                    
                    trashSpeciality(req, res, next) {
                        Speciality.findDeleted({})
                        .then((specialitys)=> {
                            specialitys = specialitys.map(specialitys => specialitys.toObject())
                            res.render ('admin/trash-specialitys', { specialitys })
                        })
                        .catch((err)=> next(err))
                        }

                        storedSurgery(req, res, next) {
                            Promise.all([Surgery.find({}), Surgery.countDocumentsDeleted()])
                            .then(([surgerys, deletedCount]) => {
                                
                                surgerys = surgerys.map (surgerys => surgerys.toObject())
                                res.render ('admin/stored-surgerys', { deletedCount, surgerys })
                            })
                            .catch(next)
                            }
                        
                        trashSurgery(req, res, next) {
                            Surgery.findDeleted({})
                            .then((surgerys)=> {
                                surgerys = surgerys.map(surgerys => surgerys.toObject())
                                res.render ('admin/trash-surgerys', { surgerys })
                            })
                            .catch((err)=> next(err))
                            }

                            storedPediatric(req, res, next) {
                                Promise.all([Pediatric.find({}), Pediatric.countDocumentsDeleted()])
                                .then(([pediatrics, deletedCount]) => {
                                    
                                    pediatrics = pediatrics.map (pediatrics => pediatrics.toObject())
                                    res.render ('admin/stored-pediatrics', { deletedCount, pediatrics })
                                })
                                .catch(next)
                                }
                            
                            trashPediatric(req, res, next) {
                                Pediatric.findDeleted({})
                                .then((pediatrics)=> {
                                    pediatrics = pediatrics.map(pediatrics => pediatrics.toObject())
                                    res.render ('admin/trash-pediatrics', { pediatrics })
                                })
                                .catch((err)=> next(err))
                                }

                                storedObstetric(req, res, next) {
                                    Promise.all([Obstetric.find({}), Obstetric.countDocumentsDeleted()])
                                    .then(([obstetrics, deletedCount]) => {
                                        
                                        obstetrics = obstetrics.map (obstetrics => obstetrics.toObject())
                                        res.render ('admin/stored-obstetrics', { deletedCount, obstetrics })
                                    })
                                    .catch(next)
                                    }
                                
                                trashObstetric(req, res, next) {
                                    Obstetric.findDeleted({})
                                    .then((obstetrics)=> {
                                        obstetrics = obstetrics.map(obstetrics => obstetrics.toObject())
                                        res.render ('admin/trash-obstetrics', { obstetrics })
                                    })
                                    .catch((err)=> next(err))
                                    }
                                    storedInternalmedicine(req, res, next) {
                                        Promise.all([Internalmedicine.find({}), Internalmedicine.countDocumentsDeleted()])
                                        .then(([internalmedicines, deletedCount]) => {
                                            
                                            internalmedicines = internalmedicines.map (internalmedicines => internalmedicines.toObject())
                                            res.render ('admin/stored-internalmedicines', { deletedCount, internalmedicines })
                                        })
                                        .catch(next)
                                        }
                                    
                                    trashInternalmedicine(req, res, next) {
                                        Internalmedicine.findDeleted({})
                                        .then((internalmedicines)=> {
                                            internalmedicines = internalmedicines.map(internalmedicines => internalmedicines.toObject())
                                            res.render ('admin/trash-internalmedicines', { internalmedicines })
                                        })
                                        .catch((err)=> next(err))
                                        }
}

module.exports = new AdminController; 