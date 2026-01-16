import type { CSSProperties } from 'react';

export const cardStyle: CSSProperties = {
  padding: 10,
  background: 'var(--main-color-50)',
  marginBottom: 8,
  borderRadius: 6,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  position: 'relative',
  border: '1px solid rgba(255,255,255,0.08)',
  transition: 'all 0.2s ease',
};

export const getCardStyleWithTransform = (
  transform: string | undefined,
  isActive: boolean
): CSSProperties => ({
  ...cardStyle,
  transform,
  visibility: isActive ? 'hidden' : 'visible',
});

export const dragHandleStyle: CSSProperties = {
  cursor: 'grab',
  padding: '6px 8px',
  borderRadius: 4,
  background: 'rgba(255,255,255,0.1)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--primary-color)',
  fontWeight: 700,
  fontSize: 12,
};

export const titleStyle: CSSProperties = {
  flex: 1,
  wordBreak: 'break-word',
  color: 'var(--text-color-light)',
  fontSize: 14,
  fontWeight: 500,
};

export const deleteButtonStyle: CSSProperties = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontSize: 16,
  padding: '4px 6px',
  color: 'var(--cancel-delete-button-color)',
  transition: 'all 0.2s ease',
};

export const deleteButtonHoverStyle: CSSProperties = {
  opacity: 0.7,
  transform: 'scale(1.1)',
};

