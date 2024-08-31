// src/routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/register', customerController.registerCustomer);
router.post('/login', customerController.loginCustomer);
router.get('/:id', customerController.getCustomerById);

module.exports = router;
