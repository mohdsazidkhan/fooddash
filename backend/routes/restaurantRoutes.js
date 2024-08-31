// src/routes/restaurantRoutes.js
const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.post('/register', restaurantController.registerRestaurant);
router.get('/', restaurantController.getRestaurants);
router.post('/login', restaurantController.loginRestaurant);
router.get('/:id', restaurantController.getRestaurantById);

module.exports = router;
