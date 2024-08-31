import React from 'react';
import Header from '../components/Header';
const OrderConfirmationPage = () => {
  return (
    <>
    <Header/>
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>
      <p className="text-lg">Thank you for your order! We are processing it and will send you updates soon.</p>
    </div>
    </>
  );
};

export default OrderConfirmationPage;
