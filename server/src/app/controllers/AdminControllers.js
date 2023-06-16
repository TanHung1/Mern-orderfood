const Product = require("../models/Product");
const User = require("../models/Account");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const Order = require("../models/Order");

  //[post] /api/admin/create-product
  const createProduct = async (req, res) => {
    try {
      const { nameprod, image, category, price } = req.body;

      const product = new Product({
        nameprod,
        image,
        category,
        price,
      });
      await product.save();
      res.status(200).send(product);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  };

  // [get] /api/admin/get-all-products
  const getAllProducts = async (req, res, next) => {
  try {
    const [products, deleteCount] = await Promise.all([
      Product.find({}),
      Product.countDocumentsDeleted({})
    ]);
    res.json({
      deleteCount,
      products: mutipleMongooseToObject(products),
    });
  } catch (err) {
    res.status(401).json(err);
  }
}

  // [get] /api/admin/trash-products
  const trashProducts = (req, res) => {
    Product.findDeleted({})
      .then((products) =>
        res.json({
          products: mutipleMongooseToObject(products),
        })
      )
      .catch((err) => res.status(401).json(err));
  }

  // [put] api/admin/update-product/:id
  const updateProduct = (req, res) => {
    Product.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.status(200).json({ messages: "success" }))
      .catch((err) => res.status(500).json(err));
  }

  // [delete] /admin/delete-product/:id
  const deleteProduct = (req, res) => {
    Product.delete({ _id: req.params.id })
      .then(res.status(200).send("oke"))
      .catch((err) => res.status(500).json(err));
  }

  // [patch] /admim/restore-product/:id
  const restoreProduct = (req, res, next) =>{
    Product.restore({ _id: req.params.id })
      .then(() => res.status(200).send("oke"))
      .catch((err) => res.status(500).json(err));
  }

  // [delete] api/admin/forcedelete-product/:id
  const forcedeleteProduct = (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
      .then(res.status(200).send("oke"))
      .catch((err) => res.status(500).json(err));
  }

  //-------------------------------STAFF------------------

  // [get] /api/admin/stored-staff
  // storedStaffs(req, res, next) {
  //   Promise.all([User.find({}), User.countDocumentsDeleted({ role: "staff" })])
  //     .then(([staffs, deleteCount]) =>
  //       res.json({
  //         deleteCount,
  //         staffs: mutipleMongooseToObject(staffs),
  //       })
  //     )
  //     .catch((err) => res.status(401).json(err));
  // }

  // // [get] /api/admin/trash-staff
  // trashStaffs(req, res) {
  //   Staff.findDeleted({})
  //     .then((staffs) =>
  //       res.json({
  //         staffs: mutipleMongooseToObject(staffs),
  //       })
  //     )
  //     .catch((err) => res.status(401).json(err));
  // }

  // // [put] api/admim/:id/update-staff
  // updateStaff(req, res) {
  //   Staff.updateOne({ _id: req.params.id }, req.body)
  //     .then(res.status(200).send("oke"))
  //     .catch((err) => (console.log(err), res.status(500).json(err)));
  // }

  // // [delete] /admim/:id/delete-staff
  // deleteStaff(req, res, next) {
  //   Staff.delete({ _id: req.params.id })
  //     .then(res.status(200).send("oke"))
  //     .catch((err) => (console.log(err), res.status(500).json(err)));
  // }
  // //[patch] /api/admin/:id/restore-staff
  // restoreStaff(req, res, next) {
  //   Staff.restore({ _id: req.params.id })
  //     .then(() => res.status(200).send("oke"))
  //     .catch((err) => res.status(500).json(err));
  // }

  // // [delete] api/admin/:id/forcedelet-staff
  // forcedeleteStaff(req, res, next) {
  //   Staff.deleteOne({ _id: req.params.id })
  //     .then(res.status(200).send("oke"))
  //     .catch((err) => (console.log(err), res.status(500).json(err)));
  // }
  //--------------Account-----------
  // [get] /api/admin/all-accounts
  const getAllAccounts = async (req, res) => {
    try {
      const accounts = await User.find();
      res.status(200).json(accounts);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  };
  // [get] /api/admin/account/:id
  const getAccountById = async (req, res) => {
    try {
      const accountId = req.params.id;
      const account = await User.findById(accountId);
      res.status(200).json(account);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  };
  // [put] /api/admin/update-account/:id
  const updateAccount = (req, res) => {
    User.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.status(200).json({ messages: "success" }))
      .catch((err) => res.status(500).json(err));
  }
  //---------CUSTOMER-----
  //[get] /api/admin/stored-customers/
  // storedCustomers = async (req, res) => {
  //   Promise.all([
  //     Customer.find({}),
  //     Customer.countDocumentsDeleted({ role: "customer" }),
  //   ])
  //     .then(([customers, deleteCount]) =>
  //       res.json({
  //         deleteCount,
  //         customers: mutipleMongooseToObject(customers),
  //       })
  //     )
  //     .catch((err) => res.status(401).json(err));
  // };

  // // [get] api/admin/trash-customers/
  // trashCustomer(req, res) {
  //   Customer.findDeleted({})
  //     .then((customers) =>
  //       res.json({
  //         customers: mutipleMongooseToObject(customers),
  //       })
  //     )
  //     .catch((err) => res.status(500).json(err));
  // }

  // // [delete] api/admin/:id/delete-customers/
  // deleteCustomer(req, res) {
  //   Customer.delete({ _id: req.params.id })
  //     .then(() => res.status(200).send("oke"))
  //     .catch((err) => res.status(500).json(err));
  // }

  // // [patch] api/admin//restore-customers/
  // restoreCustomer(res, req) {
  //   Customer.restore({ _id: req.params.id })
  //     .then(() => res.status(200).send("oke"))
  //     .catch((err) => res.status(500).json(err));
  // }

  // // [delete] api/admin/:id/forcedelete-customers/
  // forcedeleteCustomer(req, res) {
  //   Customer.deleteOne({ _id: req.params.id })
  //     .then(() => res.status(200).send("oke"))
  //     .catch((err) => res.status(500).json(err));
  // }
  //---------Order--------
  
  //[get] /api/admin/get-all-orders
  const getAllOrders = async (req, res) => {
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
  // [get] /api/admin/order/:id
  const getOrderById = async (req, res) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findById(orderId);
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  };
  // [put] api/admin/order/update-order/:id
  const updateOrder = (req, res) => {
    Order.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.status(200).json({ messages: "success" }))
      .catch((err) => res.status(500).json(err));
  },

  // [put] /api/admin/update-status-order/:id
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
        status === "Đã hoàn thành giao đơn hàng" ||
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
  // [get] api/admin/trash-orders/
  const trashOrders = (req, res) => {
    Order.findDeleted({})
      .then((orders) =>
        res.json({
          orders: mutipleMongooseToObject(orders),
        })
      )
      .catch((err) => res.status(500).json(err));
  }

  // [delete] api/admin/delete-order/:id
  const deleteOrder = (req, res) => {
    Order.delete({ _id: req.params.id })
      .then(() => res.status(200).json({ messages: "success" }))
      .catch((err) => res.status(500).json(err));
  }

  // [patch] api/admin/restore-order/:id
  const restoreOrder = (res, req) => {
    Order.restore({ _id: req.params.id })
      .then(() => res.status(200).json({ messages: "success" }))
      .catch((err) => res.status(500).json(err));
  }

  // [delete] api/admin/forcedelete-order/:id
  const forcedeleteOrder = (req, res) => {
    Customer.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ messages: "success" }))
      .catch((err) => res.status(500).json(err));
  }
  module.exports = {
    updateStatusOrder,
    createProduct,
    getAllProducts,
    trashProducts,
    updateProduct,
    deleteProduct,
    restoreProduct,
    forcedeleteProduct,
    getAllAccounts,
    getAccountById,
    updateAccount,
    getAllOrders,
    getOrderById,
    updateOrder,
    trashOrders,
    deleteOrder,
    restoreOrder,
    forcedeleteOrder,
  }
  
