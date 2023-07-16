const Product = require("../models/Product");
const { mongooesToObject } = require("../../util/mongoose");
const { mutipleMongooseToObject } = require("../../util/mongoose");

const show = async (req, res) => {
  // [get] api/product/
  try {
    const products = await Product.find({});
    res.status(200).json({
      products: mutipleMongooseToObject(products),
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

//[get] /api/product/:id
const productDetail = async (req, res, next) => {
  try {
    const product = await Product.findById({ _id: req.params.id });
    let totalRating = 0;
    let numReviews = 0;

    for (const review of product.reviews) {
      totalRating += review.rating;
      numReviews++;
    }

    const averageRating = numReviews > 0 ? totalRating / numReviews : 0;
    res.status(200).json({
      product: mongooesToObject(product),
      averageRating,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
//[post] api/product/create-review/:id
const createReviewProduct = async (req, res) => {
  try {
    const { user_id, name, avatar, rating, comment } = req.body;

    const product = await Product.findById({ _id: req.params.id });

    const newReview = {
      user_id: user_id,
      name: name,
      avatar: avatar,
      rating: rating,
      comment: comment,
      created: new Date(),
    };

    product.reviews.push(newReview);
    product.save();

    res.status(200).json({ message: "oke" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi" });
  }
};
module.exports = {
  show,
  productDetail,
  createReviewProduct,
};
