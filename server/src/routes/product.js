const express = require("express");
const router = express.Router();
const { AuthenticationAccount } = require("../app/middleware/Authentication");
const { productDetail, show, createReviewProduct } = require("../app/controllers/ProductControllers");

router.get("/:id", productDetail );
router.post("/create-review/:id",AuthenticationAccount, createReviewProduct )
router.get("/", show);

module.exports = router;
