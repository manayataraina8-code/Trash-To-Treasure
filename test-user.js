const axios = require('axios');

async function createTestUser() {
  try {
    const response = await axios.post('http://localhost:4000/api/auth/register', {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      location: {
        lat: 18.5204,
        lng: 73.8567,
        address: 'Pune, Maharashtra, India'
      }
    });
    
    console.log('✅ Test user created successfully!');
    console.log('Email: test@example.com');
    console.log('Password: password123');
    console.log('Token:', response.data.token);
  } catch (error) {
    if (error.response?.status === 400) {
      console.log('ℹ️ Test user already exists');
      console.log('Email: test@example.com');
      console.log('Password: password123');
    } else {
      console.error('❌ Error:', error.message);
    }
  }
}

createTestUser();