const Order = require("../models/Order");

class OrderController {
  //[post] /api/order/neworder
  newOrder = async (req, res) => {
    const user = req.user;
    try {
      const { username, cart, totalPrice } = req.body;

      const order = new Order({
        username: user.username,
        // phonenumber: user.phonenumber,
        product: cart.map((item) => {
          return item;
        }),
        totalPrice,
        paidAt: Date.now(),
      });
      await order.save();
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
    console.log(user);
  };

  //[get]/api/customers/myorder
  myOrder = async (req, res) => {
    try {
      const orders = await Order.find({ user: req.user._id });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  };
}
module.exports = new OrderController();
