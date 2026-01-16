import type { CSSProperties } from 'react';

export type ConfirmPopupProps = {
    message?: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
    loading?: boolean;
    style?: CSSProperties;
};

