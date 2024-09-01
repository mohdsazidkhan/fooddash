// src/components/OrderBasket.js
import React from 'react';

const OrderBasket = ({ note, setNote, paymentMethod, setPaymentMethod, items, onRemove, onCheckout }) => {
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
  let customer = JSON.parse(localStorage.getItem('customer'));
  return (
    <>
    {items?.length > 0 &&
    <div className="p-4 border rounded-lg shadow-md w-full md:w-1/3 mt-8">
      <h2 className="text-xl font-bold mb-2">Order Basket</h2>
      <ul>
        {items.map(item => (
          <li key={item.id} className="p-2 rounded border-2 flex justify-between items-start gap-4">
            <div>
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p className="text-gray-600">Price: ₹{item.price * item.quantity}</p>
            </div>
            <button onClick={() => onRemove(item.id)} className="mt-2 bg-red-600 text-white px-2 py-1 rounded">Remove</button>
          </li>
        ))}
      </ul>
     
      <div className="mt-4">
        <label htmlFor="payment-method" className="block text-sm font-medium text-gray-700">Delivery Address:</label>
        <address className="mb-2 py-1">{customer?.address}</address>
      </div>
      <div>
        <label htmlFor="payment-method" className="block text-sm font-medium text-gray-700">Payment Method</label>
        <select
          id="payment-method"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="Cash">Cash</option>
          <option value="Credit Card">Credit Card</option>
          <option value="PayPal">PayPal</option>
          <option value="Debit Card">Debit Card</option>
          <option value="UPI">UPI</option>
        </select>
      </div>
      <div className="mb-4 mt-2">
          <label className="block text-sm font-medium text-gray-700">Note:</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-2 border rounded"
            rows="2"
          />
        </div>
      <div className="mt-4 flex justify-between items-center">
        <p className="text-xl font-bold mb-0">Total: ₹{totalPrice}</p>
        <button onClick={onCheckout} className="mt-2 bg-blue-600 text-white px-4 py-1 rounded">Checkout</button>
      </div>
      
    </div>
    }
    </>
  );
};

export default OrderBasket;
