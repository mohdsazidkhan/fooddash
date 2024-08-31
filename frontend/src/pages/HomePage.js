import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantCard from '../components/RestaurantCard';
import Header from '../components/Header';

const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    // Fetch restaurants from the backend API
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/restaurants`)
      .then(response => {
        setRestaurants(response.data);
        setFilteredRestaurants(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    // Filter restaurants based on search input
    const filtered = restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  }, [search, restaurants]);

  return (
    <div>
      <Header />
      <div className="p-4">
      <div className="container mx-auto">
        <div className='flex justify-between items-center'>
        <h1 className="text-2xl font-bold mb-4">Nearby Restaurants</h1>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or cuisine"
          className="py-2 px-4 border rounded mb-4 w-1/3"
        />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4  gap-4">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))
          ) : (
            <p>No restaurants found.</p>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
