const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process with failure
  }
};

// Basic route
app.get('/', async (req, res) => {
  try {
    res.send('Welcome to Inti Bhojanam Backend!');
  } catch (error) {
    res.status(500).json({ message: 'Error loading the backend', error: error.message });
  }
});

// Use routes
app.use('/api/users', userRoutes); // User routes
app.use('/api/users/auth', authRoutes);  // Authentication routes
app.use('/api/restaurants',restaurantRoutes) // Restaurant routes
app.use('/api/menu-items',menuItemRoutes)  // Menu item routes
app.use('/api/cart',cartRoutes)  // Cart routes
app.use('/api/orders',orderRoutes)  // Order routes
app.use('/api/payments',paymentRoutes) // Payment routes

// Graceful Shutdown
process.on('SIGINT', async () => {
  console.log('SIGINT received. Closing MongoDB connection...');
  await mongoose.disconnect();
  console.log('MongoDB connection closed');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Closing MongoDB connection...');
  await mongoose.disconnect();
  console.log('MongoDB connection closed');
  process.exit(0);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectDB();
});
