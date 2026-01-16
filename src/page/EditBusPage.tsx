import { useParams, useNavigate } from 'react-router-dom';
import { useBusQuery, useBusesMutations, CreateBusForm } from '../modules/bus';
import type { Bus } from '../modules/bus';
import { useState } from 'react';
import { Page, Card } from '../shared/common/styles/common.style';
import { loadingStyle } from '../modules/bus/style/viewBus.style';

export default function EditBusPage() {
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

