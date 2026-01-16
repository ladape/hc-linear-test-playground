import { useMutation, useQueryClient } from '@tanstack/react-query';
import {BOARD_QUERY_KEY} from "./useTasksKanbanBoardQuery.ts";
import {BoardApi} from "../api/tasks.api.ts";
import type {TaskStatus} from "../types/task.type.ts";
import type { Task } from "../types/task.type.ts";


export function useBoardMutations() {
    const queryClient = useQueryClient();

    const createTask = useMutation({
        mutationFn: BoardApi.createTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: BOARD_QUERY_KEY });
        },
    });

    const updateTaskStatus = useMutation({
        mutationFn: (params: { taskId: number; status: TaskStatus }) =>
            BoardApi.updateTaskStatus(params),
        // optimistic update so UI updates immediately without local state
        onMutate: async (params: { taskId: number; status: TaskStatus }) => {
            await queryClient.cancelQueries({ queryKey: BOARD_QUERY_KEY });
            const previous = queryClient.getQueryData<Task[]>(BOARD_QUERY_KEY);
            queryClient.setQueryData<Task[] | undefined>(BOARD_QUERY_KEY, (old) => {
                if (!old) return old;
                return old.map((t) => (t.id === params.taskId ? { ...t, status: params.status } : t));
            });
            return { previous };
        },
        onError: (_err, _variables, context: any) => {
            if (context?.previous) {
                queryClient.setQueryData(BOARD_QUERY_KEY, context.previous);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: BOARD_QUERY_KEY });
        },
    });

    const deleteTask = useMutation({
        mutationFn: BoardApi.deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: BOARD_QUERY_KEY });
        },
    });

    return {
        createTask,
        updateTaskStatus,
        deleteTask,
    };
}

