import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import type {Task} from "../../../types/task.type.ts";
import { ConfirmPopup } from '../../ui/ConfirmPopup/ConfirmPopup';
import { cardStyle, dragHandleStyle, titleStyle, deleteButtonStyle } from './style/taskCard.style';

interface Props {
    task: Task;
    onDelete: (id: number) => void;
    activeId?: number | null;
}

export function TaskCard({ task, onDelete, activeId }: Props) {
    const { attributes, listeners, setNodeRef, transform } =
        useDraggable({ id: task.id });

    const [showConfirm, setShowConfirm] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const style = {
        ...cardStyle,
        transform: transform ? CSS.Translate.toString(transform) : undefined,
        visibility: activeId === task.id ? 'hidden' : 'visible',
    } as const;

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await onDelete(task.id);
            setShowConfirm(false);
        } catch (error) {
            console.error('Failed to delete task', error);
            setShowConfirm(false);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div ref={setNodeRef} style={style}>
            <span
              {...listeners}
              {...attributes}
              style={dragHandleStyle}
              aria-label="drag-handle"
            >⠿</span>

            <div style={titleStyle}>{task.title}</div>

            <button
                aria-label="delete-task"
                onClick={() => setShowConfirm((s) => !s)}
                style={deleteButtonStyle}
                title="Törlés"
            >
                🗑
            </button>

            {showConfirm && (
                <ConfirmPopup
                    message="Biztosan törölni szeretnéd?"
                    onCancel={() => setShowConfirm(false)}
                    onConfirm={handleDelete}
                    loading={deleting}
                />
            )}
        </div>
    );
}
