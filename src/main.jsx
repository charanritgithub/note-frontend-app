import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextProviders from './context/Contextproviders.jsx'


createRoot(document.getElementById('root')).render(
  <ContextProviders>
    <App />
  </ContextProviders>
)
