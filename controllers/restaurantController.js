const Restaurant = require('../models/restaurantModel');  

// Create a new restaurant
exports.createRestaurant = async (req, res) => {
  try {
    const { name, description, image, location, rating, timings } = req.body;

    // Check if restaurant name already exists
    const existingRestaurant = await Restaurant.findOne({ name });
    if (existingRestaurant) {
      return res.status(400).json({ message: 'Restaurant with this name already exists' });
    }

    // Create a new restaurant instance with the provided data
    const newRestaurant = new Restaurant({
      name,
      description,
      image,
      location,
      rating,
      timings,
    });

    // Save the new restaurant to the database
    const savedRestaurant = await newRestaurant.save();

    // Send a success response
    res.status(201).json({
      message: 'Restaurant created successfully',
      restaurant: savedRestaurant,
    });
  } catch (err) {
    console.error('Error creating restaurant:', err);
    res.status(500).json({ message: 'Error creating restaurant', error: err.message });
  }
};

// Get all restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (err) {
    console.error('Error fetching restaurants:', err);
    res.status(500).json({ message: 'Error fetching restaurants', error: err.message });
  }
};

// Get a single restaurant by ID
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json(restaurant);
  } catch (err) {
    console.error('Error fetching restaurant:', err);
    res.status(500).json({ message: 'Error fetching restaurant', error: err.message });
  }
};

// Update a restaurant by ID
exports.updateRestaurant = async (req, res) => {
  try {
    const { name, description, image, location, rating, timings } = req.body;

    // Check if restaurant exists
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Update restaurant fields
    restaurant.name = name || restaurant.name;
    restaurant.description = description || restaurant.description;
    restaurant.image = image || restaurant.image;
    restaurant.location = location || restaurant.location;
    restaurant.rating = rating || restaurant.rating;
    restaurant.timings = timings || restaurant.timings;

    const updatedRestaurant = await restaurant.save();
    res.status(200).json({
      message: 'Restaurant updated successfully',
      restaurant: updatedRestaurant,
    });
  } catch (err) {
    console.error('Error updating restaurant:', err);
    res.status(500).json({ message: 'Error updating restaurant', error: err.message });
  }
};

// Delete a restaurant by ID
exports.deleteRestaurant = async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deletedRestaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json({ message: 'Restaurant deleted successfully' });
  } catch (err) {
    console.error('Error deleting restaurant:', err);
    res.status(500).json({ message: 'Error deleting restaurant', error: err.message });
  }
};
