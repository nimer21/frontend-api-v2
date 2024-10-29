import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'
// import { ThemeProvider } from 'react-bootstrap'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/">
    {/* <ThemeProvider dir="rtl"> */}
    <AuthProvider>
    <App />
    </AuthProvider>     
    {/* </ThemeProvider>' */}
    </BrowserRouter>
  </StrictMode>,
)
