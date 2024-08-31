// src/components/AuthForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = ({ isSignup, onSuccess }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const authData = { email, password, name };

    const apiEndpoint = isSignup ? `${process.env.REACT_APP_API_BASE_URL}/restaurants/register` : `${process.env.REACT_APP_API_BASE_URL}/restaurants/login`;

    axios.post(apiEndpoint, authData)
      .then(response => {
        onSuccess(response.data);
      })
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md min-w-80">
      <h2 className="text-xl font-bold">{isSignup ? 'Sign Up' : 'Log In'}</h2>
      {isSignup && (
        <div className="mb-4">
          <label className="block mb-1">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      )}
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
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{isSignup ? 'Sign Up' : 'Log In'}</button>
    </form>
  );
};

export default AuthForm;
