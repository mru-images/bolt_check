import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, Database, Users, Search, Hash, Key, ExternalLink } from 'lucide-react'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue, update, remove, set, get } from 'firebase/database'
import Layout from '../components/Layout'
import LoadingSpinner from '../components/LoadingSpinner'

const firebaseConfig = {
  apiKey: "AIzaSyCkQIWw9iJPnNBYsnIDL-zDWDsHRok1mps",
  authDomain: "imagescheck-1fc28.firebaseapp.com",
  projectId: "imagescheck-1fc28",
  storageBucket: "imagescheck-1fc28.appspot.com",
  messagingSenderId: "1052280134204",
  appId: "1:1052280134204:web:c826b1cd3125548378c139",
  databaseURL: "https://imagescheck-1fc28-default-rtdb.firebaseio.com"
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

const LoginPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeSection, setActiveSection] = useState('Home')
  const [passwords, setPasswords] = useState<string[]>([])
  const [dashboardData, setDashboardData] = useState<any>({})

  useEffect(() => {
    loadPasswords()
    loadDashboardData()
  }, [])

  const loadPasswords = async () => {
    try {
      const snapshot = await get(ref(db, 'Passwords/'))
      const passwordData = snapshot.val()
      if (passwordData) {
        setPasswords(Object.values(passwordData))
      }
    } catch (error) {
      console.error("Error loading passwords:", error)
    }
  }

  const loadDashboardData = () => {
    const sections = ['Users', 'UsersRoll', 'UserSearch']
    const today = new Date()
    const todayFormatted = `${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}`
    
    sections.forEach(section => {
      const dataRef = ref(db, section)
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val()
        if (data) {
          const todayVisitors = new Set()
          const allEntries = []
          
          for (const key in data) {
            const records = Array.isArray(data[key]) ? data[key] : Object.values(data[key])
            for (const entry of records) {
              if (entry && typeof entry === "object") {
                allEntries.push(entry)
                if (entry.date === todayFormatted) {
                  todayVisitors.add(entry.email || key)
                }
              }
            }
          }
          
          setDashboardData(prev => ({
            ...prev,
            [section]: {
              todayCount: todayVisitors.size,
              totalEntries: allEntries.length,
              entries: allEntries.slice(0, 5) // Latest 5 entries
            }
          }))
        }
      })
    })
  }

  const handleLogin = async () => {
    if (!password.trim()) {
      alert('Please enter a password')
      return
    }

    setLoading(true)
    
    if (passwords.includes(password.trim())) {
      setIsAuthenticated(true)
    } else {
      alert('Invalid password')
    }
    
    setLoading(false)
    setPassword('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full"
          >
            <div className="glass-dark rounded-2xl p-8 border border-gray-200 dark:border-dark-700 text-center">
              <div className="mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Developer Mode</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Enter password to access admin panel
                </p>
              </div>

              <div className="space-y-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Password"
                  className="w-full p-4 rounded-lg bg-gray-100 dark:bg-dark-800 border border-gray-300 dark:border-dark-600 input-focus text-center"
                  autoComplete="off"
                />

                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <LoadingSpinner size="sm" />
                      <span>Authenticating...</span>
                    </div>
                  ) : (
                    'Access System'
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 gradient-text">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor system activity and manage user access
          </p>
        </motion.div>

        {/* Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'Home', icon: Database },
              { name: 'Users', icon: Users },
              { name: 'UsersRoll', icon: Hash },
              { name: 'UserSearch', icon: Search },
              { name: 'Passwords', icon: Key },
            ].map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveSection(item.name)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeSection === item.name
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Dashboard Content */}
        {activeSection === 'Home' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(dashboardData).map(([section, data]: [string, any]) => (
                <div key={section} className="glass-dark rounded-xl p-6 border border-gray-200 dark:border-dark-700">
                  <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                    {section === 'Users' && <Users className="w-5 h-5" />}
                    {section === 'UsersRoll' && <Hash className="w-5 h-5" />}
                    {section === 'UserSearch' && <Search className="w-5 h-5" />}
                    <span>{section}</span>
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Today's Visitors</span>
                      <span className="font-semibold text-primary-500">{data?.todayCount || 0}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Total Entries</span>
                      <span className="font-semibold">{data?.totalEntries || 0}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-dark rounded-xl p-6 border border-gray-200 dark:border-dark-700">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => setActiveSection('Users')}
                  className="btn-primary"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </button>
                <button
                  onClick={() => setActiveSection('Passwords')}
                  className="btn-secondary"
                >
                  <Key className="w-4 h-4 mr-2" />
                  Manage Passwords
                </button>
                <button
                  onClick={() => window.open('/search', '_blank')}
                  className="btn-primary"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Search
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="btn-secondary"
                >
                  Refresh Data
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Other sections would be implemented similarly */}
        {activeSection !== 'Home' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-dark rounded-xl p-6 border border-gray-200 dark:border-dark-700"
          >
            <h3 className="text-lg font-semibold mb-4">{activeSection} Management</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {activeSection} management interface would be implemented here with full CRUD operations.
            </p>
          </motion.div>
        )}
      </div>
    </Layout>
  )
}

export default LoginPage