const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Product = new Schema(
    {
        nameprod: { type: String },
        image: { type: String },
        category: { type: String},
        price: { type: Number},
        rating: { type: Number },
        cmt: { type: String},
        slug: { type: String, slug: "nameprod", unique: true, slugPaddingSize: 2 }
    },
    // __v
    { 
        versionKey: false ,
        collection: "products", 
        // timestamps: true,
    }
);

mongoose.plugin(slug);
Product.plugin(mongooseDelete, {overrideMethods: 'all'});


module.exports = mongoose.model('products', Product);