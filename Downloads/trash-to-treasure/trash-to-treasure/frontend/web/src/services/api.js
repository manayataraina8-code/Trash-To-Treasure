import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Mock registration for demo
export const authService = {
  register: async (userData) => {
    // Store user data locally for demo
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user exists
    if (users.find(u => u.email === userData.email)) {
      throw new Error('User already exists');
    }
    
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('token', 'demo-token-' + newUser.id);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    return { user: newUser, token: 'demo-token-' + newUser.id };
  },
  
  login: async (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    localStorage.setItem('token', 'demo-token-' + user.id);
    localStorage.setItem('user', JSON.stringify(user));
    
    return { user, token: 'demo-token-' + user.id };
  }
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const itemService = {
  getUserItems: () => api.get('/items/my-items'),
  classifyItem: (formData) => api.post('/items/classify', formData),
};

export const partnerService = {
  getNearbyPartners: (lat, lng, radius = 10) => 
    api.get(`/partners/nearby?lat=${lat}&lng=${lng}&radius=${radius}`),
};

export const pickupService = {
  schedulePickup: (itemId, partnerId) => 
    api.post('/pickups/schedule', { itemId, partnerId }),
  completePickup: (itemId) => 
    api.post('/pickups/complete', { itemId }),
};