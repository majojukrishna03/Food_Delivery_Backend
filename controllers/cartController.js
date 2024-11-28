const Cart = require('../models/cartModel');  // Assuming you have a Cart model

// Add a menu item to the cart
exports.addToCart = async (req, res) => {
  try {
    // console.log(req.body);
    const { userId, items} = req.body;
    const menuItemId = items[0].menuItemId;
    const quantity = items[0].quantity;
    // console.log("hey found ",userId,menuItemId,quantity);

    // Check if the cart already exists for the user
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If cart doesn't exist, create a new one  
      cart = new Cart({
        userId,
        items: [
          {
            menuItemId,
            quantity,
          },
        ],
      });
    } else {
      // If cart exists, check if the item is already in the cart
      const itemIndex = cart.items.findIndex(
        (item) => item.menuItemId.toString() === menuItemId
      );

      if (itemIndex === -1) {
        // If item is not in cart, add it
        cart.items.push({ menuItemId, quantity });
      } else {
        // If item is in cart, update the quantity
        cart.items[itemIndex].quantity += quantity;
      }
    }

    // Save the updated cart
    const savedCart = await cart.save();

    res.status(200).json({
      message: 'Item added to cart successfully',
      cart: savedCart,
    });
  } catch (err) {
    console.error('Error adding item to cart:', err);
    res.status(500).json({
      message: 'Error adding item to cart',
      error: err.message,
    });
  }
};

// Update an existing cart
exports.updateCart = async (req, res) => {
  try {
    const { cartId } = req.body; // Extract cartId from the URL
    const { userId, items } = req.body; // Extract userId and updated items from the request body

    // Find the cart by cartId and userId for additional validation
    const cart = await Cart.findOne({ _id: cartId, userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found for the given user.",
      });
    }

    // Iterate through the items to update quantities or add new items
    items.forEach((newItem) => {
      const existingItemIndex = cart.items.findIndex(
        (item) => item.menuItemId.toString() === newItem.menuItemId
      );

      if (existingItemIndex === -1) {
        // Item doesn't exist in the cart, add it
        cart.items.push({
          menuItemId: newItem.menuItemId,
          quantity: newItem.quantity,
        });
      } else {
        // Item exists, update the quantity
        cart.items[existingItemIndex].quantity = newItem.quantity;
      }
    });

    // Save the updated cart
    const updatedCart = await cart.save();

    res.status(200).json({
      message: "Cart updated successfully.",
      cart: updatedCart,
    });
  } catch (err) {
    console.error("Error updating cart:", err);
    res.status(500).json({
      message: "Error updating cart.",
      error: err.message,
    });
  }
};


// Remove a menu item from the cart
exports.removeFromCart = async (req, res) => {
  try {
    const { userId, menuItemId } = req.body;

    // Find the cart by userId
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the index of the item in the cart
    const itemIndex = cart.items.findIndex(
      (item) => item.menuItemId.toString() === menuItemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);

    // Save the updated cart
    const updatedCart = await cart.save();

    res.status(200).json({
      message: 'Item removed from cart successfully',
      cart: updatedCart,
    });
  } catch (err) {
    console.error('Error removing item from cart:', err);
    res.status(500).json({
      message: 'Error removing item from cart',
      error: err.message,
    });
  }
};

// Update the quantity of an item in the cart
exports.updateQuantity = async (req, res) => {
  try {
    const { userId, menuItemId, quantity } = req.body;

    // Find the cart by userId
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the index of the item in the cart
    const itemIndex = cart.items.findIndex(
      (item) => item.menuItemId.toString() === menuItemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Update the quantity of the item
    cart.items[itemIndex].quantity = quantity;

    // Save the updated cart
    const updatedCart = await cart.save();

    res.status(200).json({
      message: 'Quantity updated successfully',
      cart: updatedCart,
    });
  } catch (err) {
    console.error('Error updating quantity in cart:', err);
    res.status(500).json({
      message: 'Error updating quantity in cart',
      error: err.message,
    });
  }
};

// Get all cart items by user ID
exports.getCartByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the cart by userId
    const cart = await Cart.findOne({ userId }).populate('items.menuItemId');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({
      message: 'Error fetching cart',
      error: err.message,
    });
  }
};

// Clear the cart after order placement
exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find and delete the cart for the user
    const deletedCart = await Cart.findOneAndDelete({ userId });

    if (!deletedCart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json({
      message: 'Cart cleared successfully',
    });
  } catch (err) {
    console.error('Error clearing cart:', err);
    res.status(500).json({
      message: 'Error clearing cart',
      error: err.message,
    });
  }
};
