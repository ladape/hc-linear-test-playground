import { busesAxiosClient } from '../../../config/axios.config';
import type { Bus } from '../types/bus.type';

const BASE = '/buses';

export const BusesApi = {
  getBuses: async (): Promise<Bus[]> => {
    const { data } = await busesAxiosClient.get<Bus[]>(BASE);
    return data;
  },
  getBus: async (id: number): Promise<Bus> => {
    const { data } = await busesAxiosClient.get<Bus>(`${BASE}/${id}`);
    return data;
  },
  createBus: async (payload: Omit<Bus, 'id'>): Promise<Bus> => {
    const { data } = await busesAxiosClient.post<Bus>(BASE, payload);
    return data;
  },
  updateBus: async (id: number, payload: Partial<Omit<Bus, 'id'>>): Promise<Bus> => {
    const { data } = await busesAxiosClient.patch<Bus>(`${BASE}/${id}`, payload);
    return data;
  },
  deleteBus: async (id: number): Promise<void> => {
    await busesAxiosClient.delete(`${BASE}/${id}`);
  },
};
