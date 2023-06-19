const Product = require("../models/Product");
const { mongooesToObject } = require("../../util/mongoose");
const { mutipleMongooseToObject } = require("../../util/mongoose");

class ProductController {
  show = async (req, res) => {
    // [get] api/product/
    try {
      const products = await Product.find({});
      res.status(200).json({
        products: mutipleMongooseToObject(products),
      });
      //horkoherkohwohmwmhpw
    } catch (err) {
      res.status(500).json(err);
    }
  };

  //[get] /api/product/:id
  productDetail(req, res, next) {
    Product.findOne({ _id: req.params.id })
      .then((product) => {
        res.status(200).json({
          product: mongooesToObject(product),
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  //[post] api/product/detail-product/:id
  createReviewProduct = async(req, res)=> {
    try {
      const {
        user_id,
        name,
        rating,
        comment,
      } = req.body;
  
      const product = await Product.findOne({_id: req.params.id });
  
      const newReview = {
        user_id: user_id,
        name: name,
        rating: rating,
        comment: comment,
        created: new Date(),
      };
  
      product.reviews.push(newReview);
      product.save();
  
      res.status(200).json({message: 'oke'});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi' });
    }
  }
  
}

module.exports = new ProductController();
