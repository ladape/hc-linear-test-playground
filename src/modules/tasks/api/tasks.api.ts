import {boardAxiosClient} from "../../../config/axios.config.ts";
import type {Task, TaskStatus} from "../types/task.type.ts";

const BASE_URL = '/tasks';

export const BoardApi = {
    getTasks: async (): Promise<Task[]> => {
        const { data } = await boardAxiosClient.get<Task[]>(BASE_URL);
        return data;
    },

    createTask: async (title: string): Promise<Task> => {
        const { data } = await boardAxiosClient.post<Task>(BASE_URL, {
            title,
            status: 'todo',
        });
        return data;
    },

    updateTaskStatus: async (params: {
        taskId: number;
        status: TaskStatus;
    }): Promise<Task> => {
        const { data } = await boardAxiosClient.patch<Task>(
            `${BASE_URL}/${params.taskId}`,
            { status: params.status }
        );
        return data;
    },

    deleteTask: async (taskId: number): Promise<void> => {
        await boardAxiosClient.delete(`${BASE_URL}/${taskId}`);
    },
};

