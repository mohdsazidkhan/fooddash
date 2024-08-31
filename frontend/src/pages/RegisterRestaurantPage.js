import React from 'react';
import RegisterRestaurantForm from '../components/RegisterRestaurantForm';
import Header from '../components/Header';

const RegisterRestaurantPage = () => {
  return (
    <>
    <Header/>
    <div className="p-4">
        <div className="container mx-auto flex justify-center items-center">
        <RegisterRestaurantForm />
        </div>
    </div>
    </>
  );
};

export default RegisterRestaurantPage;
