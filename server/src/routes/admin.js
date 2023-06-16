const express = require("express");
const router = express.Router();
const AdminControllers = require("../app/controllers/AdminControllers");

//production routes
router.post("/create-product", AdminControllers.createProduct);
router.get("/stored-product", AdminControllers.storedProducts);
router.get("/trash-product", AdminControllers.trashProducts);
router.put("/:id/update-product", AdminControllers.updateProduct);
router.delete("/:id/delete-product", AdminControllers.deleteProduct);
router.patch("/:id/restore-product", AdminControllers.restoreProduct);
router.delete("/:id/forcedelete-product", AdminControllers.forcedeleteProduct);

//Order
router.get("/allorders", AdminControllers.getAllOrders);
router.get("/order/:id", AdminControllers.getOrderById);
router.put("/:id/update-order", AdminControllers.updateOrder);
router.delete("/:id/delete-order", AdminControllers.deleteOrder);
//Account
router.get("/all-accounts", AdminControllers.getAllAccounts);
router.get("/account/:id", AdminControllers.getAccountById);
router.put("/:id/update-account", AdminControllers.updateAccount);
router.get("/stored-customer", AdminControllers.storedCustomers);
//staff routes
router.get("/stored-staff", AdminControllers.storedStaffs);
router.get("/trash-staff", AdminControllers.trashStaffs);
router.put("/:id/update-staff", AdminControllers.updateStaff);
router.delete("/:id/delete-staff", AdminControllers.deleteStaff);
router.patch("/:id/restore-staff", AdminControllers.restoreStaff);
router.delete("/:id/forcedelete-staff", AdminControllers.forcedeleteStaff);

module.exports = router;
