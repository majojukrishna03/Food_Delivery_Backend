const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Routes for orders
router.post('/', orderController.createOrder); // Create a new order
router.get('/:id', orderController.getOrderById); // Get a single order by ID
router.get('/user/:userId', orderController.getOrdersByUserId); // Get all orders by a specific user
router.get('/user/latest/:userId',orderController.getLatestOrderByUserId) // Get the latest order by a specified user
// router.get('/restaurant/:restaurantId', orderController.getOrdersByRestaurantId); // Get all orders by a specific restaurant
// router.put('/:id', orderController.updateOrderStatus); // Update the status of an order
// router.delete('/:id', orderController.deleteOrder); // Delete an order by ID

module.exports = router;
