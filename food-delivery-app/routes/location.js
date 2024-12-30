// routes/location.js
import express from 'express';
import Location from '../models/Location.js';

const router = express.Router();

// GET: List of locations with error handling
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find();
    if (!locations || locations.length === 0) {
      return res.status(404).json({ message: 'No locations found' });
    }
    res.json(locations);
  } catch (err) {
    console.error('Error in GET /locations:', err);
    res.status(500).json({ message: 'Error fetching locations', details: err.message });
  }
});

// POST: Create a new location
router.post('/', async (req, res) => {
  try {
    const newLocation = new Location(req.body);
    const savedLocation = await newLocation.save();
    res.status(201).json(savedLocation);
  } catch (err) {
    console.error('Error in POST /locations:', err);
    res.status(400).json({ message: 'Error creating location', details: err.message });
  }
});

// GET: Get location by ID
router.get('/:id', async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.json(location);
  } catch (err) {
    console.error('Error in GET /locations/:id:', err);
    res.status(500).json({ message: 'Error fetching location', details: err.message });
  }
});

export default router;