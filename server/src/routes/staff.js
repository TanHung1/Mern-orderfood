const express = require('express');
const StaffControllers = require('../app/controllers/StaffControllers');
const router = express.Router();

router.get('/all-orders', StaffControllers.getAllOrders)
router.post('/update-status-order', StaffControllers.updateOrder);

module.exports = router;