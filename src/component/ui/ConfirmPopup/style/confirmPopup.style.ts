import type { CSSProperties } from 'react';

export const containerStyleBase: CSSProperties = {
  position: 'absolute',
  right: 8,
  top: '100%',
  marginTop: 8,
  background: '#fff',
  border: '1px solid rgba(0,0,0,0.08)',
  borderRadius: 6,
  padding: 8,
  boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
  zIndex: 20,
  minWidth: 180,
};

export const popupButtonStyle: CSSProperties = {
  padding: '6px 10px',
  borderRadius: 4,
  border: 'none',
  cursor: 'pointer',
};

export const confirmButtonStyle: CSSProperties = {
  ...popupButtonStyle,
  background: '#c0392b',
  color: '#fff',
};

export const cancelButtonStyle: CSSProperties = {
  ...popupButtonStyle,
  background: '#f4f6f8',
};
