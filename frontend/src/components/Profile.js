// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  
  const [profile, setProfile] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    let customer = JSON.parse(localStorage.getItem('customer'));
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/customers/${customer?.id}`) // replace with actual customer ID
      .then(response => setProfile(response.data))
      .catch(error => console.error(error));

    axios.get(`${process.env.REACT_APP_API_BASE_URL}/orders/customer/${customer?.id}`) // replace with actual customer ID
      .then(response => setOrderHistory(response?.data?.sort((a, b) => new Date(b.order_date) - new Date(a.order_date))))
      .catch(error => console.error(error));
  }, []);

  function formatDateToIST(dateString) {
    // Create a Date object from the ISO string
    const date = new Date(dateString);
  
    // Options for formatting
    const options = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,             // Use 12-hour format
      timeZone: 'Asia/Kolkata', // IST timezone
    };
  
    // Format the date
    const formatter = new Intl.DateTimeFormat('en-GB', options);
    const formattedDate = formatter.format(date);
  
    // Extract date and time
    const [day, month, year, time, ampm] = formattedDate.split(' ');
  
    // Convert AM/PM to uppercase
    const formattedAmpm = ampm.toUpperCase();
  
    return `${day} ${month} ${year} at ${time} ${formattedAmpm}`;
  }

  

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
      <h3 className="text-lg font-semibold mt-4 mb-2">Order History</h3>
      {orderHistory?.length > 0 ?
      <ul className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4'>
        {orderHistory.map(order => (
          <li key={order.id} className="p-2 border-2 rounded order flex justify-start items-start gap-4 shadow-md">
            <img class="w-32 h-56 object-cover rounded" src={order.dish_image} alt={order.dish_name}/>
            <div>
            <p><strong>Order ID: </strong> {order.id}</p>
            <p><strong>Order Dish: </strong> {order.dish_name}</p>
            <p><strong>Quantity: </strong> {order.quantity}</p>
            <p><strong>Status: </strong><span className={` capitalize ${order.status === "pending" ? "text-[#b5b513]" : "text-[#2f912f]"}`}>{order.status}</span></p>
            <p><strong>TotalPrice: </strong> ₹{order.total_price}</p>
            <p><strong>Restaurant: </strong> {order.restaurant_name}</p>
            <p><strong>Address: </strong> {order.restaurant_address}</p>
            <p><strong>Date: </strong> {formatDateToIST(order.order_date)}</p>
            </div>
          </li>
        ))}
      </ul>
      :
        <div>No Order Found</div>
      }
    </div>
  );
};

export default Profile;
