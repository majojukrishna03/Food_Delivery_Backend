const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Menu item name is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    image: { type: String, required: true, default: 'default-menu-item.jpg' },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive value'],
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: [true, 'Restaurant ID is required'],
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
