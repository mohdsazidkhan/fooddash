const express = require('express');
const cors = require('cors');
const restaurantRoutes = require('./routes/restaurantRoutes');
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const dishRoutes = require('./routes/dishRoutes');
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/dishes', dishRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
