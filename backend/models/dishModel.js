// src/models/dishModel.js
const db = require('../utils/db');

const Dish = {
  create: async ({ restaurant_id, name, price, description, dietary_tags, image }) => {
    let tags = dietary_tags !== undefined ? dietary_tags : "Veg";
    const [result] = await db.execute(
      'INSERT INTO Dishes (restaurant_id, name, price, description, dietary_tags, image) VALUES (?, ?, ?, ?, ?, ?)',
      [restaurant_id, name, price, description, dietary_tags = tags, image ]
    );
    return result.insertId;
  },

  findByRestaurantId: async (restaurant_id) => {
    const [dishes] = await db.execute('SELECT * FROM Dishes WHERE restaurant_id = ?', [restaurant_id]);
    return dishes;
  },

  findById: async (id) => {
    const [dish] = await db.execute('SELECT * FROM Dishes WHERE id = ?', [id]);
    return dish[0];
  },

  update: async (id, { name, price, description, dietary_tags }) => {
    await db.execute(
      'UPDATE Dishes SET name = ?, price = ?, description = ?, dietary_tags = ? WHERE id = ?',
      [name, price, description, dietary_tags, id]
    );
  },

  delete: async (id) => {
    await db.execute('DELETE FROM Dishes WHERE id = ?', [id]);
  }
};

module.exports = Dish;
