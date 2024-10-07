import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
// import { ThemeProvider } from 'react-bootstrap'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <ThemeProvider dir="rtl"> */}
    <Provider store={store}>
    <App />
    </Provider>
    {/* </ThemeProvider>' */}
  </StrictMode>,
)
