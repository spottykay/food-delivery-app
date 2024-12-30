import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the menu item (e.g., "Cheese Pizza")
  description: { type: String, required: true }, // Description of the item (e.g., "A delicious cheese pizza with extra cheese")
  price: { type: Number, required: true }, // Price of the menu item
  category: { type: String, required: true }, // Category of the dish (e.g., "Main Course", "Dessert")
  image: { type: String }, // Optional: URL or path to an image of the menu item
  ingredients: [{ type: String }], // Optional: List of ingredients (e.g., ["Cheese", "Tomato", "Dough"])
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'restaurants', required: true }, // Reference to the restaurant model
});

const MenuItem = mongoose.model('menuitems', MenuItemSchema); // Ensure the collection name is lowercase, as your database uses lowercase
export default MenuItem;
