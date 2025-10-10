import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "@/pages/dashboard";

import DashboardLayout from "@/layouts/DashboardLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardLayout />,
        children: [
            { index: true, element: <Dashboard /> },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}