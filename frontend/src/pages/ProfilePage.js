// src/pages/ProfilePage.js
import React from 'react';
import Profile from '../components/Profile';
import Header from '../components/Header';

const ProfilePage = () => {
  return (
    <>
    <Header />
    <div className="container mx-auto">
      <div className="py-4">
      <Profile />
    </div>
    </div>
    </>
  );
};

export default ProfilePage;
