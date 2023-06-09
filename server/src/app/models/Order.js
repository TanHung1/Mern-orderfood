const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const items = new Schema({
  nameprod: {
    type: String,
  },

  quantity: {
    type: Number,
  },

  price: {
    type: Number,
  },

  image: {
    type: String,
  },

  id: {
    type: String,
  },
});

const Order = new Schema(
  {
    product: {
      type: [items],
    },
    
    customer_id: {
      type: String
    },

    username: {
      type: String,
    },

    address: {
      type: String,
    },

    phonenumber: {
      type: String,
    },

    email: {
      type: String,
    },

    status: {
      type: String,
      default: "Chưa xác nhận",
    },

    payment:{
      type: String,
    },

    totalPrice: {
      type: Number,
      default: 0,
    },

    shippingDate: {
      type: Date,
      default: Date.now(),
    },

    deliveredDate: {
      type: Date,
      default: Date.now(),
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },

  {
    versionKey: false,
    collection: "orders",
    timestamps: true,
  }
);

module.exports = mongoose.model("orders", Order);
