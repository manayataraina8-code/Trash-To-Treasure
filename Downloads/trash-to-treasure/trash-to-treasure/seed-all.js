const mongoose = require('mongoose');
const { seedUsers } = require('./database/seeds/users');
const { seedPartners } = require('./database/seeds/partners');

async function seedAll() {
  try {
    console.log('🌱 Starting database seeding...');
    
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/trash-to-treasure');
    console.log('📡 Connected to MongoDB');
    
    // Seed users
    console.log('\n👥 Seeding users...');
    await seedUsers();
    
    // Seed partners  
    console.log('\n🤝 Seeding partners...');
    await seedPartners();
    
    console.log('\n✅ All data seeded successfully!');
    console.log('\n🔐 Login Credentials Available:');
    console.log('   john.doe@example.com | password123');
    console.log('   jane.smith@example.com | password123');
    console.log('   mike.wilson@example.com | password123');
    console.log('   sarah.johnson@example.com | password123');
    console.log('   admin@trashtotreasure.com | admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedAll();