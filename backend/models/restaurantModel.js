// src/models/restaurantModel.js
const db = require('../utils/db');

const Restaurant = {
  create: async ({ name, email, password, address, operating_hours, menu, cuisine }) => {
    const [result] = await db.execute(
      'INSERT INTO Restaurants (name, email, password, address, operating_hours, menu, cuisine) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, password, address, operating_hours, menu, cuisine]
    );
    return result.insertId;
  },
  findByEmail: async (email) => {
    const [restaurants] = await db.execute('SELECT * FROM Restaurants WHERE email = ?', [email]);
    return restaurants[0];
  },

  findAll: async () => {
    const [restaurants] = await db.execute('SELECT * FROM Restaurants');
    return restaurants;
  },

  findById: async (id) => {
    const [restaurant] = await db.execute('SELECT * FROM Restaurants WHERE id = ?', [id]);
    return restaurant[0];
  },

  update: async (id, { name, address, operating_hours }) => {
    await db.execute(
      'UPDATE Restaurants SET name = ?, address = ?, operating_hours = ? WHERE id = ?',
      [name, address, operating_hours, id]
    );
  },

  delete: async (id) => {
    await db.execute('DELETE FROM Restaurants WHERE id = ?', [id]);
  }
};

module.exports = Restaurant;
