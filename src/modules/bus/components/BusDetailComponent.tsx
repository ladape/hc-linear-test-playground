import { useParams, useNavigate } from 'react-router-dom';
import { useBusQuery } from '../hooks/useBusQuery.ts';
import { Card, Title } from '../../../shared/common';
import {
  loadingStyle,
  detailsContainerStyle,
  detailFieldStyle,
  detailLabelStyle,
  actionsContainerStyle
} from '../style/viewBus.style';
import { Button } from '../../../shared/common';

export function BusDetailComponent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: bus, isLoading } = useBusQuery(id);

  if (isLoading) return <div style={loadingStyle}>Betöltés...</div>;
  if (!bus) return <div style={loadingStyle}>Nincs ilyen busz</div>;

  return (
    <Card>
      <Title variant="h5">Busz: {bus.plate}</Title>

      <div style={detailsContainerStyle}>
        <div style={detailFieldStyle}>
          <div style={detailLabelStyle}>Modell</div>
          <div>{bus.model}</div>
        </div>

        <div style={detailFieldStyle}>
          <div style={detailLabelStyle}>Állapot</div>
          <div>{bus.status === 'operational' ? 'Működőképes' : 'Karbantartás alatt'}</div>
        </div>

        <div style={detailFieldStyle}>
          <div style={detailLabelStyle}>Kapacitás</div>
          <div>{bus.capacity}</div>
        </div>

        <div style={detailFieldStyle}>
          <div style={detailLabelStyle}>Rendszám</div>
          <div>{bus.plate}</div>
        </div>
      </div>

      <div style={actionsContainerStyle}>
        <Button onClick={() => navigate(-1)} variant="outlined" sx={{ mr: 1 }}>
          Vissza
        </Button>
      </div>
    </Card>
  );
}

