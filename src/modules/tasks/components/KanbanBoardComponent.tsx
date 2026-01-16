import {
    DndContext,
    type DragEndEvent,
    DragOverlay,
    type DragStartEvent,
} from '@dnd-kit/core';
import { useState } from 'react';
import {TaskColumn} from "./TaskColumn.tsx";
import type {Task, TaskStatus} from "../types/task.type.ts";
import { useBoardQuery } from '../hooks/useTasksKanbanBoardQuery.ts';
import { useBoardMutations } from '../hooks/useTasksKanbanBoardMutations.ts';
import { Box } from '@mui/material';
import { Card, Input, Button } from '../../../shared/common';
import {
  columnsContainerStyle,
  dragPreviewStyle,
  dragHandleStyle,
  dragPreviewTitleStyle
} from '../style/kanban.style';

const COLUMNS: { id: TaskStatus; title: string }[] = [
    { id: 'todo', title: 'Teendő' },
    { id: 'in_progress', title: 'Folyamatban' },
    { id: 'done', title: 'Kész' },
];

export function KanbanBoardComponent() {
    const { data: tasks = [] } = useBoardQuery();
    const { createTask, updateTaskStatus, deleteTask } = useBoardMutations();

    const [newTitle, setNewTitle] = useState('');
    const [activeId, setActiveId] = useState<number | null>(null);

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setActiveId(active.id as number);
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) {
            setActiveId(null);
            return;
        }
        const taskId = active.id as number;
        const newStatus = over.id as TaskStatus;

        try {
            await updateTaskStatus.mutateAsync({ taskId, status: newStatus });
        } catch (error) {
            console.error('Failed to update task status', error);
        } finally {
            // only clear activeId after mutation finishes so the original element stays hidden
            setActiveId(null);
        }
    };
    const handleAddTask = async () => {
        if (!newTitle.trim()) return;
        try {
            await createTask.mutateAsync(newTitle);
            setNewTitle('');
        } catch (error) {
            console.error('Failed to create task', error);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteTask.mutateAsync(id);
        } catch (error) {
            console.error('Failed to delete task', error);
        }
    };

    const activeTask = activeId != null ? (tasks as Task[]).find((t) => t.id === activeId) : null;

    return (
        <>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', marginBottom: 2 }}>
                <Input
                    placeholder="Új feladat címe"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{ maxWidth: '300px' }}
                />
                <Button variant="contained" onClick={handleAddTask}>Hozzáadás</Button>
            </Box>

            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
              <Card>
                <div style={columnsContainerStyle}>
                    {COLUMNS.map((col) => (
                        <TaskColumn
                            key={col.id}
                            id={col.id}
                            title={col.title}
                            tasks={(tasks as Task[]).filter((t) => t.status === col.id)}
                            onDelete={(id) => handleDelete(id)}
                            activeId={activeId}
                        />
                    ))}
                </div>
              </Card>

              <DragOverlay dropAnimation={{ duration: 0 }}>
                  {activeTask ? (
                      <div style={dragPreviewStyle}>
                          <div style={dragHandleStyle}>⠿</div>
                          <div style={dragPreviewTitleStyle}>{activeTask.title}</div>
                      </div>
                  ) : null}
              </DragOverlay>
            </DndContext>
        </>
    );
}


