const MenuItem = require('../models/menuItemModel');

// Create a new menu item
exports.createMenuItem = async (req, res) => {
  try {
    const { name, description, image, price, restaurantId } = req.body;

    const newMenuItem = new MenuItem({
      name,
      description,
      image,
      price,
      restaurantId,
    });

    const savedMenuItem = await newMenuItem.save();

    res.status(201).json({
      message: 'Menu item created successfully',
      menuItem: savedMenuItem,
    });
  } catch (err) {
    console.error('Error creating menu item:', err);
    res.status(500).json({ message: 'Error creating menu item', error: err.message });
  }
};

// Get all menu items for a specific restaurant
exports.getMenuItemsByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const menuItems = await MenuItem.find({ restaurantId }).populate('restaurantId', 'name');

    if (!menuItems || menuItems.length === 0) {
      return res.status(404).json({ message: 'No menu items found for this restaurant' });
    }

    res.status(200).json(menuItems);
  } catch (err) {
    console.error('Error fetching menu items for restaurant:', err);
    res.status(500).json({ message: 'Error fetching menu items', error: err.message });
  }
};

// Update a menu item by ID
exports.updateMenuItem = async (req, res) => {
  try {
    const { name, description, image, price, restaurantId } = req.body;

    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { name, description, image, price, restaurantId },
      { new: true, runValidators: true }
    );

    if (!updatedMenuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.status(200).json({
      message: 'Menu item updated successfully',
      menuItem: updatedMenuItem,
    });
  } catch (err) {
    console.error('Error updating menu item:', err);
    res.status(500).json({ message: 'Error updating menu item', error: err.message });
  }
};

// Delete a menu item by ID
exports.deleteMenuItem = async (req, res) => {
  try {
    const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedMenuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (err) {
    console.error('Error deleting menu item:', err);
    res.status(500).json({ message: 'Error deleting menu item', error: err.message });
  }
};
