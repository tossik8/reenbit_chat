import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './css/index.css'
import ChatContextProvider from './context/ChatContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChatContextProvider>
      <App />
    </ChatContextProvider>
  </StrictMode>,
)
