// src/components/RestaurantMenu.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RestaurantMenu = ({ restaurantId, onAddToBasket }) => {
  const [dishes, setDishes] = useState([]);
  let userType = localStorage.getItem("type");
  useEffect(() => {
    axios.get(`/api/dishes/restaurant/${restaurantId}`)
      .then(response => setDishes(response.data))
      .catch(error => console.error(error));
  }, [restaurantId]);
  console.log(dishes, ' dishes')
  return (
    <div className={`${userType === "customer" ? 'w-2/3' : 'w-full'}`}>
      <h2 className="text-xl font-bold">Menu</h2>
      <div className={`grid grid-cols-1 md:grid-cols-${userType === "customer" ? 3 : 4} lg:grid-cols-${userType === "customer" ? 3 : 4} xl:grid-cols-${userType === "customer" ? 3 : 4} gap-4`}>
        {dishes.map(dish => (
          <div key={dish.id} className="py-2 border-b shadow-md">
              <img class="w-full h-64 object-cover rounded" src={dish.image} alt={dish.name}/>
              <div className='p-2'>
              <h3 className="text-xl font-semibold">{dish.name}</h3>
              <p>{dish.description}</p>
              <p className="text-gray-600">Price: ₹{dish.price}</p>
              {userType === "customer" && <button onClick={()=>onAddToBasket(dish)} className="mt-2 bg-green-600 text-white px-2 py-1 rounded">Add to Basket</button>}
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
