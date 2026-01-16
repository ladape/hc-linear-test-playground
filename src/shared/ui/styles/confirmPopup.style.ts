import type { CSSProperties } from 'react';

export const containerStyleBase: CSSProperties = {
  position: 'absolute',
  right: 8,
  top: '100%',
  marginTop: 8,
  background: 'var(--main-color)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 8,
  padding: 12,
  boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
  zIndex: 20,
  minWidth: 200,
};

export const popupButtonStyle: CSSProperties = {
  padding: '8px 12px',
  borderRadius: 6,
  border: 'none',
  cursor: 'pointer',
  fontWeight: 600,
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  transition: 'all 0.2s ease',
};

export const confirmButtonStyle: CSSProperties = {
  ...popupButtonStyle,
  background: 'var(--cancel-delete-button-color)',
  color: 'var(--text-color-light)',
};

export const cancelButtonStyle: CSSProperties = {
  ...popupButtonStyle,
  background: 'var(--secondary-color)',
  color: 'var(--text-color-light)',
  border: '1px solid rgba(255,255,255,0.2)',
};

export const messageStyle: CSSProperties = {
  marginBottom: 12,
  color: 'var(--text-color-light)',
  fontSize: 14,
  fontWeight: 500,
};

export const buttonsContainerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 8,
};

