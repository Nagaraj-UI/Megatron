const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: String,
  customerEmail: String, // Link orders to user
  items: [{ itemId: String, name: String, price: Number, quantity: Number }],
  total: Number,
  status: { 
    type: String, 
    default: 'pending',
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled']
  },
  trackingNumber: String,
  estimatedDelivery: Date,
  actualDelivery: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
