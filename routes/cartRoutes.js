const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');


router.post('/add', cartController.addToCart);  // Add item to cart
router.delete('/remove', cartController.removeFromCart);  // Remove item from cart
router.put('/update', cartController.updateQuantity);  // Update item quantity in cart
router.get('/:userId', cartController.getCartByUserId);  // Get cart items by user id
router.delete('/clear', cartController.clearCart);  // Delete cart by user id

module.exports = router;
