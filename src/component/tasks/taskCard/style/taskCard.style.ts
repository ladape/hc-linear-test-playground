import type { CSSProperties } from 'react';

export const cardStyle: CSSProperties = {
  padding: 8,
  background: '#fff',
  marginBottom: 8,
  borderRadius: 6,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  position: 'relative',
};

export const dragHandleStyle: CSSProperties = {
  cursor: 'grab',
  padding: '4px 6px',
  borderRadius: 4,
  background: '#f4f6f8',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const titleStyle: CSSProperties = {
  flex: 1,
  wordBreak: 'break-word',
};

export const deleteButtonStyle: CSSProperties = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontSize: 16,
  padding: '4px 6px',
  color: '#c0392b',
};

