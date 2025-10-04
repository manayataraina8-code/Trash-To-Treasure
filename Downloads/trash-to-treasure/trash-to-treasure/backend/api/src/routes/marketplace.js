const express = require('express');
const Item = require('../models/Item');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all marketplace items (excluding user's own items)
router.get('/marketplace', auth, async (req, res) => {
  try {
    const items = await Item.find({
      userId: { $ne: req.user.id },
      status: 'available'
    })
    .populate('userId', 'name email')
    .sort({ createdAt: -1 });
    
    const marketplaceItems = items.map(item => ({
      ...item.toObject(),
      sellerName: item.userId.name,
      sellerEmail: item.userId.email
    }));
    
    res.json(marketplaceItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Contact seller
router.post('/contact-seller', auth, async (req, res) => {
  try {
    const { itemId } = req.body;
    
    const item = await Item.findById(itemId).populate('userId', 'email');
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    // Log the contact attempt
    console.log(`User ${req.user.email} contacted seller ${item.userId.email} for item ${itemId}`);
    
    res.json({ message: 'Contact initiated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark item as sold
router.post('/mark-sold', auth, async (req, res) => {
  try {
    const { itemId, buyerEmail } = req.body;
    
    const item = await Item.findById(itemId);
    if (!item || item.userId.toString() !== req.user.id) {
      return res.status(404).json({ error: 'Item not found or unauthorized' });
    }
    
    item.status = 'sold';
    item.soldTo = buyerEmail;
    item.soldAt = new Date();
    await item.save();
    
    // Update seller earnings
    const seller = await User.findById(item.userId);
    seller.tokens += Math.floor(item.estimatedValue * 0.1);
    seller.totalEarnings += item.estimatedValue;
    await seller.save();
    
    res.json({ message: 'Item marked as sold', tokensEarned: Math.floor(item.estimatedValue * 0.1) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;