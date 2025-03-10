import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import { Landing } from "../pages/landing/pages/landing.page";
import { List } from "../pages/habits/pages/list/list.page";
import { Create } from "../pages/habits/pages/create/create.page";
import { Home } from "../pages/habits/pages/home/home.page";
import { Detail } from "../pages/habits/pages/detail/detail.page";

const routes = [
    {
        path: "landing",
        element: <Landing />,
    },
    {
        path: "habits",
        element: <Home />,
        children: [
            { path: 'list', element: <List /> },
            { path: 'create', element: <Create /> },
            { path: ':id', element: <Detail /> },
            { path: '', element: <Navigate to='list' /> },
        ],
    },
    {
        path: '/*',
        element: <Navigate to='landing' />,
    }
];

// Creación del router
const router = createBrowserRouter(routes);

// Componente principal del enrutador
export const AppRouter = () => (
    <RouterProvider router={router} />
);