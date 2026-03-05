import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import './styles/index.css'
import { router } from './routes'
import { LoginUserProvider } from "./features/auth/providers/LoginUserProvider"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoginUserProvider>
      <RouterProvider router={router} />
    </LoginUserProvider>
  </React.StrictMode>,
)
