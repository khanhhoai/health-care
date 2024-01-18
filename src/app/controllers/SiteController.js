const Domain = require('../models/Domain');
const News = require('../models/News');
const Hospital = require('../models/Hospital');
const Speciality = require('../models/Speciality');
const Surgery = require('../models/Surgery');
const Pediatric = require('../models/Pediatric');
const Obstetric = require('../models/Obstetric');
const Internalmedicine = require('../models/Internalmedicine');
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// const passport = require('passport');
// const initializePassport = require('./passport-config');

// initializePassport(passport);


class SiteController {
    //[get]/nres
  
    // [get] /news/:slug
    contact(req, res) {
        res.render('contact');
    }

    login(req, res) {
        res.render('login')
    }



    async loginFunction(req, res) {
        
        try {
            const { email, password } = req.body;
            if (password.length <= 6) {
                return res.status(400).render('login',{ error: 'Password must be longer than 6 characters.' });
            }
            const user = await User.findOne({ email });
            if (!user) {
              return res.status(404).render('login', { error: 'User not found.' });
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
              return res.status(401).render('login', { error: 'Invalid password.' });
            }
            req.session.isAuthenticated = true;
            // Set the user's authenticated state using the session or JWT
            req.session.userId = user._id; // In real-world, use session or JWT properly
            req.session.user = user;
            
            
        
            // Redirect to the appropriate dashboard based on user's role
            if (user.role === 'admin') {
                res.redirect('/admin/dashboard');
            } else {
                res.redirect('/user');
            }
            } catch (error) {
            res.status(500).send('An error occurred.');
            }
    }
    
    logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
              console.error('Failed to destroy session:', err);
            }
            // Clear the session-related data on the client (e.g., session ID cookie)
            res.clearCookie('your-session-cookie-name');
        
            // Redirect the user to the homepage or login page after logout
            res.redirect('/'); // Replace with the appropriate URL
          });
      };
      

       
    register(req, res) {
        res.render('register')
    }

    async registerFunction(req, res) {
        try {
            const formData = req.body;
            const plainPassword = formData.password;
    
            // Validate the password length
            if (plainPassword.length <= 6) {
                return res.render('register', { error: 'Password must be longer than 6 characters.' });
            }
    
            // Check if a user with the same email already exists
            const existingUser = await User.findOne({ email: formData.email });
            if (existingUser) {
                return res.render('register', { error: 'This email address is already in use.' });
            }
    
            // Hash the password
            const hashedPassword = await bcrypt.hash(plainPassword, 10);
    
            // Determine the user's role
            const adminCount = await User.countDocuments({ role: 'admin' });
            let role = 'user';
            if (adminCount === 0) {
                role = 'admin';
            }
    
            // Create a new user
            const newUser = new User({
                name: formData.name,
                email: formData.email,
                dob: formData.dob,
                password: hashedPassword,
                role: role,
            });
    
            // Save the user to the database
            await newUser.save();
    
            // Redirect to the login page after successful registration
            res.redirect('/login');
        } catch (error) {
            console.error('Error during registration:', error);
            res.redirect('/register');
        }
    }



   

    // edit (req, res, next) {
    //     const userId = req.session.userId; // Retrieve the user's ID from the session

    //     User.findById(userId)
    //       .then(user => {
    //         if (!user) {
    //           return res.status(404).json({ error: 'User not found.' });
    //         }
    //         req.session.userId = user._id; // In real-world, use session or JWT properly
    //         req.session.user = user;
      
    //         // Render the user's profile template with the user data
    //         res.render('edit-profile');
    //       })
    //       .catch(err => {
    //         console.error('Error fetching user data:', err);
    //         res.status(500).send('An error occurred.');
    //       });

    // }

    password(req, res) {
        const userId = req.session.userId; // Retrieve the user's ID from the session

        User.findById(userId)
          .then(user => {
            if (!user) {
              return res.status(404).json({ error: 'User not found.' });
            }
      
            // Render the user's profile template with the user data
            res.render('password');
          })
          .catch(err => {
            console.error('Error fetching user data:', err);
            res.status(500).send('An error occurred.');
          });
    }


    async changePassword(req, res, next) {
    try {
        const userId = req.session.userId;
        const formData = req.body;
        const plainPassword = formData.currentPassword;
        const newPassword = formData.newPassword;
        const confirmPassword = formData.confirmNewPassword;

        if (newPassword.length <= 6) {
            return res.render('password', { error: 'New password must be longer than 6 characters.' });
        }
   
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).render('password', { error: 'User not found.' });
        }

        const passwordMatch = await bcrypt.compare(plainPassword, user.password);

        if (!passwordMatch) {
            return res.render('password', { error: 'Your current password is incorrect!' });
        }
        
        if (newPassword === plainPassword) {
            return res.render('password', { error: 'Your new password cannot be same as current password' });
        }

        if (confirmPassword !== newPassword) {
            return res.render('password', { error: 'The password confirmation does not match !' });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database
        user.password = hashedNewPassword;
        await user.save();
 
        // Redirect to a success page or render a success message
        return res.render('password', { success: 'Password changed successfully!' });

        } catch (error) {
            console.error('Error changing password:', error);
        throw error;
        }
    }

    showProfile(req, res, next) {
        const userId = req.session.userId; // Retrieve the user's ID from the session

        User.findById(userId)
            .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }
      
            // Render the user's profile template with the fetched user data
            res.render('profile');
            // res.json({ user})
          })
          .catch(err => {
            console.error('Error fetching user data:', err);
            res.status(500).json({ error: 'An error occurred.' });
          });
      }
      

    async updateProfile(req, res, next) {
        const userId = req.session.userId; // Retrieve the user's ID from the session

        try {
            const user = await User.findById(userId);
            const formData = req.body;
            const newName = formData.name;
            const newEmail = formData.email;
            const newDob = formData.dob;
            const newTel = formData.tel;
            const newStreet = formData.street;
            const newCity = formData.city;
            const newState = formData.state;
            const newZipCode = formData.zipCode;
    
            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }

            if (!newName && !newEmail) {
                return res.status(400).render('profile', { error: 'Email or Full Name is required.' });
            }

            if (newName) {
                user.name = newName; // Update name
            }
            if (newEmail) {
                user.email = newEmail; // Update email
            }
            if (newDob) {
                user.dob = newDob; // Update dob
            }
            if (newTel) {
                user.tel = newTel; // Update tel
            }
            if (newStreet) {
                user.street = newStreet; // Update street
            }
            if (newCity) {
                user.city = newCity; // Update city
            }
            if (newState) {
                user.state = newState; // Update state
            }
            if (newZipCode) {
                user.zipCode = newZipCode; // Update zip code
            }

            await user.save();

            // Cập nhật thông tin trong phiên đăng nhập nếu cần
            req.session.user = user;
    
            // Điều hướng đến trang thông tin tài khoản hoặc hiển thị thông báo cập nhật thành công
            res.redirect('../profile/edit')

        }catch(err) {
            console.error('Error updating user data:', err);
            res.status(500).send('An error occurred.');
        };

    }

    storedProfile(req, res) {
            const user = req.session.user; // Lấy thông tin tài khoản từ phiên đăng nhập
        
            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }
        
            res.render('profile', { success: 'Your changes have been successfully saved!' });
   
        }


    renderNews(req, res) {
        res.render('news-header');
    }
   
    //     index(req, res, next) {
    //         Doctor.find({}).lean()
    //         .then((doctors)=>{res.json(doctors)})
    //         .catch((err)=> next(err))
    // }

        // async admin(req, res, next) {
        //     var n = await News.find({})
        //    var hhh = await Hospital.find({})
        admin(req, res, next) {
        
        Promise.all([News.find({}), Hospital.find({}), Domain.find({}), Speciality.find({}), Doctor.find({})])
            .then(([news, hospitals, domains, specialitys, doctors])=> {
                news = news.map(news => news.toObject())
                hospitals = hospitals.map(hospitals => hospitals.toObject())
                domains = domains.map(domains => domains.toObject())
                specialitys = specialitys.map(specialitys => specialitys.toObject())
                doctors = doctors.map(doctors => doctors.toObject())
                res.render ('admin', { news, hospitals, domains, specialitys, doctors })
            })
            .catch((err)=> next(err))
        }
        

        homepage(req, res, next) {
            Promise.all([News.find({}), Hospital.find({}), Domain.find({}), Speciality.find({}), Doctor.find({})])
            .then(([news, hospitals, domains, specialitys, doctors])=> {
                news = news.map(news => news.toObject())
                hospitals = hospitals.map(hospitals => hospitals.toObject())
                domains = domains.map(domains => domains.toObject())
                specialitys = specialitys.map(specialitys => specialitys.toObject())
                doctors = doctors.map(doctors => doctors.toObject())

                // Combine the data objects into a single object
            const templateData = {
                news,
                hospitals,
                domains,
                specialitys,
                doctors,
            };

            // Pass the combined data object to the Handlebars template
            res.render('homepage', templateData);
            })
            .catch((err)=> next(err))  
            }

            user(req, res, next) {
                Promise.all([News.find({}), Hospital.find({}), Domain.find({}), Speciality.find({}), Doctor.find({})])
            .then(([news, hospitals, domains, specialitys, doctors])=> {
                news = news.map(news => news.toObject())
                hospitals = hospitals.map(hospitals => hospitals.toObject())
                domains = domains.map(domains => domains.toObject())
                specialitys = specialitys.map(specialitys => specialitys.toObject())
                doctors = doctors.map(doctors => doctors.toObject())

                // Combine the data objects into a single object
            const templateData = {
                news,
                hospitals,
                domains,
                specialitys,
                doctors,
            };

            // Pass the combined data object to the Handlebars template
            res.render('user', templateData);
            })
            .catch((err)=> next(err))  
                }
     

        surgery(req, res, next) {
            Surgery.find().lean()
            .then((surgerys)=>{
                res.render('surgery', {surgerys})
            })
            .catch(next);
        }
        renderSurgery(req, res, next) {
            Surgery.findOne({slug: req.params.slug}).lean()
                    .then((surgerys)=>{
                        res.render('render-surgery',{surgerys})
                    })
                    .catch(next);

        }        
                    obstetric(req, res, next) {
                        Obstetric.find().lean()
                        .then((obstetrics)=>{
                            res.render('obstetric', {obstetrics})
                        })
                        .catch(next);
                    }

                    renderObstetric(req, res, next) {
                        Obstetric.findOne({slug: req.params.slug}).lean()
                                .then((obstetrics)=>{
                                    res.render('render-obstetric',{obstetrics})
                                })
                                .catch(next);
                    }

        pediatric(req, res, next) {
            Pediatric.find().lean()
            .then((pediatrics)=>{
                res.render('pediatric', {pediatrics})
            })
            .catch(next);
        }

        renderPediatric(req, res, next) {
            Pediatric.findOne({slug: req.params.slug}).lean()
                    .then((pediatrics)=>{
                        res.render('render-pediatric',{pediatrics})
                    })
                    .catch(next);
                }

                internalmedicine(req, res, next) {
                    Internalmedicine.find().lean()
                    .then((internalmedicines)=>{
                        res.render('internalmedicine', {internalmedicines})
                    })
                    .catch(next);
                }
        
                renderInternalmedicine(req, res, next) {
                    Internalmedicine.findOne({slug: req.params.slug}).lean()
                            .then((internalmedicines)=>{
                                res.render('render-internalmedicine',{internalmedicines})
                            })
                            .catch(next);
                        }
                    
                        renderArticle(req, res, next) {
                            News.findOne({slug: req.params.slug}).lean()
                                    .then((news)=>{
                                        res.render('news',{news})
                                    })
                                    .catch(next);
                                }

                        renderDoctors(req, res, next) {
                            Doctor.find({})
                            .then ((doctors)=>{
                               res.json(doctors)
                            })    
                            }
                        }

module.exports = new SiteController; 