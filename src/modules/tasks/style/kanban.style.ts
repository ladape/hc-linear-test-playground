import type { CSSProperties } from 'react';

export const columnsContainerStyle: CSSProperties = {
  display: 'flex',
  gap: 16,
  maxWidth: '815px'
};

export const dragPreviewStyle: CSSProperties = {
  padding: 10,
  background: 'var(--main-color-50)',
  borderRadius: 6,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
  width: 240,
  zIndex: 9999,
  color: 'var(--text-color-light)',
  fontWeight: 500,
  border: '2px solid var(--primary-color)',
};

export const dragHandleStyle: CSSProperties = {
  cursor: 'grab',
  padding: '6px 8px',
  borderRadius: 4,
  background: 'rgba(255,255,255,0.1)',
  color: 'var(--primary-color)',
  fontWeight: 700,
  fontSize: 12,
};

export const dragPreviewTitleStyle: CSSProperties = {
  flex: 1,
};

