import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  console.log(restaurant,  'restaurant')
  return (
    <Link  className="bg-white border rounded-lg shadow-md p-4" to={`/restaurant/${restaurant.id}`}>

      <h2 className="text-xl font-bold">{restaurant.name}</h2>
      <p className="text-gray-700">{restaurant.cuisine}</p>
      <p className="text-gray-500">{restaurant.address}</p>
      <p className="text-gray-400">Hours: {restaurant.operating_hours}</p>
   
    </Link>
  );
};

export default RestaurantCard;
