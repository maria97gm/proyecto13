import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { BrowserRouter } from 'react-router-dom'
import { FavoritesProvider } from './Providers/FavoritesProvider'
import { AuthProvider } from './Providers/AuthProvider'

const Root = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FavoritesProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </FavoritesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />)
