const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process with failure
  }
};

// Define a basic route
app.get('/', async (req, res) => {
  try {
    res.send('Welcome to Inti Bhojanam Backend!');
  } catch (error) {
    res.status(500).json({ message: 'Error loading the backend', error: error.message });
  }
});

// Use routes
app.use('/api/users', userRoutes);

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
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
