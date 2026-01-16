import type { ReactNode } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabel?: string;
}

export function Modal({ open, onClose, children, ariaLabel = 'Modal dialog' }: Props) {
  if (!open) return null;

  return (
    <div
      role="presentation"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.45)',
        zIndex: 1000,
      }}
    >
      <div
        role="dialog"
        aria-label={ariaLabel}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--main-color)',
          padding: 20,
          minWidth: 360,
          maxWidth: '90%',
          boxSizing: 'border-box',
          borderRadius: 8,
          color: 'var(--text-color-dark)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;

