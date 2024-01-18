const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");

const Doctor =  new Schema({
    name: {type: 'string', required: true},
    speciality: {type: 'string', required: true},
    address: {type : 'string', required: true},
    tel: {type : 'string'},
    presentation:{type : 'string'},
    map: {type : 'array'},
    slug: { type: "string", slug: "name" },
    image: {type : 'string'},
    schedule : {type : 'string'},
});

mongoose.plugin(slug);

Doctor.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all'});
module.exports = mongoose.model("Doctor", Doctor);

