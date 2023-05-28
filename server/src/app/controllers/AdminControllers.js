const Product = require("../models/Product");
const User = require("../models/Account");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const Order = require("../models/Order");

class AdminController {
  //[post] /api/admin/create-product
  createProduct = async (req, res) => {
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

  // [get] /api/admin/stored-product
  storedProducts(req, res, next) {
    Promise.all([Product.find({}), Product.countDocumentsDeleted({})])
      .then(([products, deleteCount]) =>
        res.json({
          deleteCount,
          products: mutipleMongooseToObject(products),
        })
      )
      .catch((err) => res.status(401).json(err));
  }

  // [get] /api/admin/trash-products
  trashProducts(req, res) {
    Product.findDeleted({})
      .then((products) =>
        res.json({
          products: mutipleMongooseToObject(products),
        })
      )
      .catch((err) => res.status(401).json(err));
  }

  // [put] api/admin/:id/update-product
  updateProduct(req, res) {
    const { nameprod, image, price } = req.body;
    Product.updateOne({ _id: req.params.id }, { nameprod, image, price })
      .then(() => res.status(200).send("oke"))
      .catch((err) => res.status(500).json(err));
  }

  // [delete] /admin/:id/delete-product
  deleteProduct(req, res) {
    Product.delete({ _id: req.params.id })
      .then(res.status(200).send("oke"))
      .catch((err) => res.status(500).json(err));
  }

  // [patch] /admim/:id/restore-product
  restoreProduct(req, res, next) {
    Product.restore({ _id: req.params.id })
      .then(() => res.status(200).send("oke"))
      .catch((err) => res.status(500).json(err));
  }

  // [delete] api/admin/:id/forcedeletProduct
  forcedeleteProduct(req, res, next) {
    Product.deleteOne({ _id: req.params.id })
      .then(res.status(200).send("oke"))
      .catch((err) => res.status(500).json(err));
  }

  //-------------------------------STAFF------------------

  // [get] /api/admin/stored-staff
  storedStaffs(req, res, next) {
    Promise.all([User.find({}), Staff.countDocumentsDeleted()])
      .then(([staffs, deleteCount]) =>
        res.json({
          deleteCount,
          staffs: mutipleMongooseToObject(staffs),
        })
      )
      .catch((err) => res.status(401).json(err));
  }

  // [get] /api/admin/trash-staff
  trashStaffs(req, res) {
    Staff.findDeleted({})
      .then((staffs) =>
        res.json({
          staffs: mutipleMongooseToObject(staffs),
        })
      )
      .catch((err) => res.status(401).json(err));
  }

  // [put] api/admim/:id/update-staff
  updateStaff(req, res) {
    Staff.updateOne({ _id: req.params.id }, req.body)
      .then(res.status(200).send("oke"))
      .catch((err) => (console.log(err), res.status(500).json(err)));
  }

  // [delete] /admim/:id/delete-staff
  deleteStaff(req, res, next) {
    Staff.delete({ _id: req.params.id })
      .then(res.status(200).send("oke"))
      .catch((err) => (console.log(err), res.status(500).json(err)));
  }
  //[patch] /api/admin/:id/restore-staff
  restoreStaff(req, res, next) {
    Staff.restore({ _id: req.params.id })
      .then(() => res.status(200).send("oke"))
      .catch((err) => res.status(500).json(err));
  }

  // [delete] api/admin/:id/forcedelet-staff
  forcedeleteStaff(req, res, next) {
    Staff.deleteOne({ _id: req.params.id })
      .then(res.status(200).send("oke"))
      .catch((err) => (console.log(err), res.status(500).json(err)));
  }

  //---------CUSTOMER-----
  //[get] /api/admin/stored-customers/
  storedCustomers = async (req, res) => {
    Promise.all([Customer.find({}), Customer.countDocumentsDeleted()])
      .then(([customers, deleteCount]) =>
        res.json({
          deleteCount,
          customers: mutipleMongooseToObject(customers),
        })
      )
      .catch((err) => res.status(401).json(err));
  };

  // [get] api/admin/trash-customers/
  trashCustomer(req, res) {
    Customer.findDeleted({})
      .then((customers) =>
        res.json({
          customers: mutipleMongooseToObject(customers),
        })
      )
      .catch((err) => res.status(500).json(err));
  }

  // [delete] api/admin/:id/delete-customers/
  deleteCustomer(req, res) {
    Customer.delete({ _id: req.params.id })
      .then(() => res.status(200).send("oke"))
      .catch((err) => res.status(500).json(err));
  }

  // [patch] api/admin/restore-customers/
  restoreCustomer(res, req) {
    Customer.restore({ _id: req.params.id })
      .then(() => res.status(200).send("oke"))
      .catch((err) => res.status(500).json(err));
  }

  // [delete] api/admin/forcedelete-customers/
  forcedeleteCustomer(req, res) {
    Customer.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).send("oke"))
      .catch((err) => res.status(500).json(err));
  }

  //[get] /api/admin/allorders
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
module.exports = new AdminController();
