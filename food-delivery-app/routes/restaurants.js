// routes/restaurants.js
const express = require('express');
const Restaurant = require('../models/Restaurant');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ msg: 'Restaurant not found' });
    res.json(restaurant);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
