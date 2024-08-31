// src/pages/ProfilePage.js
import React from 'react';
import ProfileRestaurant from '../components/ProfileRestaurant';
import Header from '../components/Header';

const ProfilePage = () => {
  return (
    <>
    <Header />
    <div className="p-4">
      <ProfileRestaurant />
    </div>
    </>
  );
};

export default ProfilePage;
