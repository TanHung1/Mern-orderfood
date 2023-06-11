const express = require("express");
const router = express.Router();
const productController = require("../app/controllers/ProductControllers");

router.get("/:id", productController.productDetail);
router.get("/", productController.show);

module.exports = router;
