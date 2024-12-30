import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  address: {
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    zipCode: { type: String, required: true, trim: true }
  },
  location: { type: mongoose.Schema.Types.ObjectId, ref: "locations", required: true }, // Ensure "locations" matches model name
  contactNumber: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  cuisines: [{ type: String, required: true }],
  mealTypes: [{ type: mongoose.Schema.Types.ObjectId, ref: "mealtypes", required: true }],
  priceRange: { type: String, enum: ["$", "$$", "$$$"], required: true },
  timings: {
    opening: { type: String, required: true },
    closing: { type: String, required: true }
  },
  menuItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "menuitems" }], // Ensure "menuitems" matches model name
  isFeatured: { type: Boolean, default: false }
});

const Restaurant = mongoose.model("restaurants", restaurantSchema);

export default Restaurant;
