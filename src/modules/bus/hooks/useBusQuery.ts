import { useQuery } from '@tanstack/react-query';
import { BusesApi } from '../api/buses.api.ts';
import type { Bus } from '../types/bus.type';

export const BUS_QUERY_KEY = (id: number | string) => ['bus', id];

export function useBusQuery(id: number | string | undefined) {
  return useQuery<Bus>({
    queryKey: BUS_QUERY_KEY(id ?? 'unknown'),
    queryFn: () => BusesApi.getBus(Number(id)),
    enabled: !!id,
  });
}

