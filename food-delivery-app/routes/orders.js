// routes/orders.js
const express = require('express');
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { restaurantId, items } = req.body;
  try {
    const order = new Order({
      user: req.user.id,
      restaurant: restaurantId,
      items,
      totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    });
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/user', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('restaurant', 'name');
    res.json(orders);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
