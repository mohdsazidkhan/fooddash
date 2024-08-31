// src/models/orderModel.js
const db = require('../utils/db');

const Order = {

  create: async ({ customer_id, restaurant_id, total_price, status = 'pending', payment_method, delivery_address, note }) => {
    try {
      const [result] = await db.execute(
        'INSERT INTO Orders (customer_id, restaurant_id, total_price, status, payment_method, delivery_address, note) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [customer_id, restaurant_id, total_price, status, payment_method, delivery_address, note]
      );
      return result.insertId;
    } catch (error) {
      console.error('Error in create:', error.message);
      throw error;
    }
  },

  findByCustomerId: async (customerId) => {
    try {
      // Fetch orders, order items, dish images, dish names, and restaurant details
      const [rows] = await db.execute(`
        SELECT o.*, oi.*, d.image AS dish_image, d.name AS dish_name, r.id AS restaurant_id, r.name AS restaurant_name, r.address AS restaurant_address
        FROM Orders o
        LEFT JOIN OrderItems oi ON o.id = oi.order_id
        LEFT JOIN Dishes d ON oi.dish_id = d.id
        LEFT JOIN Restaurants r ON o.restaurant_id = r.id
        WHERE o.customer_id = ?
      `, [customerId]);
  
      // Process rows to group order items under each order and include restaurant details
      const orders = [];
      const orderMap = new Map();
  
      rows.forEach(row => {
        const orderId = row.id;
        if (!orderMap.has(orderId)) {
          orderMap.set(orderId, {
            ...row,
            restaurant: {
              id: row.restaurant_id,
              name: row.restaurant_name,
              address: row.restaurant_address
            },
            items: row.dish_id ? [{
              dish_id: row.dish_id,
              dish_name: row.dish_name,
              dish_image: row.dish_image,
              // other item details
            }] : []
          });
        } else {
          // Append additional information if needed
          const order = orderMap.get(orderId);
          if (row.dish_id) {
            order.items.push({
              dish_id: row.dish_id,
              dish_name: row.dish_name,
              dish_image: row.dish_image,
              // other item details
            });
          }
        }
      });
  
      orders.push(...orderMap.values());
  
      // Remove the restaurant field if not needed
      orders.forEach(order => {
        delete order.restaurant;
      });
  
      return orders;
    } catch (error) {
      console.error('Error in findByCustomerId:', error.message);
      throw error;
    }
  },
  
  
  

  findById: async (id) => {
    try {
      const [order] = await db.execute('SELECT * FROM Orders WHERE id = ?', [id]);
      
      // Check if order exists
      if (order.length === 0) {
        console.log('No order found with id:', id);
        return null; // Return null if no order found
      }
      
      return order[0];
    } catch (error) {
      console.error('Error in findById:', error.message);
      throw error;
    }
  },

  update: async (id, { status }) => {
    try {
      const [result] = await db.execute('UPDATE Orders SET status = ? WHERE id = ?', [status, id]);
      
      // Check if any row was updated
      if (result.affectedRows === 0) {
        console.log('No order found to update with id:', id);
        return false; // Return false if no order was updated
      }

      return true;
    } catch (error) {
      console.error('Error in update:', error.message);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const [result] = await db.execute('DELETE FROM Orders WHERE id = ?', [id]);

      // Check if any row was deleted
      if (result.affectedRows === 0) {
        console.log('No order found to delete with id:', id);
        return false; // Return false if no order was deleted
      }

      return true;
    } catch (error) {
      console.error('Error in delete:', error.message);
      throw error;
    }
  }
};

module.exports = Order;
