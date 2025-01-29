// src/lib/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000', // Your Nest.js backend URL
});

// Add JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});