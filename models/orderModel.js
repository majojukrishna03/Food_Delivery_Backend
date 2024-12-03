const mongoose = require('mongoose');
const MenuItem = require('./menuItemModel'); 

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  items: [
    {
      menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
      quantity: { type: Number, required: true },
      itemAmount: { type: Number, required: true }, // Total price for the menu item
    },
  ],
  shippingAddress : {type:String,required: true},
  totalAmount: { type: Number, required: true }, // Total price for the entire order
  status: { type: String, enum: ['Confirmed', 'Delivered'], default: 'Confirmed' },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
