// backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Define routes with appropriate callback functions
router.post('/', orderController.createOrder);
router.get('/customer/:customerId', orderController.getOrdersByCustomer);
router.get('/:id', orderController.getOrderById);

module.exports = router;
