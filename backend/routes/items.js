const router = require('express').Router();
const Item = require('../models/Item');

// Get all items, optionally filter by search query
router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    const filter = q
      ? { $or: [{ name: new RegExp(q, 'i') }, { category: new RegExp(q, 'i') }] }
      : {};
    const items = await Item.find(filter);
    res.json(items);
  } catch (err) {
    console.error('GET /api/items error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get featured/trending items
router.get('/featured', async (req, res) => {
  try {
    const items = await Item.find({ isFeatured: true });
    res.json(items);
  } catch (err) {
    console.error('GET /api/items/featured error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get new arrivals (sorted by newest first)
router.get('/new-arrivals', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 }).limit(10);
    res.json(items);
  } catch (err) {
    console.error('GET /api/items/new-arrivals error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get sale items
router.get('/sale', async (req, res) => {
  try {
    const items = await Item.find({ isOnSale: true });
    res.json(items);
  } catch (err) {
    console.error('GET /api/items/sale error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
