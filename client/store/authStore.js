// client/store/authStore.js
import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import api from '../utils/api';

const useAuthStore = create((set) => ({
  user:      null,
  isLoading: true,
  error:     null,

  // Restore session when app opens
  restoreSession: async () => {
    try {
      const token    = await SecureStore.getItemAsync('accessToken');
      const userData = await SecureStore.getItemAsync('user');
      if (token && userData) {
        set({ user: JSON.parse(userData), isLoading: false });
      } else {
        set({ user: null, isLoading: false });
      }
    } catch {
      set({ user: null, isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post('/auth/login', { email, password });
      await SecureStore.setItemAsync('accessToken',  data.access);
      await SecureStore.setItemAsync('refreshToken', data.refresh);
      await SecureStore.setItemAsync('user',         JSON.stringify(data.user));
      set({ user: data.user, isLoading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Login failed', isLoading: false });
      throw err;
    }
  },

  register: async (name, email, password, phone) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post('/auth/register', { name, email, password, phone });
      await SecureStore.setItemAsync('accessToken',  data.access);
      await SecureStore.setItemAsync('refreshToken', data.refresh);
      await SecureStore.setItemAsync('user',         JSON.stringify(data.user));
      set({ user: data.user, isLoading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Registration failed', isLoading: false });
      throw err;
    }
  },

  logout: async () => {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    await SecureStore.deleteItemAsync('user');
    set({ user: null });
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;