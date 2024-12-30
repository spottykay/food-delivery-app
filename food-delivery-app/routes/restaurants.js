import express from 'express';
import Restaurant from '../models/Restaurant.js';
import Location from '../models/Location.js';




const router = express.Router();

// @route   GET /api/restaurants
// @desc    Get all restaurants
// @access  Public
router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find()
      .populate("location") // populate the Restaurant.js location field with the corresponding document from the locations collection
      .populate("mealTypes") // Corrected to match the field name in the schema e.g mealTypes: [{ type: mongoose.Schema.Types.ObjectId, ref: "mealtypes", required: true }],
      .populate("menuItems"); // Corrected to match the field name in the schema
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).json({ message: "Error fetching restaurants", details: err.message });
  }
});

// @route   POST /api/restaurants
// @desc    Create a new restaurant
// @access  Public
router.post("/", async (req, res) => {
  try {
    const newRestaurant = new Restaurant(req.body);
    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (err) {
    res.status(400).json({ error: "Invalid data", details: err.message });
  }
});

// @route   GET /api/restaurants/:id
// @desc    Get a restaurant by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
      .populate("location")
      .populate("mealTypes")
      .populate("menuItems");
    if (!restaurant) return res.status(404).json({ error: "Restaurant not found" });
    res.status(200).json(restaurant);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// @route   PUT /api/restaurants/:id
// @desc    Update a restaurant by ID
// @access  Public
router.put("/:id", async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("location")
      .populate("mealTypes")
      .populate("menuItems");
    if (!updatedRestaurant) return res.status(404).json({ error: "Restaurant not found" });
    res.status(200).json(updatedRestaurant);
  } catch (err) {
    res.status(400).json({ error: "Invalid data", details: err.message });
  }
});

// @route   DELETE /api/restaurants/:id
// @desc    Delete a restaurant by ID
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deletedRestaurant) return res.status(404).json({ error: "Restaurant not found" });
    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Export router using ES Modules syntax
export default router;
