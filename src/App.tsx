import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar/Navbar";
import Task from "./page/task/Task";
import {APP_ROUTES} from "./config/routes.ts";
import TasksPage from "./page/TasksPage.tsx";
import BusesPage from "./page/BusesPage.tsx";
import ViewBusPage from "./page/ViewBusPage.tsx";
import EditBusPage from "./page/EditBusPage.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path={APP_ROUTES.TASK} element={<Task />} />
                <Route path={APP_ROUTES.BUS_CRUD} element={<BusesPage />} />
                <Route path={`${APP_ROUTES.BUS_CRUD}/:id`} element={<ViewBusPage />} />
                <Route path={`${APP_ROUTES.BUS_CRUD}/:id/edit`} element={<EditBusPage />} />
                <Route path={APP_ROUTES.TASKS} element={<TasksPage />} />
            </Routes>
        </BrowserRouter>
    );
}
