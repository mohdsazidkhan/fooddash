import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterRestaurantForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [operatingHours, setOperatingHours] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cuisine, setCuisine] = useState(''); // New state variable for select box

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/restaurants/register`, {
        name,
        email,
        password,
        address,
        operatingHours,
        cuisine
      });
      console.log(response, 'response');
      setSuccess('Restaurant registered successfully!');
      navigate('/login-restaurant');
      setName('');
      setAddress('');
      setOperatingHours('');
      setPassword('');
      setEmail('');
      setCuisine('');  // Reset cuisine
      setError('');
    } catch (error) {
      setError('Failed to register restaurant.');
      setSuccess('');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Register a New Restaurant</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">Restaurant Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="operatingHours">Operating Hours</label>
          <input
            type="text"
            id="operatingHours"
            value={operatingHours}
            onChange={(e) => setOperatingHours(e.target.value)}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="cuisine">Cuisine Type</label>
          <select
            id="cuisine"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            required
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Cuisine</option>
            <option value="Italian">Italian</option>
            <option value="Chinese">Chinese</option>
            <option value="Indian">Indian</option>
            <option value="Mexican">Mexican</option>
            <option value="Japanese">Japanese</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Register Restaurant
        </button>
      </form>
    </div>
  );
};

export default RegisterRestaurantForm;
