const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");




const News = new Schema(
  {
    image: { type: "string"},
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    detaildescription: { type: "string", required: true },
    slug: { type: "string", slug: "title" },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    author: { type: "string", required: true }
  },
  {
    timestamps: true,
  }
);

mongoose.plugin(slug);
News.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all'});
module.exports = mongoose.model("News", News);
