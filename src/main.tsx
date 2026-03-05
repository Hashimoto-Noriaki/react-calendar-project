import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-lime-500 underline">Hello World</h1>
    </div>
  </React.StrictMode>,
)
