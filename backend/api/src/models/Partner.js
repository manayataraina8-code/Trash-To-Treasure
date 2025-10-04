const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['upcycler', 'ngo', 'maker'], required: true },
  email: { type: String, required: true },
  phone: String,
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    address: String
  },
  acceptedCategories: [String],
  radius: { type: Number, default: 10 }, // km
  rating: { type: Number, default: 5 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Partner', partnerSchema);