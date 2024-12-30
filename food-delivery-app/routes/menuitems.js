// routes/menuitems.js
import express from 'express';
import MenuItem from '../models/MenuItem.js';
import Restaurant from '../models/Restaurant.js';

const router = express.Router();

// @route   GET /api/menuitems
// @desc    Get all menu items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find().populate('restaurant');
    res.status(200).json(menuItems);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching menu items', details: err.message });
  }
});

// @route   POST /api/menuitems
// @desc    Create a new menu item
// @access  Public
router.post('/', async (req, res) => {
  try {
    // Create the menu item
    const newMenuItem = new MenuItem(req.body);
    const savedMenuItem = await newMenuItem.save();

    // Update the restaurant's menuItems array
    await Restaurant.findByIdAndUpdate(
      req.body.restaurant,
      { $push: { menuItems: savedMenuItem._id } },
      { new: true }
    );

    res.status(201).json(savedMenuItem);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data', details: err.message });
  }
});

// @route   GET /api/menuitems/:id
// @desc    Get a menu item by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id).populate('restaurant');
    if (!menuItem) return res.status(404).json({ error: 'Menu item not found' });
    res.status(200).json(menuItem);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// @route   PUT /api/menuitems/:id
// @desc    Update a menu item by ID
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('restaurant');
    
    if (!updatedMenuItem) return res.status(404).json({ error: 'Menu item not found' });
    res.status(200).json(updatedMenuItem);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data', details: err.message });
  }
});

// @route   DELETE /api/menuitems/:id
// @desc    Delete a menu item by ID
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) return res.status(404).json({ error: 'Menu item not found' });

    // Remove the menu item from the restaurant's menuItems array
    await Restaurant.findByIdAndUpdate(
      menuItem.restaurant,
      { $pull: { menuItems: req.params.id } }
    );

    // Delete the menu item
    await MenuItem.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// @route   GET /api/menuitems/restaurant/:restaurantId
// @desc    Get all menu items for a specific restaurant
// @access  Public
router.get('/restaurant/:restaurantId', async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ restaurant: req.params.restaurantId });
    res.status(200).json(menuItems);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

export default router;