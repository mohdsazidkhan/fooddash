// src/controllers/customerController.js
const Customer = require('../models/customerModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerCustomer = async (req, res) => {
  const { name, email, password, address } = req.body;
  console.log(address, ' req.body')
  let newaddress = address !== undefined ? address : ""

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const customerId = await Customer.create({ name, email, password: hashedPassword, address: newaddress});
    res.status(201).json({ message: 'Customer registered successfully', customerId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginCustomer = async (req, res) => {
  const { email, password } = req.body;
  try {
    const customer = await Customer.findByEmail(email);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: customer.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ customer, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, email, address } = req.body;

  try {
    await Customer.update(id, { name, email, address });
    res.status(200).json({ message: 'Customer updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    await Customer.delete(id);
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
