const mongoose = require('mongoose');
const Partner = require('../../backend/api/src/models/Partner');

const punePartners = [
  {
    name: "EcoMakers Pune",
    type: "maker",
    email: "contact@ecomakers.pune",
    phone: "+91-9876543210",
    location: {
      lat: 18.5204,
      lng: 73.8567,
      address: "FC Road, Pune, Maharashtra"
    },
    acceptedCategories: ["electronics", "furniture", "kitchenware"],
    radius: 15,
    rating: 4.8,
    isActive: true
  },
  {
    name: "Pune Upcycle Center",
    type: "upcycler",
    email: "hello@puneupcycle.org",
    phone: "+91-9876543211",
    location: {
      lat: 18.5679,
      lng: 73.9143,
      address: "Koregaon Park, Pune, Maharashtra"
    },
    acceptedCategories: ["clothing", "furniture", "toys"],
    radius: 20,
    rating: 4.9,
    isActive: true
  },
  {
    name: "Green Pune NGO",
    type: "ngo",
    email: "info@greenpune.org",
    phone: "+91-9876543212",
    location: {
      lat: 18.4633,
      lng: 73.8674,
      address: "Katraj, Pune, Maharashtra"
    },
    acceptedCategories: ["books", "clothing", "toys", "electronics"],
    radius: 25,
    rating: 4.7,
    isActive: true
  },
  {
    name: "Pimpri Makers Hub",
    type: "maker",
    email: "create@pimprimakers.com",
    phone: "+91-9876543213",
    location: {
      lat: 18.6298,
      lng: 73.7997,
      address: "Pimpri-Chinchwad, Pune, Maharashtra"
    },
    acceptedCategories: ["furniture", "kitchenware", "electronics"],
    radius: 12,
    rating: 4.6,
    isActive: true
  },
  {
    name: "Hadapsar Community Center",
    type: "ngo",
    email: "support@hadapsarcenter.org",
    phone: "+91-9876543214",
    location: {
      lat: 18.5089,
      lng: 73.9260,
      address: "Hadapsar, Pune, Maharashtra"
    },
    acceptedCategories: ["books", "toys", "clothing"],
    radius: 18,
    rating: 4.5,
    isActive: true
  }
];

async function seedPunePartners() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/trash-to-treasure');
    
    await Partner.deleteMany({});
    await Partner.insertMany(punePartners);
    
    console.log('✅ Pune partners seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding partners:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  seedPunePartners();
}

module.exports = { punePartners, seedPunePartners };