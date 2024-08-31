// src/pages/ProfilePage.js
import React from 'react';
import ProfileRestaurant from '../components/ProfileRestaurant';
import Header from '../components/Header';

const ProfilePage = () => {
  return (
    <>
    <Header />
    <div className="container mx-auto">
      <div className="py-4">
      <ProfileRestaurant />
    </div>
    </div>
    </>
  );
};

export default ProfilePage;
