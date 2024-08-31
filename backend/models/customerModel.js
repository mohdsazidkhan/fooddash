const db = require('../utils/db');

const Customer = {
  create: async ({ name, email, password, address }) => {
    const [result] = await db.execute(
      'INSERT INTO Customers (name, email, password, address) VALUES (?, ?, ?, ?)',
      [name, email, password, address]
    );
    return result.insertId;
  },

  findByEmail: async (email) => {
    const [customers] = await db.execute('SELECT * FROM Customers WHERE email = ?', [email]);
    return customers[0];
  },

  findById: async (id) => {
    const [customer] = await db.execute('SELECT * FROM Customers WHERE id = ?', [id]);
    return customer[0];
  },

  update: async (id, { name, email, password, address }) => {
    await db.execute(
      'UPDATE Customers SET name = ?, email = ?, password = ?, address = ? WHERE id = ?',
      [name, email, password, address, id]
    );
  },

  delete: async (id) => {
    await db.execute('DELETE FROM Customers WHERE id = ?', [id]);
  }
};

module.exports = Customer;
