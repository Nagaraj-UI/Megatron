const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  badge: String,
  isFeatured: { type: Boolean, default: false },
  isOnSale: { type: Boolean, default: false },
  salePrice: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Item', itemSchema);
