const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  condition: { type: String, enum: ['excellent', 'good', 'fair', 'poor'] },
  description: String,
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    address: String
  },
  status: { 
    type: String, 
    enum: ['available', 'matched', 'picked_up', 'completed'], 
    default: 'available' 
  },
  estimatedValue: Number,
  matchedPartner: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner' }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);