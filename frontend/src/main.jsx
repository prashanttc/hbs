import React from 'react'
import ReactDOM from 'react-dom/client'
import { SearchContextProvider } from './context/SearchContext.jsx'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
    <SearchContextProvider>
      <App />
    </SearchContextProvider>
      </AuthContextProvider>
  </React.StrictMode>,
)
