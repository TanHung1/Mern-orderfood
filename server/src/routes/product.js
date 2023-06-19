const express = require("express");
const router = express.Router();
const productController = require("../app/controllers/ProductControllers");

router.get("/:id", productController.productDetail);
router.post("/detail-product/:id", productController.createReviewProduct)
router.get("/", productController.show);

module.exports = router;
