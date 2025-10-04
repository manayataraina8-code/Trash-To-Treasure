const mongoose = require('mongoose');
const Partner = require('./src/models/Partner');

const maharashtraPartners = [
  // Pune Partners
  {
    name: "EcoMakers Pune",
    type: "maker",
    email: "contact@ecomakers.pune",
    phone: "+91-9876543210",
    location: { lat: 18.5204, lng: 73.8567, address: "FC Road, Pune, Maharashtra" },
    acceptedCategories: ["electronics", "furniture", "kitchenware"],
    radius: 15, rating: 4.8, isActive: true
  },
  {
    name: "Pune Upcycle Center",
    type: "upcycler", 
    email: "hello@puneupcycle.org",
    phone: "+91-9876543211",
    location: { lat: 18.5679, lng: 73.9143, address: "Koregaon Park, Pune, Maharashtra" },
    acceptedCategories: ["clothing", "furniture", "toys"],
    radius: 20, rating: 4.9, isActive: true
  },
  {
    name: "Green Pune NGO",
    type: "ngo",
    email: "info@greenpune.org", 
    phone: "+91-9876543212",
    location: { lat: 18.4633, lng: 73.8674, address: "Katraj, Pune, Maharashtra" },
    acceptedCategories: ["books", "clothing", "toys", "electronics"],
    radius: 25, rating: 4.7, isActive: true
  },
  
  // Mumbai Partners
  {
    name: "Mumbai Makers Hub",
    type: "maker",
    email: "create@mumbaimakers.com",
    phone: "+91-9876543220",
    location: { lat: 19.0760, lng: 72.8777, address: "Bandra, Mumbai, Maharashtra" },
    acceptedCategories: ["electronics", "furniture", "kitchenware"],
    radius: 30, rating: 4.6, isActive: true
  },
  {
    name: "Recycle Mumbai NGO",
    type: "ngo",
    email: "support@recyclemumbai.org",
    phone: "+91-9876543221",
    location: { lat: 19.0176, lng: 72.8562, address: "Andheri, Mumbai, Maharashtra" },
    acceptedCategories: ["books", "clothing", "toys"],
    radius: 25, rating: 4.5, isActive: true
  },
  {
    name: "Upcycle Worli",
    type: "upcycler",
    email: "hello@upcycleworli.com",
    phone: "+91-9876543222",
    location: { lat: 19.0144, lng: 72.8181, address: "Worli, Mumbai, Maharashtra" },
    acceptedCategories: ["furniture", "clothing", "electronics"],
    radius: 20, rating: 4.8, isActive: true
  },
  
  // Nashik Partners
  {
    name: "Nashik Green Initiative",
    type: "ngo",
    email: "info@nashikgreen.org",
    phone: "+91-9876543230",
    location: { lat: 19.9975, lng: 73.7898, address: "College Road, Nashik, Maharashtra" },
    acceptedCategories: ["books", "toys", "clothing"],
    radius: 15, rating: 4.4, isActive: true
  },
  {
    name: "Craft Makers Nashik",
    type: "maker",
    email: "craft@nashikmakers.com",
    phone: "+91-9876543231",
    location: { lat: 20.0063, lng: 73.7749, address: "Gangapur Road, Nashik, Maharashtra" },
    acceptedCategories: ["furniture", "kitchenware"],
    radius: 18, rating: 4.3, isActive: true
  },
  
  // Nagpur Partners
  {
    name: "Orange City Upcyclers",
    type: "upcycler",
    email: "hello@orangeupcycle.org",
    phone: "+91-9876543240",
    location: { lat: 21.1458, lng: 79.0882, address: "Sitabuldi, Nagpur, Maharashtra" },
    acceptedCategories: ["clothing", "toys", "books"],
    radius: 22, rating: 4.6, isActive: true
  },
  {
    name: "Nagpur Welfare NGO",
    type: "ngo",
    email: "welfare@nagpurngo.org",
    phone: "+91-9876543241",
    location: { lat: 21.1702, lng: 79.0950, address: "Dharampeth, Nagpur, Maharashtra" },
    acceptedCategories: ["books", "clothing", "electronics"],
    radius: 20, rating: 4.5, isActive: true
  },
  
  // Aurangabad Partners
  {
    name: "Heritage Makers Aurangabad",
    type: "maker",
    email: "heritage@aurangabadmakers.com",
    phone: "+91-9876543250",
    location: { lat: 19.8762, lng: 75.3433, address: "Cantonment, Aurangabad, Maharashtra" },
    acceptedCategories: ["furniture", "electronics", "kitchenware"],
    radius: 16, rating: 4.4, isActive: true
  },
  {
    name: "Aurangabad Community Care",
    type: "ngo",
    email: "care@aurangabadngo.org",
    phone: "+91-9876543251",
    location: { lat: 19.8957, lng: 75.3203, address: "Cidco, Aurangabad, Maharashtra" },
    acceptedCategories: ["books", "toys", "clothing"],
    radius: 18, rating: 4.3, isActive: true
  },
  
  // Kolhapur Partners
  {
    name: "Kolhapur Craft Collective",
    type: "upcycler",
    email: "craft@kolhapurcollective.org",
    phone: "+91-9876543260",
    location: { lat: 16.7050, lng: 74.2433, address: "Shivaji University Road, Kolhapur, Maharashtra" },
    acceptedCategories: ["furniture", "clothing", "toys"],
    radius: 14, rating: 4.7, isActive: true
  }
];

async function seedMaharashtraPartners() {
  try {
    await mongoose.connect('mongodb://localhost:27017/trash-to-treasure');
    await Partner.deleteMany({});
    await Partner.insertMany(maharashtraPartners);
    console.log('✅ Maharashtra partners seeded successfully');
    console.log(`📊 Total partners: ${maharashtraPartners.length}`);
    console.log(`🏢 NGOs: ${maharashtraPartners.filter(p => p.type === 'ngo').length}`);
    console.log(`♻️ Upcyclers: ${maharashtraPartners.filter(p => p.type === 'upcycler').length}`);
    console.log(`🔨 Makers: ${maharashtraPartners.filter(p => p.type === 'maker').length}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

seedMaharashtraPartners();