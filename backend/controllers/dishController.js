// src/controllers/dishController.js
const Dish = require('../models/dishModel');

exports.addDish = async (req, res) => {
  const { restaurant_id, name, price, description, dietary_tags } = req.body;

  try {
    const dishId = await Dish.create({ restaurant_id, name, price, description, dietary_tags });
    res.status(201).json({ message: 'Dish added successfully', dishId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDishesByRestaurant = async (req, res) => {
  const { restaurant_id } = req.params;
  try {
    const dishes = await Dish.findByRestaurantId(restaurant_id);
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDish = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, dietary_tags } = req.body;

  try {
    await Dish.update(id, { name, price, description, dietary_tags });
    res.status(200).json({ message: 'Dish updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDish = async (req, res) => {
  const { id } = req.params;

  try {
    await Dish.delete(id);
    res.status(200).json({ message: 'Dish deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
