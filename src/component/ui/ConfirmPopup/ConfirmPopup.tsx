import type { CSSProperties } from 'react';
import type {ConfirmPopupProps} from "../../../types/confirmPopupProps.type.ts";
import { containerStyleBase, confirmButtonStyle, cancelButtonStyle } from './style/confirmPopup.style';

export function ConfirmPopup({
  message = 'Biztosan törölni szeretnéd?',
  onConfirm,
  onCancel,
  confirmLabel = 'Törlés',
  cancelLabel = 'Mégsem',
  loading = false,
  style,
}: ConfirmPopupProps) {
  const containerStyle: CSSProperties = {
    ...containerStyleBase,
    ...(style || {}),
  };

  return (
    <div style={containerStyle} role="dialog" aria-modal="true">
      <div style={{ marginBottom: 8 }}>{message}</div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <button onClick={onCancel} style={cancelButtonStyle} disabled={loading}>
          {cancelLabel}
        </button>
        <button onClick={onConfirm} style={confirmButtonStyle} disabled={loading}>
          {loading ? `${confirmLabel}...` : confirmLabel}
        </button>
      </div>
    </div>
  );
}
