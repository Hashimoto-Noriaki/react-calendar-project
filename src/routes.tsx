import { createBrowserRouter } from 'react-router-dom'
import { TopPage } from "./pages/TopPage";
import { LoginPage } from "./pages/LoginPage";
import { CalendarPage } from "./pages/CalendarPage";
import { NotLoginLayout } from "./shared/components/organisms/NotLoginLayout";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<NotLoginLayout/>,
        children: [
            {index: true, element: <TopPage/> },
            {path: "/login", element: <LoginPage/> },
            {path: "/calendar", element: <CalendarPage/> },
        ],
    },
])
