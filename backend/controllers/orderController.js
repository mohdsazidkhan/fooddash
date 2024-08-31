// backend/controllers/orderController.js
const Order = require('../models/orderModel');
const OrderItem = require('../models/orderItemModel');

exports.createOrder = async (req, res) => {
  let data = req.body;
  try {
    // Convert strings to numbers if necessary
    const restaurantId = parseInt(data.restaurantId, 10);
    const customerId = parseInt(data.customerId, 10);
    const totalPrice = parseFloat(data.totalPrice);
  
    // Create the order
    const order = await Order.create({
      customer_id: customerId,
      restaurant_id: restaurantId,
      total_price: totalPrice,
      payment_method: data?.paymentMethod,
      delivery_address: data?.deliveryAddress,
      note: data?.note,
    });
    console.log(order, ' item')
    // Check if items exist and add them to the order
    if (data.items && data.items.length > 0 && order) {
      for (const item of data.items) {
        await OrderItem.create({
          order_id: order,
          dish_id: item.dishId,
          quantity: item.quantity,
          price: parseFloat(item.price) // Ensure price is stored as a float
        });
      }
    }
  
    // Return the created order
    res.status(201).json(order);
  
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order.' });
  }
};

exports.getOrdersByCustomer = async (req, res) => {
  try {
    const orders = await Order.findByCustomerId(req.params.customerId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
};
