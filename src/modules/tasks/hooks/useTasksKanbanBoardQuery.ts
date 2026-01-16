import { useQuery } from '@tanstack/react-query';
import {BoardApi} from "../api/tasks.api.ts";

export const BOARD_QUERY_KEY = ['board'];

export function useBoardQuery() {
    return useQuery({
        queryKey: BOARD_QUERY_KEY,
        queryFn: BoardApi.getTasks,
    });
}

