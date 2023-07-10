const express = require("express");

const { AuthenticationAccount } = require("../app/middleware/Authentication");
const { myOrder, newOrder } = require("../app/controllers/OrderControllers");
const router = express.Router();

router.get(
  "/:customer_id/myorder",
  AuthenticationAccount,
  myOrder
);
router.post("/neworder", newOrder);

module.exports = router;
