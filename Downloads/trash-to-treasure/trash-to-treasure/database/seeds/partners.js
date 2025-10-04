const mongoose = require('mongoose');
const Partner = require('../../backend/api/src/models/Partner');

const samplePartners = [
  {
    name: "EcoMakers NYC",
    type: "maker",
    email: "contact@ecomakers.nyc",
    phone: "+1-555-0101",
    location: {
      lat: 40.7589,
      lng: -73.9851,
      address: "123 Green St, New York, NY"
    },
    acceptedCategories: ["electronics", "furniture", "kitchenware"],
    radius: 15,
    rating: 4.8,
    isActive: true
  },
  {
    name: "Upcycle Warriors",
    type: "upcycler",
    email: "hello@upcyclewarriors.org",
    phone: "+1-555-0102",
    location: {
      lat: 40.7505,
      lng: -73.9934,
      address: "456 Recycle Ave, New York, NY"
    },
    acceptedCategories: ["clothing", "furniture", "toys"],
    radius: 20,
    rating: 4.9,
    isActive: true
  },
  {
    name: "Green Future NGO",
    type: "ngo",
    email: "info@greenfuture.org",
    phone: "+1-555-0103",
    location: {
      lat: 40.7282,
      lng: -74.0776,
      address: "789 Sustainability Blvd, New York, NY"
    },
    acceptedCategories: ["books", "clothing", "toys", "electronics"],
    radius: 25,
    rating: 4.7,
    isActive: true
  },
  {
    name: "Artisan Collective",
    type: "maker",
    email: "create@artisancollective.com",
    phone: "+1-555-0104",
    location: {
      lat: 40.7614,
      lng: -73.9776,
      address: "321 Craft Lane, New York, NY"
    },
    acceptedCategories: ["furniture", "kitchenware", "electronics"],
    radius: 12,
    rating: 4.6,
    isActive: true
  },
  {
    name: "ReNew Community Center",
    type: "ngo",
    email: "support@renewcenter.org",
    phone: "+1-555-0105",
    location: {
      lat: 40.7831,
      lng: -73.9712,
      address: "654 Community Dr, New York, NY"
    },
    acceptedCategories: ["books", "toys", "clothing"],
    radius: 18,
    rating: 4.5,
    isActive: true
  }
];

async function seedPartners() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/trash-to-treasure');
    
    // Clear existing partners
    await Partner.deleteMany({});
    
    // Insert sample partners
    await Partner.insertMany(samplePartners);
    
    console.log('✅ Partners seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding partners:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  seedPartners();
}

module.exports = { samplePartners, seedPartners };