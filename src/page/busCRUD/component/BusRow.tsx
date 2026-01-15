import { Link } from 'react-router-dom';
import type { Bus } from '../types/bus.type';
import { useState } from 'react';
import { ConfirmPopup } from '../../../component/ui/ConfirmPopup/ConfirmPopup';

interface Props {
  bus: Bus;
  onDelete: (id: number) => void;
}

export function BusRow({ bus, onDelete }: Props) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(bus.id);
    } finally {
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <tr>
        <td>{bus.id}</td>
        <td>{bus.plate}</td>
        <td>{bus.model}</td>
        <td>{bus.status}</td>
        <td>{bus.capacity}</td>
        <td>
          <Link to={`./${bus.id}`}>Megtekint</Link>
          {' | '}
          <Link to={`./${bus.id}/edit`}>Szerkeszt</Link>
          {' | '}
          <button onClick={() => setShowConfirm(true)}>Töröl</button>
        </td>
      </tr>
      {showConfirm && (
        <tr>
          <td colSpan={6}>
            <ConfirmPopup
              message={`Biztosan törlöd a ${bus.plate} buszt?`}
              onCancel={() => setShowConfirm(false)}
              onConfirm={handleDelete}
              loading={deleting}
            />
          </td>
        </tr>
      )}
    </>
  );
}
