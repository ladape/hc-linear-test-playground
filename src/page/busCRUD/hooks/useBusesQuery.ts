import { useQuery } from '@tanstack/react-query';
import { BusesApi } from '../api/buses.api.ts';
import type { Bus } from '../types/bus.type';

export const BUSES_QUERY_KEY = ['buses'];

export function useBusesQuery() {
  return useQuery<Bus[]>({
    queryKey: BUSES_QUERY_KEY,
    queryFn: BusesApi.getBuses,
  });
}
