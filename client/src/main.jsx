import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import store from './store/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position="top-center"/>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>,
)
