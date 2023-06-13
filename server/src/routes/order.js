const express = require("express");
const OrderController = require("../app/controllers/OrderControllers");

const { AuthenticationAccount } = require("../app/middleware/Authentication");
const router = express.Router();

router.get(
  "/:customer_id/myorder",
  AuthenticationAccount,
  OrderController.myOrder
);
router.post("/neworder", OrderController.newOrder);

module.exports = router;
