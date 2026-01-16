import type { Bus } from '../types/bus.type';
import { useState } from 'react';
import { TableStyle } from '../../../shared/common';
import { Modal, ConfirmPopup } from '../../../shared/ui';
import { BusRow } from './BusRow';

interface Props {
  buses: Bus[];
  onDelete: (id: number) => Promise<void> | void;
  onEdit?: (id: number) => void;
}

export function BusTable({ buses, onDelete, onEdit }: Props) {
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; bus: Bus | null }>({
    open: false,
    bus: null,
  });
  const [deleting, setDeleting] = useState(false);

  const handleDeleteClick = (bus: Bus) => {
    setDeleteConfirm({ open: true, bus });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.bus) return;
    setDeleting(true);
    try {
      await onDelete(deleteConfirm.bus.id);
      setDeleteConfirm({ open: false, bus: null });
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ open: false, bus: null });
  };

  return (
    <>
      <TableStyle>
        <thead>
          <tr>
            <th>ID</th>
            <th>Rendszám</th>
            <th>Modell</th>
            <th>Állapot</th>
            <th>Kapacitás</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {buses.map((b) => (
            <BusRow key={b.id} bus={b} onDelete={onDelete} onEdit={onEdit} onDeleteClick={handleDeleteClick} />
          ))}
        </tbody>
      </TableStyle>

      <Modal open={deleteConfirm.open} onClose={handleDeleteCancel}>
        <ConfirmPopup
          message={`Biztosan törlöd a ${deleteConfirm.bus?.plate} buszt?`}
          onCancel={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          loading={deleting}
          isAbsolutePosition={false}
        />
      </Modal>
    </>
  );
}

