const express = require('express');
const Partner = require('../models/Partner');

const router = express.Router();

router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, radius = 10 } = req.query;
    
    const partners = await Partner.find({
      isActive: true,
      $expr: {
        $lte: [
          { $sqrt: {
            $add: [
              { $pow: [{ $subtract: ['$location.lat', parseFloat(lat)] }, 2] },
              { $pow: [{ $subtract: ['$location.lng', parseFloat(lng)] }, 2] }
            ]
          }},
          { $divide: [parseFloat(radius), 111] }
        ]
      }
    });
    
    res.json(partners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;