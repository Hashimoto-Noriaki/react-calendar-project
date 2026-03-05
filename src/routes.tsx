import { createBrowserRouter } from 'react-router-dom'
import { TopPage } from "./pages/TopPage";
import { LoginPage } from "./pages/LoginPage";
import { CalendarPage } from "./pages/CalendarPage";
import { NotLoginLayout } from "./shared/components/organisms/NotLoginLayout";
import { LoginLayout } from "./shared/components/organisms/LoginLayout";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<NotLoginLayout/>,
        children: [
            {index: true, element: <TopPage/> },
            {path: "/login", element: <LoginPage/> },
        ],
    },
    {
        element:<LoginLayout/>,
        children: [{ path: "/calendar", element: <CalendarPage/> }],
    }
])
