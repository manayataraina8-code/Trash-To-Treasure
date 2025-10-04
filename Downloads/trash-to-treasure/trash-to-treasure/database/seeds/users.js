const mongoose = require('mongoose');
const User = require('../../backend/api/src/models/User');

const sampleUsers = [
  {
    email: 'john.doe@example.com',
    password: 'password123',
    name: 'John Doe',
    location: {
      lat: 18.5204,
      lng: 73.8567,
      address: 'FC Road, Pune, Maharashtra'
    },
    tokens: 150,
    totalEarnings: 2500
  },
  {
    email: 'jane.smith@example.com',
    password: 'password123',
    name: 'Jane Smith',
    location: {
      lat: 19.0760,
      lng: 72.8777,
      address: 'Bandra, Mumbai, Maharashtra'
    },
    tokens: 200,
    totalEarnings: 3200
  },
  {
    email: 'mike.wilson@example.com',
    password: 'password123',
    name: 'Mike Wilson',
    location: {
      lat: 18.5679,
      lng: 73.9143,
      address: 'Koregaon Park, Pune, Maharashtra'
    },
    tokens: 75,
    totalEarnings: 1800
  },
  {
    email: 'sarah.johnson@example.com',
    password: 'password123',
    name: 'Sarah Johnson',
    location: {
      lat: 21.1458,
      lng: 79.0882,
      address: 'Sitabuldi, Nagpur, Maharashtra'
    },
    tokens: 300,
    totalEarnings: 4500
  },
  {
    email: 'admin@trashtotreasure.com',
    password: 'admin123',
    name: 'Admin User',
    location: {
      lat: 18.5204,
      lng: 73.8567,
      address: 'Pune, Maharashtra'
    },
    tokens: 1000,
    totalEarnings: 0
  }
];

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/trash-to-treasure');
    
    // Clear existing users
    await User.deleteMany({});
    
    // Insert sample users
    await User.insertMany(sampleUsers);
    
    console.log('✅ Users seeded successfully');
    console.log('📊 Sample Login Credentials:');
    sampleUsers.forEach(user => {
      console.log(`   Email: ${user.email} | Password: ${user.password}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  seedUsers();
}

module.exports = { sampleUsers, seedUsers };