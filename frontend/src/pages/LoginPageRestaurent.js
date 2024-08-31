// src/pages/LoginPage.js
import React from 'react';
import AuthFormRestaurent from '../components/AuthFormRestaurent';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const LoginPage = () => {

  const navigate = useNavigate();

  const handleLoginSuccess = (data) => {
    console.log(data, ' datadatadatadata')
    localStorage.setItem('token', data.token);
    localStorage.setItem('type', "restaurant");
    localStorage.setItem('restaurant', JSON.stringify(data.restaurant));
    // Save auth data and redirect
    navigate('/profile-restaurant');
  };

  return (
    <>
     <Header />
     <div className="p-4">
     <div className="container mx-auto flex justify-center items-center">
      <AuthFormRestaurent isSignup={false} onSuccess={handleLoginSuccess} />
    </div>
    </div>
    </>
    
  );
};

export default LoginPage;
