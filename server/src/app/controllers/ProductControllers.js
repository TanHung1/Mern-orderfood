const Product = require("../models/Product");
const { mongooesToObject } = require("../../util/mongoose");
const { mutipleMongooseToObject } = require("../../util/mongoose");

class ProductController {
  show = async (req, res) => {
    // [get] api/product/category
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
}

module.exports = new ProductController();
