const express = require('express');
const Item = require('../models/Item');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/schedule', auth, async (req, res) => {
  try {
    const { itemId, partnerId } = req.body;
    
    const item = await Item.findById(itemId);
    if (!item || item.userId.toString() !== req.user.id) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    item.matchedPartner = partnerId;
    item.status = 'matched';
    await item.save();
    
    res.json({ message: 'Pickup scheduled', item });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/complete', auth, async (req, res) => {
  try {
    const { itemId } = req.body;
    
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    
    item.status = 'completed';
    await item.save();
    
    // Award tokens to user
    const user = await User.findById(item.userId);
    const tokens = Math.floor(item.estimatedValue * 0.1); // 10% of value as tokens
    user.tokens += tokens;
    user.totalEarnings += item.estimatedValue;
    await user.save();
    
    res.json({ message: 'Pickup completed', tokensEarned: tokens });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;