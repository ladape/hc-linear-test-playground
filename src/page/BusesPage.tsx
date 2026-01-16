import { Page, Header, Title } from '../shared/common';
import { BusBoardComponent } from '../modules/bus';

export default function BusesPage() {
  return (
    <Page>
      <Header>
        <Title variant="h4">Buszok kezelése</Title>
      </Header>

      <BusBoardComponent />
    </Page>
  );
}

