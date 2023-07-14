const Product = require("../models/Product");
const User = require("../models/Account");
const { mutipleMongooseToObject, mongooesToObject } = require("../../util/mongoose");
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
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
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
  } catch (error) {
    res.status(401).json(error);
  }
}

// [get] /api/admin/trash-products
const trashProducts = async (req, res) => {
  try {
    const products = await Product.findDeleted({})
    res.status(200).json({
      products: mutipleMongooseToObject(products)
    })
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: "error" })
  }

}

// [put] api/admin/update-product/:id
const updateProduct = async (req, res) => {
  try {
    await Product.updateOne({ _id: req.params.id }, req.body)
    res.status(200).json({ message: "success" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "error" })
  }
}

// [delete] /admin/delete-product/:id
const deleteProduct = async (req, res) => {
  try {
    await Product.delete({ _id: req.params.id })
    res.status(200).json({ message: "success" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "error" })
  }
}

// [patch] /admim/restore-product/:id
const restoreProduct = async (req, res, next) => {
  try {
    await Product.restore({ _id: req.params.id })
    res.status(200).json({ success: "success" })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)

  }
}

// [delete] api/admin/forcedelete-product/:id
const forcedeleteProduct = async (req, res, next) => {
  try {
    await Product.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: "success" })

  } catch (error) {
    res.status(500).json({ message: "error" })
  }
}

//--------------Account-----------
// [get] /api/admin/all-accounts
const getAllAccounts = async (req, res) => {
  try {
    const accounts = await User.find();
    res.status(200).json({
      accounts: mutipleMongooseToObject(accounts)
    });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
// [get] /api/admin/account/:id
const getAccountById = async (req, res) => {
  try {
    const account = await User.findById({_id: req.params.id})
    res.status(200).json({account: mongooesToObject(account)});
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
// [put] /api/admin/update-account/:id
const updateAccount = async (req, res) => {
  try {
    await User.updateOne({ _id: req.params.id }, req.body)
    res.status(200).json({ messages: "success" })

  } catch (error) {
    res.status(500).json(error)
  }
}

//---------Order--------

//[get] /api/admin/get-all-orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    let totalAmount = 0;
    let totalAmountByDay = {}
    orders.forEach((order) => {
      totalAmount += order.totalPrice;

      const date = new Date(order.createdAt).toLocaleDateString();

      if (totalAmountByDay[date]) {
        totalAmountByDay[date] += order.totalPrice;
      } else {
        totalAmountByDay[date] = order.totalPrice;
      }

    });

    res.status(200).json({
      orders: mutipleMongooseToObject(orders),
      totalAmount,
      totalAmountByDay
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
// [get] /api/admin/order/:id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById({_id: req.params.id});
    res.status(200).json({order: mongooesToObject(order)});
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
// [put] api/admin/order/update-order/:id
const updateOrder = async (req, res) => {
  try {
    await Order.updateOne({_id: req.params.id}, req.body);
    res.status(200).json({success: "Success"})
  } catch (error) {
    console.log(error)
    res.status(403).json({message:"error"})
  }
};

// [put] /api/admin/update-status-order/:id
const updateStatusOrder = async (req, res) => {
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
  } catch (error) {
    console.error(error);
    return res.status(500).send("Lỗi máy chủ!");
  }
};
// [get] api/admin/trash-orders/
const trashOrders = async (req, res) => {
  try {
    const orders = await Order.findDeleted({})
      res.json({
          orders: mutipleMongooseToObject(orders),
        })     
    
  } catch (error) {
    res.status(500).json(error)    
  }
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
}

