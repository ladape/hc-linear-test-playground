import { useParams, useNavigate } from 'react-router-dom';
import { useBusQuery } from './hooks/useBusQuery';
import { useBusesMutations } from './hooks/useBusesMutations';
import { CreateBusForm } from './component/CreateBusForm';
import type { Bus } from './types/bus.type';
import { useState } from 'react';
import { Page, Card } from './style/bus.style';

export default function EditBus() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: bus, isLoading } = useBusQuery(id);
  const { updateBus } = useBusesMutations();
  const [open, setOpen] = useState(true);

  if (isLoading) return <div style={{ color: 'white' }}>Betöltés...</div>;
  if (!bus) return <div style={{ color: 'white' }}>Nincs ilyen busz</div>;

  const handleSubmit = async (payload: Omit<Bus, 'id'>) => {
    await updateBus.mutateAsync({ id: Number(id), payload });
    navigate('..');
  };

  return (
    <Page>
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
    </Page>
  );
}
