import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BusesApi } from '../api/buses.api';
import { BUSES_QUERY_KEY } from './useBusesQuery';
import { BUS_QUERY_KEY } from './useBusQuery';
import type { Bus } from '../types/bus.type';

export function useBusesMutations() {
  const queryClient = useQueryClient();

  const createBus = useMutation({
    mutationFn: (payload: Omit<Bus, 'id'>) => BusesApi.createBus(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BUSES_QUERY_KEY });
    },
  });

  const updateBus = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Partial<Omit<Bus, 'id'>> }) =>
      BusesApi.updateBus(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: BUSES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: BUS_QUERY_KEY(variables.id) });
    },
  });

  const deleteBus = useMutation({
    mutationFn: (id: number) => BusesApi.deleteBus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BUSES_QUERY_KEY });
    },
  });

  return { createBus, updateBus, deleteBus };
}

