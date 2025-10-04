import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const itemService = {
  classifyItem: (formData) => api.post('/items/classify', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getUserItems: () => api.get('/items/my-items'),
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