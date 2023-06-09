const { mongooesToObject, mutipleMongooseToObject } = require("../../util/mongoose");
const Order = require("../models/Order");
const mongoose = require("mongoose");

class OrderController {
  //[post] /api/order/neworder
  newOrder = async (req, res) => {
    try {
      const {
        cart,
        customerName,
        customerAddress,
        customerPhone,
        customerEmail,
        customerID,
      } = req.body;

      const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      const newOrder = new Order({
        customer_id: customerID,
        username: customerName,
        phonenumber: customerPhone,
        email: customerEmail,
        address: customerAddress,
        product: cart.map((item) => {
          return item;
        }),
        totalPrice: totalPrice,
        paidAt: Date.now(),
      });
      await newOrder.save();
      res.status(200).json({
        message: "Success",
        newOrder,
      });
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  };

  //[get]/api/order/:id/myorder
  myOrder = async (req, res) => {
    Order.findById({_id: req.params.id})
      .then((product) => {
        console.log(product);
        res.status(200).json({
         product
        });
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err);
      });
  }

}
module.exports = new OrderController();

