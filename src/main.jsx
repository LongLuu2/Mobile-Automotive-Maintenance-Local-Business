import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './style.css'
import App from './App.jsx'

const rootEl = document.getElementById('app')
const root = createRoot(rootEl)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

if (import.meta.hot) {
  import.meta.hot.accept()
}
