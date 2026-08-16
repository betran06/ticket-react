import apiClient from './client';

export const getDashboardStatisticsApi = async () => {
  const response = await apiClient.get('/dashboard/statistics');
  return response.data;
};
