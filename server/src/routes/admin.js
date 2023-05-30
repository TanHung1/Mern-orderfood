const express = require('express');
const router = express.Router();

const { AuthenticationAdmin } = require('../app/middleware/Authentication');
const AdminControllers = require('../app/controllers/AdminControllers');

//production routes
router.post('/create-product', AdminControllers.createProduct);
router.get('/stored-product', AdminControllers.storedProducts);
router.get('/trash-product', AdminControllers.trashProducts);
router.put('/:id/update-product',AdminControllers.updateProduct);
router.delete('/:id/delete-product', AdminControllers.deleteProduct);
router.patch('/:id/restore-product', AdminControllers.restoreProduct);
router.delete('/:id/forcedelete-product', AdminControllers.forcedeleteProduct);
router.get('/allorders', AdminControllers.getAllOrders)

router.get('/stored-customer', AdminControllers.storedCustomers);
//staff routes
router.get('/stored-staff', AdminControllers.storedStaffs);
router.get('/trash-staff', AdminControllers.trashStaffs);
router.put('/:id/update-staff', AdminControllers.updateStaff);
router.delete('/:id/delete-staff', AdminControllers.deleteStaff);
router.patch('/:id/restore-staff', AdminControllers.restoreStaff);
router.delete('/:id/forcedelete-staff', AdminControllers.forcedeleteStaff);

module.exports = router;