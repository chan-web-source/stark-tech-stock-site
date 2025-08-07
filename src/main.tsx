import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import './i18n/i18n'
import Auth from './pages/Auth/index.tsx'
import { AuthProvider } from './components/auth/AuthContext.tsx'
import { ProtectedRoute } from './components/auth/ProtectedRoute.tsx'
import Home from './pages/Home/index.tsx'
import { NavigationContextProvider } from './context/NavigationContext.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <NavigationContextProvider>
          <Routes>
            {/* Availble sections: news, matches, tournaments, teams, team */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />
            {/* <Route path="/account" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } /> */}
          </Routes>
        </NavigationContextProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)