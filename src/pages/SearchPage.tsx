import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import Layout from '../components/Layout'
import LoadingSpinner from '../components/LoadingSpinner'
import GoogleSignIn from '../components/GoogleSignIn'
import { ref, set, get } from 'firebase/database'

interface SearchResult {
  rollNumber: string
  name: string
  route: string
  imageUrl: string
}

const SearchPage: React.FC = () => {
  const { user, hasAccess, sanitizeKey, db } = useAuth()
  const [loading, setLoading] = useState(true)
  const [hasPageAccess, setHasPageAccess] = useState(false)
  const [searchData, setSearchData] = useState({
    searchColumn: '3', // Default to Name
    searchValue: ''
  })
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    const checkAccess = async () => {
      if (user) {
        const access = await hasAccess('UserSearch')
        setHasPageAccess(access)
      }
      setLoading(false)
    }

    checkAccess()
  }, [user, hasAccess])

  const handleSearch = async () => {
    if (!user || !searchData.searchValue.trim()) {
      alert('Please enter a search term')
      return
    }

    setIsSearching(true)
    
    // Log user activity
    await logUserActivity()
    
    // Perform search (simulate with mock data)
    await performSearch()
    
    setIsSearching(false)
  }

  const logUserActivity = async () => {
    if (!user) return

    const sanitizedEmail = sanitizeKey(user.email!)
    const userRef = ref(db, 'UserSearch/' + sanitizedEmail)
    const userCountSnapshot = await get(userRef)
    let userCount = userCountSnapshot.exists() ? Object.keys(userCountSnapshot.val()).length + 1 : 1
    const uniqueKey = userCount.toString()

    const batteryLevel = await getBatteryInfo()
    const networkType = getNetworkInfo()
    const ramSize = getRAMSize()
    const os = getOS()
    const ip = await getIPAddress()
    const currentDate = new Date()
    const date = currentDate.toLocaleDateString()
    const time = currentDate.toLocaleTimeString()

    let searchType = 'Unknown'
    if (searchData.searchColumn === '2') searchType = 'Roll Number'
    else if (searchData.searchColumn === '3') searchType = 'Name'
    else if (searchData.searchColumn === '5') searchType = 'Route No'

    await set(ref(db, `UserSearch/${sanitizedEmail}/${uniqueKey}`), {
      email: user.email,
      ip: ip,
      date: date,
      time: time,
      os: os,
      networkType: networkType,
      batteryLevel: batteryLevel,
      ramSize: ramSize,
      selected: searchType,
      entered: searchData.searchValue
    })
  }

  const performSearch = async () => {
    // Simulate search results
    const mockResults: SearchResult[] = [
      {
        rollNumber: '22951A0001',
        name: 'John Doe',
        route: 'Route 1',
        imageUrl: 'https://images.pexels.com/photos/1000001/pexels-photo-1000001.jpeg?auto=compress&cs=tinysrgb&w=300&h=200'
      },
      {
        rollNumber: '22951A0002',
        name: 'Jane Smith',
        route: 'Route 2',
        imageUrl: 'https://images.pexels.com/photos/1000002/pexels-photo-1000002.jpeg?auto=compress&cs=tinysrgb&w=300&h=200'
      },
      {
        rollNumber: '22951A0003',
        name: 'Bob Johnson',
        route: 'Route 1',
        imageUrl: 'https://images.pexels.com/photos/1000003/pexels-photo-1000003.jpeg?auto=compress&cs=tinysrgb&w=300&h=200'
      }
    ]

    // Filter based on search criteria
    const filteredResults = mockResults.filter(result => {
      const searchTerm = searchData.searchValue.toLowerCase()
      switch (searchData.searchColumn) {
        case '2': // Roll Number
          return result.rollNumber.toLowerCase().includes(searchTerm)
        case '3': // Name
          return result.name.toLowerCase().includes(searchTerm)
        case '5': // Route
          return result.route.toLowerCase().includes(searchTerm)
        default:
          return false
      }
    })

    setResults(filteredResults)
  }

  // Utility functions (same as other pages)
  const getBatteryInfo = async () => {
    try {
      const battery = await (navigator as any).getBattery()
      return (battery.level * 100).toFixed(0) + '%'
    } catch {
      return 'N/A'
    }
  }

  const getNetworkInfo = () => {
    return (navigator as any).connection?.effectiveType || 'N/A'
  }

  const getRAMSize = () => {
    return ((navigator as any).deviceMemory || 'N/A') + ' GB'
  }

  const getOS = () => {
    const userAgent = window.navigator.userAgent
    const platform = window.navigator.platform
    const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K']
    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']
    const iosPlatforms = ['iPhone', 'iPad', 'iPod']

    if (macosPlatforms.indexOf(platform) !== -1) return 'Mac OS'
    if (iosPlatforms.indexOf(platform) !== -1) return 'iOS'
    if (windowsPlatforms.indexOf(platform) !== -1) return 'Windows'
    if (/Android/.test(userAgent)) return 'Android'
    if (/Linux/.test(platform)) return 'Linux'

    return 'Unknown OS'
  }

  const getIPAddress = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json')
      const data = await response.json()
      return data.ip
    } catch {
      return 'N/A'
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </Layout>
    )
  }

  if (!user) {
    return (
      <Layout>
        <GoogleSignIn title="Sign in to access Search Portal" />
      </Layout>
    )
  }

  if (!hasPageAccess) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Website Under Construction</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Sorry, this feature is currently under development.
            </p>
          </div>
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
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 gradient-text">Information Search</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome, {user.displayName}! Search for student information.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="glass-dark rounded-xl p-6 border border-gray-200 dark:border-dark-700">
              <h2 className="text-xl font-semibold mb-6">Search Criteria</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Search By</label>
                  <select
                    value={searchData.searchColumn}
                    onChange={(e) => setSearchData({ ...searchData, searchColumn: e.target.value })}
                    className="w-full p-3 rounded-lg bg-gray-100 dark:bg-dark-800 border border-gray-300 dark:border-dark-600 input-focus"
                  >
                    <option value="3">Name</option>
                    <option value="2">Roll Number</option>
                    <option value="5">Route No</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Search Term</label>
                  <input
                    type="text"
                    value={searchData.searchValue}
                    onChange={(e) => setSearchData({ ...searchData, searchValue: e.target.value })}
                    placeholder="Enter name or part of name"
                    className="w-full p-3 rounded-lg bg-gray-100 dark:bg-dark-800 border border-gray-300 dark:border-dark-600 input-focus"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>

                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSearching ? (
                    <div className="flex items-center justify-center space-x-2">
                      <LoadingSpinner size="sm" />
                      <span>Searching...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Search className="w-4 h-4" />
                      <span>Search</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="glass-dark rounded-xl p-6 border border-gray-200 dark:border-dark-700">
              <h3 className="text-lg font-semibold mb-4">Search Results</h3>
              
              {results.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-gray-500 dark:text-gray-400">
                    {isSearching ? 'Searching...' : 'No results found. Try searching for something.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.map((result, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 dark:bg-dark-800 rounded-lg p-4 border border-gray-200 dark:border-dark-600 hover:border-primary-500 transition-all duration-300 card-hover cursor-pointer"
                    >
                      <div className="aspect-video relative overflow-hidden rounded-lg mb-3">
                        <img
                          src={result.imageUrl}
                          alt={result.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = 'https://images.pexels.com/photos/1000000/pexels-photo-1000000.jpeg?auto=compress&cs=tinysrgb&w=300&h=200'
                          }}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-lg">{result.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Roll: {result.rollNumber}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Route: {result.route}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

export default SearchPage