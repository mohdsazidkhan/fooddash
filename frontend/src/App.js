import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RestaurantPage from './pages/RestaurantPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import RegisterRestaurantPage from './pages/RegisterRestaurantPage';
import LoginPageRestaurent from './pages/LoginPageRestaurent';
import ProfilePageRestaurent from './pages/ProfilePageRestaurent';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" exact element={<HomePage/>} />
          <Route path="/restaurant/:id" element={<RestaurantPage/>} />
          <Route path="/login-customer" element={<LoginPage/>} />
          <Route path="/login-restaurant" element={<LoginPageRestaurent />} />
          <Route path="/register-customer" element={<SignupPage/>} />
          <Route path="/profile-customer" element={<ProfilePage/>} />
          <Route path="/profile-restaurant" element={<ProfilePageRestaurent />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage/>} />
          <Route path="/register-restaurant" element={<RegisterRestaurantPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
