const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true, default: 'default-restaurant.jpg' },
    location: { type: String, required: true }, // Simplified location
    timings: {
      openingTime: { type: String,  default: "11 : 00 AM"}, // e.g., "9:00 AM"
      closingTime: { type: String,  default: "11 : 00 PM"}, // e.g., "10:00 PM"
    },
    rating: { type: Number, min: 0, max: 5, default: 0 }, // Simplified rating
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // Automatically manages createdAt and updatedAt
);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;
