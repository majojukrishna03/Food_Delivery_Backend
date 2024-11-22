const express = require('express');
const router = express.Router();
const menuItemController = require('../controllers/menuItemController');

// Routes for menu items
router.post('/', menuItemController.createMenuItem); // Create a new menu item
router.get('/restaurant/:restaurantId', menuItemController.getMenuItemsByRestaurant); // Get menu items for a restaurant
router.put('/:id', menuItemController.updateMenuItem); // Update a menu item by ID
router.delete('/:id', menuItemController.deleteMenuItem); // Delete a menu item by ID

module.exports = router;
