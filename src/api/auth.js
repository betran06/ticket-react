import apiClient from './client';

export const loginApi = async (credentials) => {
  const response = await apiClient.post('/login', credentials);
  return response.data;
};

export const registerApi = async (userData) => {
  const response = await apiClient.post('/register', userData);
  return response.data;
};

export const getMeApi = async () => {
  const response = await apiClient.get('/me');
  return response.data;
};

export const logoutApi = async () => {
  const response = await apiClient.post('/logout');
  return response.data;
};
