const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

// Routes for restaurants
router.post('/', restaurantController.createRestaurant); // Create a restaurant
router.get('/', restaurantController.getAllRestaurants); // Get all restaurants
router.get('/:id', restaurantController.getRestaurantById); // Get a single restaurant by ID
router.put('/:id', restaurantController.updateRestaurant); // Update a restaurant by ID
router.delete('/:id', restaurantController.deleteRestaurant); // Delete a restaurant by ID

module.exports = router;
