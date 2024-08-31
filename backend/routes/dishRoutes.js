// src/routes/dishRoutes.js
const express = require('express');
const router = express.Router();
const dishController = require('../controllers/dishController');

// Route to add a new dish to a restaurant
router.post('/', dishController.addDish);

// Route to get all dishes for a specific restaurant
router.get('/restaurant/:restaurant_id', dishController.getDishesByRestaurant);

// Route to update a dish
router.put('/:id', dishController.updateDish);

// Route to delete a dish
router.delete('/:id', dishController.deleteDish);

module.exports = router;
