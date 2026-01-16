import type { CSSProperties } from 'react';

export const columnContainerStyle: CSSProperties = {
  flex: '1 1 45%',
  minWidth: 260,
  padding: 12,
  background: 'var(--main-color)',
  borderRadius: 8,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'visible',
  maxHeight: '70vh',
  border: '1px solid rgba(255,255,255,0.1)',
};

export const columnTitleStyle: CSSProperties = {
  margin: '0 0 12px 0',
  color: 'var(--text-color-light)',
  fontWeight: 700,
  fontSize: 14,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  borderBottom: '2px solid var(--primary-color)',
  paddingBottom: 8,
};

export const tasksListStyle: CSSProperties = {
  flex: 1,
  overflowY: 'auto',
  overflowX: 'visible',
  paddingRight: 4,
};

