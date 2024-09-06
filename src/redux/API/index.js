import axios from 'axios';

// Create an Axios instance with default configuration
export const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND, // Ensure this environment variable is set
  headers: {
    'Content-Type': 'application/json',
    'x-api-version': '1.0.0',
  },
});

// Function to set the Authorization header for authenticated requests
export const setAuthenticate = (token) => {
  API.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};

// Example API call
export const login = (body) => API.post('/login', body);
