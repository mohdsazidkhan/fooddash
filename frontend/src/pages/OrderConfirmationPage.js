import React from 'react';
import Header from '../components/Header';
const OrderConfirmationPage = () => {
  return (
    <>
    <Header/>
    <div className="container mx-auto">
      <div className="py-4 flex justify-center items-center flex-col">
      <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>
      <p className="text-lg">Thank you for your order! We are processing it and will send you updates soon.</p>
    </div>
    </div>
    </>
  );
};

export default OrderConfirmationPage;
