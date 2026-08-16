import useSWR from 'swr';
import { getTicketsApi, getTicketDetailApi } from '../api/ticket';

const ticketsFetcher = async ([, params]) => {
  const res = await getTicketsApi(params);
  return res.data;
};

export function useTickets(params = {}) {
  const { data, error, isLoading, mutate } = useSWR(
    ['/api/ticket', params],
    ticketsFetcher
  );

  return {
    tickets: data || [],
    isLoading,
    error,
    mutate,
  };
}

const ticketDetailFetcher = async ([, code]) => {
  if (!code) return null;
  const res = await getTicketDetailApi(code);
  return res.data;
};

export function useTicketDetail(code) {
  const { data, error, isLoading, mutate } = useSWR(
    code ? ['/api/ticket/detail', code] : null,
    ticketDetailFetcher
  );

  return {
    ticket: data || null,
    isLoading,
    error,
    mutate,
  };
}
