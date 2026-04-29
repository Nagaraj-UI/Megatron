const router = require('express').Router();
const Order = require('../models/Order');

// Create new order
router.post('/', async (req, res) => {
  try {
    const { customerName, customerEmail, items, total } = req.body;

    // Generate tracking number
    const trackingNumber = 'TRK' + Date.now() + Math.floor(Math.random() * 1000);
    
    // Calculate estimated delivery (3-5 business days)
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 4); // 4 days TAT

    const order = new Order({
      customerName,
      customerEmail,
      items,
      total,
      status: 'pending',
      trackingNumber,
      estimatedDelivery,
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error('POST /api/orders error:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// Get all orders (admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('GET /api/orders error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get orders by user email
router.get('/user/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ customerEmail: email }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('GET /api/orders/user/:email error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get single order by tracking number
router.get('/track/:trackingNumber', async (req, res) => {
  try {
    const { trackingNumber } = req.params;
    const order = await Order.findOne({ trackingNumber });
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
  } catch (err) {
    console.error('GET /api/orders/track/:trackingNumber error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Update order status (admin/system)
router.patch('/:orderId/status', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    order.updatedAt = new Date();

    // Set actual delivery date when delivered
    if (status === 'delivered' && !order.actualDelivery) {
      order.actualDelivery = new Date();
    }

    await order.save();
    res.json(order);
  } catch (err) {
    console.error('PATCH /api/orders/:orderId/status error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
