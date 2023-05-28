const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
var methodOverride = require("method-override");
const app = express();
const route = require("./routes");
const db = require("./config/db");
const cors = require("cors");
const mongoose = require("mongoose");
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://admin:Minh2709!@cluster0.ih5wct7.mongodb.net/OrderFood",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Định nghĩa schema cho collection "orders"
const orderSchema = new mongoose.Schema({
  items: [{ name: String, image: String, price: Number, quantity: Number }],
  total: Number,
  customerName: String,
  customerAddress: String,
  customerPhone: String,
  customerEmail: String,
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  createdAt: { type: Date, default: Date.now },
});

// Tạo model từ schema
const Order = mongoose.model("Order", orderSchema);

app.post("/api/checkout", async (req, res) => {
  const cart = req.body.cart;
  const total = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const { customerName, customerAddress, customerPhone, customerEmail } =
    req.body;
  const accountId = req.body.accountId;

  try {
    // Lưu thông tin đơn hàng vào MongoDB
    const newOrder = new Order({
      items: cart,
      total: total,
      customerName: customerName,
      customerAddress: customerAddress,
      customerPhone: customerPhone,
      customerEmail: customerEmail,
      accountId: accountId,
      createdAt: new Date(),
    });
    await newOrder.save();

    // Trả về kết quả cho máy khách
    res.send("Thanh toán thành công!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Thanh toán thất bại. Vui lòng thử lại sau.");
  }
});
//Connect to DB
db.connect();

const port = 5000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

// route init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
