import { useParams, useNavigate } from 'react-router-dom';
import { useBusQuery } from '../hooks/useBusQuery';
import { useBusesMutations } from '../hooks/useBusesMutations';
import { CreateBusForm } from './CreateBusForm.tsx';
import type { Bus } from '../types/bus.type.ts';
import { useState } from 'react';
import { Card } from '../../../shared/common';
import { loadingStyle } from '../style/viewBus.style';

export function BusEditComponent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: bus, isLoading } = useBusQuery(id);
  const { updateBus } = useBusesMutations();
  const [open, setOpen] = useState(true);

  if (isLoading) return <div style={loadingStyle}>Betöltés...</div>;
  if (!bus) return <div style={loadingStyle}>Nincs ilyen busz</div>;

  const handleSubmit = async (payload: Omit<Bus, 'id'>) => {
    await updateBus.mutateAsync({ id: Number(id), payload });
    navigate('..');
  };

  return (
    <Card>
      <CreateBusForm
        open={open}
        initial={bus}
        onClose={() => {
          setOpen(false);
          navigate('..');
        }}
        onSubmit={handleSubmit}
        submitLabel="Frissít"
        loading={updateBus.status === 'pending'}
      />
    </Card>
  );
}

