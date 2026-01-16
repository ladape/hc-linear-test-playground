import { useState } from 'react';
import { useBusesMutations } from '../hooks/useBusesMutations';
import { useBusesQuery } from '../hooks/useBusesQuery';
import { BusTable } from './BusTable.tsx';
import { CreateBusForm } from './CreateBusForm.tsx';
import { Card, TableContainer } from '../../../shared/common';
import { Button } from '@mui/material';
import type { Bus } from '../types/bus.type.ts';

export function BusBoardComponent() {
  const { data: buses = [], isLoading } = useBusesQuery();
  const { createBus, deleteBus, updateBus } = useBusesMutations();
  const [openCreate, setOpenCreate] = useState(false);
  const [editingBus, setEditingBus] = useState<Bus | null>(null);

  const handleDelete = async (id: number) => {
    await deleteBus.mutateAsync(id);
  };

  const handleEdit = (id: number) => {
    const bus = buses.find((b) => b.id === id) ?? null;
    if (!bus) return;
    setEditingBus(bus);
    setOpenCreate(true);
  };

  const handleSubmit = async (payload: Omit<Bus, 'id'>) => {
    if (editingBus) {
      await updateBus.mutateAsync({ id: editingBus.id, payload });
      setEditingBus(null);
    } else {
      await createBus.mutateAsync(payload);
    }
    setOpenCreate(false);
  };

  return (
    <>
      <div style={{ display: 'flex', gap: 1, alignItems: 'center', marginBottom: 2 }}>
        <Button variant="contained" color="success" onClick={() => setOpenCreate(true)}>
          Új busz
        </Button>
      </div>

      <Card>
        {isLoading ? (
          <div>Betöltés...</div>
        ) : buses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-color-light)' }}>
            Jelenleg nincsenek buszok a rendszerben.
          </div>
        ) : (
          <TableContainer>
            <BusTable buses={buses} onDelete={handleDelete} onEdit={handleEdit} />
          </TableContainer>
        )}
      </Card>

      <CreateBusForm
        open={openCreate}
        onClose={() => { setOpenCreate(false); setEditingBus(null); }}
        onSubmit={handleSubmit}
        initial={editingBus ?? undefined}
        submitLabel={editingBus ? 'Frissít' : 'Mentés'}
        loading={editingBus ? updateBus.status === 'pending' : createBus.status === 'pending'}
      />
    </>
  );
}

