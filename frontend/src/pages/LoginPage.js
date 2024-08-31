// src/pages/LoginPage.js
import React from 'react';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('type', "customer");
    localStorage.setItem('customer', JSON.stringify(data.customer));
    // Save auth data and redirect
    navigate('/profile-customer');
  };

  return (
    <>
     <Header />
     <div className="p-4">
     <div className="container mx-auto flex justify-center items-center">
      <AuthForm isSignup={false} onSuccess={handleLoginSuccess} />
    </div>
    </div>
    </>
    
  );
};

export default LoginPage;
