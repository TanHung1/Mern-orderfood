const Order = require("../models/Order");
const { mongooesToObject } = require("../../util/mongoose");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const moment = require("moment");

class StaffController {
  // [put] /api/staff/update-status-order/:id
  updateStatusOrder = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).send("Không tìm thấy đơn hàng này!");
      }

      const { status } = req.body;

      if (
        status === "Chưa xác nhận" ||
        status === "Đã xác nhận" ||
        status === "Đang giao" ||
        status === "Đã hoàn thành" ||
        status === "Đơn hàng bị hủy"
      ) {
        order.status = status;
  
        if (status === "Đã xác nhận") {
          order.status = "Đã xác nhận";
        }
  
        if (status === "Đang giao") {
          order.status = "Đang giao";
          order.shippingDate = Date.now();
        }
  
        if (status === "Đã hoàn thành") {
          order.status = "Đã hoàn thành";
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
}

module.exports = new StaffController();
