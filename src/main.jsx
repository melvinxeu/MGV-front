import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import IdeasManager from './IdeasManager.jsx'
import VideosManager from './VideoManager.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VideosManager/>
  </StrictMode>,
)
