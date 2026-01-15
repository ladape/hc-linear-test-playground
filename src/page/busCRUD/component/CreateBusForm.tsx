import { useState, useEffect } from 'react';
import type { Bus } from '../types/bus.type';
import { Modal } from '../../../component/ui/Modal/Modal';

interface Props {
  initial?: Partial<Omit<Bus, 'id'>>;
  onSubmit: (payload: Omit<Bus, 'id'>) => Promise<void> | void;
  onClose: () => void;
  open: boolean;
  submitLabel?: string;
  loading?: boolean;
}

export function CreateBusForm({ initial, onSubmit, onClose, open, submitLabel = 'Mentés', loading = false }: Props) {
  const [form, setForm] = useState({
    plate: '',
    model: '',
    status: 'operational',
    capacity: 0,
  });

  useEffect(() => {
    if (initial) {
        // todo fix for eslint rule
        // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm((prev) => ({
        plate: initial.plate ?? prev.plate,
        model: initial.model ?? prev.model,
        status: initial.status ?? prev.status,
        capacity: initial.capacity ?? prev.capacity,
      }));
    }
  }, [initial]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit({ plate: form.plate, model: form.model, status: form.status, capacity: form.capacity });
    onClose();
  };

  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose} ariaLabel={submitLabel}>
      <h3>{submitLabel}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rendszám</label>
          <input value={form.plate} onChange={(e) => setForm({ ...form, plate: e.target.value })} />
        </div>
        <div>
          <label>Modell</label>
          <input value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} />
        </div>
        <div>
          <label>Állapot</label>
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            <option value="operational">Operational</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        <div>
          <label>Kapacitás</label>
          <input
            type="number"
            value={form.capacity}
            onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })}
          />
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 }}>
          <button type="button" onClick={onClose}>Mégsem</button>
          <button type="submit" disabled={loading}>{loading ? 'Mentés...' : submitLabel}</button>
        </div>
      </form>
    </Modal>
  );
}
