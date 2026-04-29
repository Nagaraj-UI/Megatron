const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: String,
  items: [{ itemId: String, name: String, price: Number, quantity: Number }],
  total: Number,
  status: { type: String, default: 'completed' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
