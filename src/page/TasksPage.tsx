import { Page, Title, Header } from '../shared/common';
import { KanbanBoardComponent } from '../modules/tasks';

export function TasksPage() {
    return (
        <Page>
            <Header>
                <Title variant="h4">Feladatok</Title>
            </Header>

            <KanbanBoardComponent />
        </Page>
    );
}

export default TasksPage;

