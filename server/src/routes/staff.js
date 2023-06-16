const express = require("express");
const StaffControllers = require("../app/controllers/StaffControllers");
const { getAllOrders } = require("../app/controllers/AdminControllers");
const {
    AuthenticationAccount,
    checkRole,
  } = require("../app/middleware/Authentication");
const router = express.Router();

router.get("/all-orders", getAllOrders);
router.put("/update-status-order/:id", StaffControllers.updateStatusOrder);

module.exports = router;
