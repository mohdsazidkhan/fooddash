import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let restaurant = JSON.parse(localStorage.getItem('restaurant'));
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/restaurants/${restaurant?.id}`) // replace with actual customer ID
      .then(response => setProfile(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Profile</h2>
      {profile && (
        <div>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Address:</strong> {profile.address}</p>
        </div>
      )}
      <h3 className="text-lg font-semibold mt-4">Menus</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {profile?.menu?.map((item, index) => (
          <div key={index} class="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <img class="w-full object-cover" src={item.image} alt={item.name}/>
          <div class="p-4">
            <h2 class="text-2xl font-semibold text-gray-800">{item.name}</h2>
            <p class="text-gray-600 mt-2">{item.description}</p>
            <div class="mt-4">
              <span class="text-xl font-bold text-gray-900">₹{item.price}</span>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
