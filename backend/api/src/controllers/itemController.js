const Item = require('../models/Item');
const Partner = require('../models/Partner');
const axios = require('axios');

const classifyItem = async (req, res) => {
  try {
    const location = JSON.parse(req.body.location || '{}');
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    
    if (!imageUrl) {
      return res.status(400).json({ error: 'No image uploaded' });
    }
    
    // Call ML service for classification
    const mlResponse = await axios.post('http://localhost:3001/classify', {
      imageUrl
    });
    
    const { category, condition, estimatedValue } = mlResponse.data;
    
    const item = new Item({
      userId: req.user.id,
      imageUrl,
      category,
      condition,
      estimatedValue,
      location
    });
    
    await item.save();
    
    // Find matching partners
    const partners = await Partner.find({
      acceptedCategories: category,
      isActive: true,
      $expr: {
        $lte: [
          { $sqrt: {
            $add: [
              { $pow: [{ $subtract: ['$location.lat', location.lat] }, 2] },
              { $pow: [{ $subtract: ['$location.lng', location.lng] }, 2] }
            ]
          }},
          { $divide: ['$radius', 111] } // Convert km to degrees
        ]
      }
    });
    
    res.json({ item, matchingPartners: partners });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserItems = async (req, res) => {
  try {
    const items = await Item.find({ userId: req.user.id })
      .populate('matchedPartner')
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { classifyItem, getUserItems };