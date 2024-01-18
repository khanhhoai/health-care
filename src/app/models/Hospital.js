const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");




const Hospital = new Schema(
  {
    image: { type: "string" },
    title: { type: "string" },
    slug: { type: "string", slug: "title" },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

mongoose.plugin(slug);
Hospital.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all'});
module.exports = mongoose.model("Hospital", Hospital);
