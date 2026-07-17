// client/utils/api.js
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Replace with YOUR computer's local IP
const BASE_URL = 'http://192.168.1.12:5000/api';

const api = axios.create({ baseURL: BASE_URL });

// Attach JWT token to every request automatically
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;