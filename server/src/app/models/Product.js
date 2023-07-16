const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const Review = new Schema({
  user_id: {
    type: String,
  },

  name: {
    type: String,
  },

  avatar: {
    type: String,
  },

  rating: {
    type: Number,
  },

  comment: {
    type: String,
  },
  created: {
    type: Date,
    default: new Date(),
  },
});

const Product = new mongoose.Schema(
  {
    nameprod: { type: String },
    image: { type: String },
    category: { type: String },
    price: { type: Number },
    reviews: [Review],

    deleted: {
      type: Boolean,
      default: false,
    },
    slug: { type: String, slug: "nameprod", unique: true, slugPaddingSize: 2 },
  },
  // __v
  {
    versionKey: false,
    collection: "products",
    // timestamps: true,
  }
);

mongoose.plugin(slug);
Product.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("products", Product);
