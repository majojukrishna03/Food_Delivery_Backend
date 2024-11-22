const Order = require('../models/orderModel'); 
const MenuItem = require('../models/menuItemModel'); 

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { userId, restaurantId, items } = req.body;

    let totalAmount = 0;
    const updatedItems = [];

    // Calculate itemAmount for each item and totalAmount
    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItemId);

      if (!menuItem) {
        return res.status(404).json({ message: `MenuItem with ID ${item.menuItemId} not found` });
      }

      const itemAmount = menuItem.price * item.quantity;
      totalAmount += itemAmount;

      updatedItems.push({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        itemAmount,
      });
    }

    const newOrder = new Order({
      userId,
      restaurantId,
      items: updatedItems,
      totalAmount,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({
      message: 'Order created successfully',
      order: savedOrder,
    });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ message: 'Error creating order', error: err.message });
  }
};

// Get an order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('userId', 'name email') // Populate user details
      .populate('restaurantId', 'name') // Populate restaurant name
      .populate('items.menuItemId', 'name price'); // Populate menu item details

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (err) {
    console.error('Error fetching order by ID:', err);
    res.status(500).json({ message: 'Error fetching order by ID', error: err.message });
  }
};

// Get all orders by a specific user
exports.getOrdersByUserId = async (req, res) => {
  try {
    const userOrders = await Order.find({ userId: req.params.userId })
      .populate('restaurantId', 'name') // Populate restaurant details
      .populate('items.menuItemId', 'name price'); // Populate menu item details

    if (userOrders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.status(200).json(userOrders);
  } catch (err) {
    console.error('Error fetching orders by user:', err);
    res.status(500).json({ message: 'Error fetching orders by user', error: err.message });
  }
};

// Get all orders by a specific restaurant
exports.getOrdersByRestaurantId = async (req, res) => {
  try {
    const restaurantOrders = await Order.find({ restaurantId: req.params.restaurantId })
      .populate('userId', 'name email') // Populate user details
      .populate('items.menuItemId', 'name price'); // Populate menu item details

    if (restaurantOrders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this restaurant' });
    }

    res.status(200).json(restaurantOrders);
  } catch (err) {
    console.error('Error fetching orders by restaurant:', err);
    res.status(500).json({ message: 'Error fetching orders by restaurant', error: err.message });
  }
};

// Update the status of an order
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      message: 'Order status updated successfully',
      order: updatedOrder,
    });
  } catch (err) {
    console.error('Error updating order status:', err);
    res.status(500).json({ message: 'Error updating order status', error: err.message });
  }
};

// Delete an order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error('Error deleting order:', err);
    res.status(500).json({ message: 'Error deleting order', error: err.message });
  }
};