const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");
const bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;


const User = new Schema(
  {
    name: { type: "string", required: true},
    email: { type: "string" , required: true, unique:true},
    dob: { type: "string"},
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (password) {
          // Add your custom validation logic here
          return password.length > 6;
        },
        message: 'Password must be longer than 6 characters.',
      },
    },
    tel: {type : 'string'},
    role: { type: String, enum: ['admin', 'user'], default: 'user' } ,
    street: {type: "string"},
    city: {type: "string"},
    state: {type: "string"},
    zipCode: {type: "string"}

  },
  {
    timestamps: true,
  }
);




// User.pre('save', function(next) {
//   var user = this;

// // only hash the password if it has been modified (or is new)
// if (!user.isModified('password')) return next();

// // generate a salt
// bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//   if (err) return next(err);

//   // hash the password using our new salt
//   bcrypt.hash(user.password, salt, function(err, hash) {
//       if (err) return next(err);

//       // override the cleartext password with the hashed one
//       user.password = hash;
//       next();
//   });
// });


// });

//password verification method 
User.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};


mongoose.plugin(slug);
User.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all'});
module.exports = mongoose.model("User", User);


// const ROLE = {
//   ADMIN: 'admin',
//   USER : 'user',
// }

// const User = new Schema(
//   {
//     // ROLE: ROLE,
//     name: { type: "string", required: true, index:{unique:true}},
//     email: { type: "string" },
//     dob: { type: "string"},
//     password: { type: "string", required: true},
//     role: { type: String, default: ROLE.USER, enum: [ROLE.ADMIN, ROLE.USER] },
//   },
//   {
//     timestamps: true,
//   }
// );