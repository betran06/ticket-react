import useSWR from 'swr';
import { getDashboardStatisticsApi } from '../api/dashboard';

export function useDashboard() {
  const { data, error, isLoading, mutate } = useSWR(
    '/dashboard/statistics',
    getDashboardStatisticsApi,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  return {
    dashboardData: data?.data,
    isLoading,
    isError: error,
    mutate,
  };
}
