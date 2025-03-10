import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import { AppRouter } from './router/app.router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
)
