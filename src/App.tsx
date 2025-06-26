import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import HomePage from './pages/HomePage'
import SelectorPage from './pages/SelectorPage'
import RollNumberPage from './pages/RollNumberPage'
import SearchPage from './pages/SearchPage'
import LoginPage from './pages/LoginPage'
import ParticleBackground from './components/ParticleBackground'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-dark-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <ParticleBackground />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/selector" element={<SelectorPage />} />
              <Route path="/roll-number" element={<RollNumberPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App