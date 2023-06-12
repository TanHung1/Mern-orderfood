const express = require("express");
const StaffControllers = require("../app/controllers/StaffControllers");
const router = express.Router();

router.get("/all-orders", StaffControllers.getAllOrders);
router.get("/:id/order-detail", StaffControllers.orderDetail);
router.put("/update-status-order/:id", StaffControllers.updateStatusOrder);

module.exports = router;
