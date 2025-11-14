import axios from 'axios';
import type { AuthResponse, SignupData, SigninData, User } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      
      const requestUrl: string = error.config?.url || '';
      const isAuthEndpoint = requestUrl.includes('/auth/signin') || requestUrl.includes('/auth/signup');

      if (!isAuthEndpoint) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        window.location.href = '/signin';
      }
    }
    return Promise.reject(error);
  }
);

export const authService = {
  signup: async (data: SignupData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/signup', data);
    return response.data;
  },

  signin: async (data: SigninData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/signin', data);
    return response.data;
  },

  getProfile: async (): Promise<{ message: string; user: User }> => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

export default api;
