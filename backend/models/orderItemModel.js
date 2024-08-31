// src/models/orderItemModel.js
const db = require('../utils/db');

const OrderItem = {
  create: async ({ order_id, dish_id, quantity, price }) => {
    const [result] = await db.execute(
      'INSERT INTO OrderItems (order_id, dish_id, quantity, price) VALUES (?, ?, ?, ?)',
      [order_id, dish_id, quantity, price]
    );
    return result.insertId;
  },

  findByOrderId: async (order_id) => {
    const [items] = await db.execute('SELECT * FROM OrderItems WHERE order_id = ?', [order_id]);
    return items;
  },

  deleteByOrderId: async (order_id) => {
    await db.execute('DELETE FROM OrderItems WHERE order_id = ?', [order_id]);
  }
};

module.exports = OrderItem;
