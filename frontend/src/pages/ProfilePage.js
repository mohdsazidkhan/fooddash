// src/pages/ProfilePage.js
import React from 'react';
import Profile from '../components/Profile';
import Header from '../components/Header';

const ProfilePage = () => {
  return (
    <>
    <Header />
    
    <div className="p-4">
      <Profile />
    </div>
    </>
  );
};

export default ProfilePage;
