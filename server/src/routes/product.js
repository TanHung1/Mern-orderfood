const express = require("express");
const router = express.Router();
const productController = require("../app/controllers/ProductControllers");
const { AuthenticationAccount } = require("../app/middleware/Authentication");

router.get("/:id", productController.productDetail);
router.post("/create-review/:id",AuthenticationAccount, productController.createReviewProduct)
router.get("/", productController.show);

module.exports = router;
