import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [type, setType] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const usertype = localStorage.getItem("type");

    if (token && usertype) {
      setLogin(true);
      setType(usertype);
    } else {
      setLogin(false);
      setType("");
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setLogin(false); // Update state
    setType(""); // Update state
    navigate("/");
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">FoodDash</Link>
        </h1>
        {login ? (
          <nav className="space-x-4">
            {type === "customer" ? (
              <Link to="/profile-customer" className="hover:underline">Profile</Link>
            ) : (
              <Link to="/profile-restaurant" className="hover:underline">Profile</Link>
            )}
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          </nav>
        ) : (
          <nav className="space-x-4">
            <Link to="/login-customer" className="hover:underline">Login as Customer</Link>
            <Link to="/login-restaurant" className="hover:underline">Login as Restaurant</Link>
            <Link to="/register-customer" className="hover:underline">Register Customer</Link>
            <Link to="/register-restaurant" className="hover:underline">Register Restaurant</Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
