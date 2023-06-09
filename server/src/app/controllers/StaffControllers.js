const Order = require("../models/Order");
const { mongooesToObject } = require("../../util/mongoose");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const moment = require("moment");

class StaffController {
  // [put] /api/staff/:id/update-status-order
  updateStatusOrder = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).send("Không tìm thấy đơn hàng này!");
      }

      const { status } = req.body;

      if (
        status === "Chưa xác nhận" ||
        status === "Đang chuẩn bị món" ||
        status === "Đang giao" ||
        status === "Đã hoàn thành giao đơn hàng" ||
        status === "Đơn hàng bị hủy"
      ) {
        order.status = status;

        if (status === "Đang chuẩn bị món") {
          order.status = "Đang chuẩn bị món";
        }

        if (status === "Đang giao") {
          order.status = "Đang giao";
          order.shippingDate = Date.now();
        }

        if (status === "Đã hoàn thành giao đơn hàng") {
          order.status = "Đã hoàn thành giao đơn hàng";
          order.deliveredDate = Date.now();
        }

        if (status === "Đơn hàng bị hủy") {
          order.status = "Đơn hàng bị hủy";
        }

        await order.save();

        return res
          .status(200)
          .json({ message: "Cập nhật trạng thái đơn hàng thành công!" });
      } else {
        return res.status(400).send("Trạng thái không hợp lệ!");
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send("Lỗi máy chủ!");
    }
  };

  //[get] /api/staff/all-orders

  // total amount datetime
  // getAllOrders = async (req, res) => {
  //     try {
  //         const { date } = req.query;

  //         let query;
  //         let startDay;
  //         let endDay;

  //         if (date) {
  //             const dayDate = parseInt(moment(date).format("D"));
  //             const monthDate = parseInt(moment(date).format("M"));
  //             const yearDate = parseInt(moment(date).format("YYYY"));

  //             startDay = moment([yearDate, monthDate - 1, dayDate]).utc().startOf("day").toDate();
  //             endDay = moment([yearDate, monthDate - 1, dayDate]).utc().endOf("day").toDate();

  //             query = {
  //                 updatedAt: {
  //                     $gte: startDay,
  //                     $lte: endDay,
  //                 }
  //             }
  //         } else {
  //             query = {}
  //         }

  //         const orders = await Order.find(query);
  //         let totalAmount = 0;
  //         orders.forEach((order) => {
  //             totalAmount += order.totalPrice;
  //         })

  //         res.status(200).json({
  //             orders: mutipleMongooseToObject(orders),
  //             totalAmount,
  //         })
  //     } catch (error) {
  //         res.status(500).json(error)
  //         console.log(error)
  //     }
  // };
  getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find();
      let totalAmount = 0;
      orders.forEach((order) => {
        totalAmount += order.totalPrice;
      });

      res.status(200).json({
        orders: mutipleMongooseToObject(orders),
        totalAmount,
      });
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  };
}

module.exports = new StaffController();
