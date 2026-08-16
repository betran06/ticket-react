import apiClient from './client';

export const getTicketsApi = async (params = {}) => {
  const response = await apiClient.get('/ticket', { params });
  return response.data;
};

export const getTicketDetailApi = async (code) => {
  const response = await apiClient.get(`/ticket/${code}`);
  return response.data;
};

export const createTicketApi = async (ticketData) => {
  const response = await apiClient.post('/ticket', ticketData);
  return response.data;
};

export const replyTicketApi = async (code, replyData) => {
  const response = await apiClient.post(`/ticket-reply/${code}`, replyData);
  return response.data;
};
