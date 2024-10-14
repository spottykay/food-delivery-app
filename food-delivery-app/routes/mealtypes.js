// routes/mealtypes.js
import express from 'express';
import Mealtype from '../models/Mealtypes.js'; // Ensure the path is correct
const router = express.Router();

// Route to fetch all meal types
router.get('/', async (req, res) => {
  try {
    const mealtypes = await Mealtype.find(); // Fetch all documents from the Mealtypes collection
    res.json(mealtypes); // Send the data as a JSON response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching meal types', error });
  }
});

export default router; // Export the router


