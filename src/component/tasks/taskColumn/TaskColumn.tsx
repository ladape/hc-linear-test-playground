import { useDroppable } from '@dnd-kit/core';
import {TaskCard} from "../taskCard/taskCard.tsx";
import type {Task} from "../../../types/task.type.ts";


interface Props {
    id: string;
    title: string;
    tasks: Task[];
    onDelete: (id: number) => void;
    activeId?: number | null;
}

export function TaskColumn({ id, title, tasks, onDelete, activeId }: Props) {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            style={{
                flex: '1 1 45%',
                minWidth: 260,
                padding: 12,
                background: '#f4f4f4',
                borderRadius: 8,
                // make column a vertical flex container so header stays on top and list can scroll
                display: 'flex',
                flexDirection: 'column',
                // allow overflow visible so dragged elements aren't clipped by this container
                overflow: 'visible',
                // limit height so columns don't grow indefinitely; inner list will scroll
                maxHeight: '70vh',
            }}
        >
            <h3 style={{ margin: '0 0 8px 0' }}>{title}</h3>

            <div style={{
                // the actual scrolling area
                flex: 1,
                overflowY: 'auto',
                overflowX: 'visible',
                paddingRight: 4,
            }}>
                {tasks.map((task: Task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onDelete={onDelete}
                        activeId={activeId}
                    />
                ))}
             </div>
         </div>
     );
 }
