import {
    DndContext,
    type DragEndEvent,
    DragOverlay,
    type DragStartEvent,
} from '@dnd-kit/core';
import { useState } from 'react';
import {TaskColumn} from "../../component/tasks/taskColumn/TaskColumn.tsx";
import type {Task, TaskStatus} from "../../types/task.type.ts";
import { useBoardQuery } from '../../hooks/useTasksKanbanBoardQuery.ts';
import { useBoardMutations } from '../../hooks/useTasksKanbanBoardMutations.ts';
import { Page, Card, Title, Header } from '../busCRUD/style/bus.style.ts';
import { Box, TextField, Button } from '@mui/material';

// todo source out
const COLUMNS: { id: TaskStatus; title: string }[] = [
    { id: 'todo', title: 'Teendő' },
    { id: 'in_progress', title: 'Folyamatban' },
    { id: 'done', title: 'Kész' },
];
export function KanbanBoard() {
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

    const handleDelete = async (id: number) => {
        try {
            await deleteTask.mutateAsync(id);
        } catch (error) {
            console.error('Failed to delete task', error);
        }
    };

    const activeTask = activeId != null ? (tasks as Task[]).find((t) => t.id === activeId) : null;

    const previewStyle: React.CSSProperties = {
        padding: 8,
        background: '#fff',
        borderRadius: 6,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
        width: 230,
        zIndex: 9999,
    };

    return (
        <Page>
            <Header>
                <Title variant="h4">Feladatok</Title>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <TextField
                        size="small"
                        placeholder="Új feladat címe"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={handleAddTask}>Hozzáadás</Button>
                </Box>
            </Header>

            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
              <Card>
                <div style={{ display: 'flex', gap: 16 }}>
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
                      <div style={previewStyle}>
                          <div style={{ cursor: 'grab', padding: '4px 6px', borderRadius: 4, background: '#f4f6f8' }}>⠿</div>
                          <div style={{ flex: 1 }}>{activeTask.title}</div>
                      </div>
                  ) : null}
              </DragOverlay>
            </DndContext>
        </Page>
    );
}
