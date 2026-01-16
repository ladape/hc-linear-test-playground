import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import type {Task} from "../types/task.type.ts";
import { ConfirmPopup } from '../../../shared/ui/ConfirmPopup/ConfirmPopup';
import {
  getCardStyleWithTransform,
  dragHandleStyle,
  titleStyle,
  deleteButtonStyle,
  deleteButtonHoverStyle
} from '../style/taskCard.style';

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
    const [deleteHover, setDeleteHover] = useState(false);

    const transformString = transform ? CSS.Translate.toString(transform) : undefined;
    const style = getCardStyleWithTransform(transformString, activeId === task.id);

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

    const deleteButtonCurrentStyle = deleteHover ? { ...deleteButtonStyle, ...deleteButtonHoverStyle } : deleteButtonStyle;

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
                style={deleteButtonCurrentStyle}
                title="Törlés"
                onMouseEnter={() => setDeleteHover(true)}
                onMouseLeave={() => setDeleteHover(false)}
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

