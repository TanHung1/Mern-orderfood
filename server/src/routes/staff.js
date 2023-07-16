const express = require("express");
const StaffControllers = require("../app/controllers/StaffControllers");
const { getAllOrders, getOrderById } = require("../app/controllers/AdminControllers");
const {
    AuthenticationAccount,
    checkRole,
  } = require("../app/middleware/Authentication");
const router = express.Router();

router.get("/all-orders", AuthenticationAccount, getAllOrders);
router.get('/order/:id', AuthenticationAccount, getOrderById)
router.put("/update-status-order/:id", AuthenticationAccount, StaffControllers.updateStatusOrder);

module.exports = router;
