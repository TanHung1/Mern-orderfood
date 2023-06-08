const Order = require("../models/Order");

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

            } = req.body;

            const totalPrice = cart.reduce(
                (total, item) => total + item.price * item.quantity, 0
            );

            const newOrder = new Order({
                username: customerName,
                phonenumber: customerPhone,
                email: customerEmail,
                address: customerAddress,
                product: cart.map((item) => {
                    return item
                }),
                totalPrice: totalPrice,
                paidAt: Date.now(),
            })
            await newOrder.save();
            res.status(200).json({
                message: "Success",
                newOrder,
            })

        }
        catch (error) {
            res.status(500).json(error);
            console.log(error)
        }
    }

    //[get]/api/customers/:id/myorder
    myOrder = async (req, res) => {
        try {
            const orders = await Order.find({ user: req.user._id });
            res.status(200).json(orders)
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    };
}
module.exports = new OrderController;