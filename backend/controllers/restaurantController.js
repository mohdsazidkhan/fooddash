// src/controllers/restaurantController.js
const Restaurant = require('../models/restaurantModel');
const Dish = require('../models/dishModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const menus = require('../menus.json');
exports.registerRestaurant = async (req, res) => {

  const { name, email, password, address, operatingHours, cuisine } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const restaurantId = await Restaurant.create({ name, email, password: hashedPassword, address, operating_hours: operatingHours, menu: menus, cuisine });
    // If menu items are provided, add them
    if (menus && menus.length > 0) {
      for (const dish of menus) {
        await Dish.create({ restaurant_id: restaurantId, ...dish });
      }
    }
    res.status(201).json({ message: 'Restaurant registered successfully', restaurantId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginRestaurant = async (req, res) => {
  const { email, password } = req.body;
  try {
    const restaurant = await Restaurant.findByEmail(email);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const isMatch = await bcrypt.compare(password, restaurant.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: restaurant.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ restaurant, token });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRestaurantById = async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRestaurantById = async (req, res) => {
  const { id } = req.params;

  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const { name, address, operating_hours } = req.body;

  try {
    await Restaurant.update(id, { name, address, operating_hours });
    res.status(200).json({ message: 'Restaurant updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRestaurant = async (req, res) => {
  const { id } = req.params;

  try {
    await Restaurant.delete(id);
    res.status(200).json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
