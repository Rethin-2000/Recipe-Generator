import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import App from './App.jsx'
import { AuthProvider } from './context/UserContext.jsx'
import { GetRecipiesProvider }  from './context/PostContext.jsx'
import { FavouriteProvider } from './context/FavouriteContext.jsx'
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <GetRecipiesProvider>
      <FavouriteProvider>
      <App />
      </FavouriteProvider>
      </GetRecipiesProvider>
    </AuthProvider>
  </React.StrictMode>
)
