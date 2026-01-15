import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar/Navbar";
import Task from "./page/task/Task";
import {APP_ROUTES} from "./config/routes.ts";
import {KanbanBoard} from "./page/tasksKanbanBoard/TasksKanbanBoard.tsx";
import BusCrudPage from "./page/busCRUD/BusCrudPage";
import ViewBus from "./page/busCRUD/ViewBus";
import EditBus from "./page/busCRUD/EditBus";

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path={APP_ROUTES.TASK} element={<Task />} />
                <Route path={APP_ROUTES.BUS_CRUD} element={<BusCrudPage />} />
                <Route path={`${APP_ROUTES.BUS_CRUD}/:id`} element={<ViewBus />} />
                <Route path={`${APP_ROUTES.BUS_CRUD}/:id/edit`} element={<EditBus />} />
                <Route path={APP_ROUTES.TASKS} element={<KanbanBoard />} />
            </Routes>
        </BrowserRouter>
    );
}
