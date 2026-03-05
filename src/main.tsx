import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import './styles/index.css'
import { router } from './routes'
import { LoginUserProvider } from "./features/auth/providers/LoginUserProvider"

async function enableMocking() {
  // 開発環境のみMSWを起動する
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser")
    return worker.start({
      onUnhandledRequest: "bypass", // MSWが知らないリクエストはそのまま通す
    })
  }
}

// MSWの準備が完了してからReactアプリを起動する
enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <LoginUserProvider>
        <RouterProvider router={router} />
      </LoginUserProvider>
    </React.StrictMode>,
  )
})
