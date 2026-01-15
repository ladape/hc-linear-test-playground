import { useParams, Link, useNavigate } from 'react-router-dom';
import { useBusQuery } from './hooks/useBusQuery';
import { Page, Card, Title } from './style/bus.style';
import { Button } from '@mui/material';

export default function ViewBus() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: bus, isLoading } = useBusQuery(id);

  if (isLoading) return <div style={{ color: 'white' }}>Betöltés...</div>;
  if (!bus) return <div style={{ color: 'white' }}>Nincs ilyen busz</div>;

  return (
    <Page>
      <Card>
        <Title variant="h5">Busz: {bus.plate}</Title>

        <div
          style={{
            marginTop: 12,
            color: 'white',
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: '1 1 45%', minWidth: 200 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Modell</div>
            <div>{bus.model}</div>
          </div>

          <div style={{ flex: '1 1 45%', minWidth: 200 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Állapot</div>
            <div>{bus.status}</div>
          </div>

          <div style={{ flex: '1 1 45%', minWidth: 200 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Kapacitás</div>
            <div>{bus.capacity}</div>
          </div>

          <div style={{ flex: '1 1 45%', minWidth: 200 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Rendszám</div>
            <div>{bus.plate}</div>
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <Button onClick={() => navigate(-1)} variant="outlined" sx={{ mr: 1 }}>
            Vissza
          </Button>
          <Button component={Link} to={`./edit`} variant="contained" color="primary">
            Szerkeszt
          </Button>
        </div>
      </Card>
    </Page>
  );
}
