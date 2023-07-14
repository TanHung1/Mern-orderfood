const {
  mongooesToObject,
  mutipleMongooseToObject,
} = require("../../util/mongoose");
const Order = require("../models/Order");
const Account = require("../models/Account");
const mongoose = require("mongoose");

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
        payment,
      } = req.body;

      const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      const accountId = req.params.id;

      const phonenumberExists = await Account.findOne({ 
        _id: {$ne: accountId},
        phonenumber: customerPhone 
      });
      if (phonenumberExists) {
        return res.status(403).json({ error: "Số điện thoại đã tồn tại" });
      }

      const emailExists = await Account.findOne({
        _id: {$ne: accountId},
        email: customerEmail
      });
      if(emailExists){
        return res.status(403).json({ error: "Email đã tồn tại" })
      }
      await Account.updateOne({_id: accountId}, req.body);
      res.status(200).json({message: "Success"})  

      const newOrder = new Order({
        customer_id: customerID,
        username: customerName,
        phonenumber: customerPhone,
        email: customerEmail,
        address: customerAddress,
        payment: payment,
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
    try {
      const orders = await Order.find({ customer_id: req.params.customer_id });

      res.status(200).json({
        orders: mutipleMongooseToObject(orders),
      });
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  };

module.exports = {
  newOrder,
  myOrder,
};
