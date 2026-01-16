import { useDroppable } from '@dnd-kit/core';
import {TaskCard} from "../taskCard/taskCard.tsx";
import type {Task} from "../../../types/task.type.ts";
import { columnContainerStyle, columnTitleStyle, tasksListStyle } from './style/taskColumn.style';

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
        <div ref={setNodeRef} style={columnContainerStyle}>
            <h3 style={columnTitleStyle}>{title}</h3>

            <div style={tasksListStyle}>
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
