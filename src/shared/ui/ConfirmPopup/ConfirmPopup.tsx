import type { CSSProperties } from 'react';
import { useState } from 'react';
import type {ConfirmPopupProps} from "../types/confirmPopupProps.type.ts";
import { containerStyleBase, confirmButtonStyle, cancelButtonStyle, messageStyle, buttonsContainerStyle } from '../styles/confirmPopup.style';

export function ConfirmPopup({
  message = 'Biztosan törölni szeretnéd?',
  onConfirm,
  onCancel,
  confirmLabel = 'Törlés',
  cancelLabel = 'Mégsem',
  loading = false,
  style,
}: ConfirmPopupProps) {
  const [confirmHover, setConfirmHover] = useState(false);
  const [cancelHover, setCancelHover] = useState(false);

  const containerStyle: CSSProperties = {
    ...containerStyleBase,
    ...(style || {}),
  };

  const confirmButtonCurrentStyle: CSSProperties = {
    ...confirmButtonStyle,
    opacity: confirmHover ? 0.9 : 1,
  };

  const cancelButtonCurrentStyle: CSSProperties = {
    ...cancelButtonStyle,
    backgroundColor: cancelHover ? 'var(--secondary-color-hover)' : 'var(--secondary-color)',
  };

  return (
    <div style={containerStyle} role="dialog" aria-modal="true">
      <div style={messageStyle}>{message}</div>
      <div style={buttonsContainerStyle}>
        <button
          onClick={onCancel}
          style={cancelButtonCurrentStyle}
          disabled={loading}
          onMouseEnter={() => setCancelHover(true)}
          onMouseLeave={() => setCancelHover(false)}
        >
          {cancelLabel}
        </button>
        <button
          onClick={onConfirm}
          style={confirmButtonCurrentStyle}
          disabled={loading}
          onMouseEnter={() => setConfirmHover(true)}
          onMouseLeave={() => setConfirmHover(false)}
        >
          {loading ? `${confirmLabel}...` : confirmLabel}
        </button>
      </div>
    </div>
  );
}

