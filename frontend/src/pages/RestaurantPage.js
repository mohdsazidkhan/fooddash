import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import RestaurantMenu from '../components/RestaurantMenu';
import OrderBasket from '../components/OrderBasket';
import Header from '../components/Header';

const RestaurantPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [basket, setBasket] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [note, setNote] = useState('');
  const customer = JSON.parse(localStorage.getItem("customer"));
  const userType = localStorage.getItem("type");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/restaurants/${id}`)
      .then(response => setRestaurant(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const addToBasket = (dish) => {
    setBasket(prevBasket => [...prevBasket, { ...dish, quantity: 1 }]);
  };

  const removeFromBasket = (dishId) => {
    setBasket(prevBasket => prevBasket.filter(item => item.id !== dishId));
  };

  const handleCheckout = async () => {
    const totalPrice = basket?.reduce((total, item) => total + item.price * item.quantity, 0);
    const orderPayload = {
      restaurantId: id,
      customerId: customer.id,
      paymentMethod,
      note,
      deliveryAddress: customer.address,
      totalPrice,
      items: basket?.map(item => ({
        dishId: item.id,
        quantity: item.quantity,
        price: item.price
      })),
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/orders`, orderPayload);
      console.log('Order placed successfully:', response.data);
      
      // Navigate to a confirmation page or reset the basket
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <>
      <Header/>
      
      <div className="p-4">
      <div className="container mx-auto">
        {restaurant && (
          <>
            <h1 className="text-2xl font-bold mb-4">{restaurant.name}</h1>
            <p className="mb-4">{restaurant.address}</p>
            <div className='flex flex-col md:flex-row justify-between items-start gap-6'>
            <RestaurantMenu restaurantId={id} onAddToBasket={addToBasket} />
            {userType === "customer" && <OrderBasket note={note} setNote={setNote} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} items={basket} onRemove={removeFromBasket} onCheckout={handleCheckout} />}
            </div>
          </>
        )}
      </div>
      </div>
    </>
  );
};

export default RestaurantPage;
