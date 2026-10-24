import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/index.scss"
import { RouterProvider } from 'react-router'
import router from './router'
import "./i18n";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
