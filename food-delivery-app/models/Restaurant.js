// models/Restaurant.js
const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  specialOffer: Boolean
});

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cuisineType: String,
  menu: [MenuItemSchema]
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
