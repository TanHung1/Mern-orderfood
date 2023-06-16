const express = require("express");
const { createProduct, getAllProducts, trashProducts, updateProduct, deleteProduct, restoreProduct, forcedeleteProduct, getAllOrders, getOrderById, updateOrder, deleteOrder, getAllAccounts, getAccountById, updateAccount, restoreOrder, forcedeleteOrder, updateStatusOrder } = require("../app/controllers/AdminControllers");
const { AuthenticationAccount, checkRole } = require("../app/middleware/Authentication");
const router = express.Router();
// router.use(AuthenticationAccount, checkRole('admin'));
//production
router.post("/create-product", AuthenticationAccount, checkRole('admin'), createProduct)
router.get("/get-all-products", AuthenticationAccount, checkRole('admin'), getAllProducts);
router.get("/trash-product", AuthenticationAccount, checkRole('admin'), trashProducts);
router.put("/update-product/:id", AuthenticationAccount, checkRole('admin'), updateProduct);
router.delete("/delete-product/:id", AuthenticationAccount, checkRole('admin'), deleteProduct);
router.patch("/restore-product/:id", AuthenticationAccount, checkRole("admin"), restoreProduct);
router.delete("/forcedelete-product/:id", AuthenticationAccount, checkRole('admin'), forcedeleteProduct);

//Order
router.get("/get-all-orders", AuthenticationAccount, checkRole('admin'), getAllOrders);
router.get("/order/:id", AuthenticationAccount, checkRole('admin'), getOrderById);
router.put("/update-order/:id", AuthenticationAccount, checkRole('admin'), updateStatusOrder);
router.delete("/delete-order/:id", AuthenticationAccount, checkRole('admin'), deleteOrder);
router.patch("c", AuthenticationAccount, checkRole('admin'), restoreOrder);
router.delete("/forcedelete-order/:id", AuthenticationAccount, checkRole('admin'), forcedeleteOrder);

//Account
router.get("/all-accounts", AuthenticationAccount, checkRole('admin'), getAllAccounts);
router.get("/account/:id", AuthenticationAccount, checkRole('admin'), getAccountById);
router.put("/update-account/:id", AuthenticationAccount, checkRole('admin'), updateAccount);


module.exports = router;
