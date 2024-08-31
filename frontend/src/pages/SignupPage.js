import React from 'react';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const SignupPage = () => {
  const navigate = useNavigate();
  const handleSignupSuccess = () => {
    navigate('/login-customer');
  };

  return (
    <>
    <Header />
    <div className="p-4">
    <div className="container mx-auto flex justify-center items-center">
      <AuthForm isSignup={true} onSuccess={handleSignupSuccess} />
    </div>
    </div>
    </>
  );
};

export default SignupPage;
