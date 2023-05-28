const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductControllers');

router.get('/:id', productController.detail);
router.get('/', productController.show);

module.exports = router;