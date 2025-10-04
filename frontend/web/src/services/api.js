import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

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