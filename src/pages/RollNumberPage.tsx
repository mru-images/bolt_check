import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import Layout from '../components/Layout'
import LoadingSpinner from '../components/LoadingSpinner'
import GoogleSignIn from '../components/GoogleSignIn'
import ImageGallery from '../components/ImageGallery'
import { ref, set, get } from 'firebase/database'

const RollNumberPage: React.FC = () => {
  const { user, hasAccess, sanitizeKey, db } = useAuth()
  const [loading, setLoading] = useState(true)
  const [hasPageAccess, setHasPageAccess] = useState(false)
  const [formData, setFormData] = useState({
    imageType: '',
    startRoll: '',
    endRoll: ''
  })
  const [images, setImages] = useState<any[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [canShowInfo, setCanShowInfo] = useState(false)

  useEffect(() => {
    const checkAccess = async () => {
      if (user) {
        const access = await hasAccess('UsersRoll')
        setHasPageAccess(access)
        
        // Check info access
        const sanitizedEmail = sanitizeKey(user.email!)
        const accessPath = ref(db, `UsersRoll/${sanitizedEmail}/accessInfo`)
        const snapshot = await get(accessPath)
        
        if (snapshot.exists()) {
          setCanShowInfo(snapshot.val().value === 1)
        } else {
          await set(ref(db, `UsersRoll/${sanitizedEmail}/accessInfo`), { value: 0 })
          setCanShowInfo(false)
        }
      }
      setLoading(false)
    }

    checkAccess()
  }, [user, hasAccess, sanitizeKey, db])

  const handleSubmit = async () => {
    if (!user || !formData.imageType || !formData.startRoll || !formData.endRoll) {
      alert('Please fill in all fields')
      return
    }

    if (formData.startRoll.length !== formData.endRoll.length) {
      alert('Start roll and end roll must have the same length')
      return
    }

    setIsGenerating(true)
    
    // Log user activity
    await logUserActivity()
    
    // Generate images based on roll number range
    await generateImages()
    
    setIsGenerating(false)
  }

  const logUserActivity = async () => {
    if (!user) return

    const sanitizedEmail = sanitizeKey(user.email!)
    const userRef = ref(db, 'UsersRoll/' + sanitizedEmail)
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

    await set(ref(db, `UsersRoll/${sanitizedEmail}/${uniqueKey}`), {
      email: user.email,
      ip: ip,
      date: date,
      time: time,
      os: os,
      networkType: networkType,
      batteryLevel: batteryLevel,
      ramSize: ramSize,
      image: formData.imageType,
      startroll: formData.startRoll,
      endroll: formData.endRoll
    })
  }

  const generateImages = async () => {
    const prefix = formData.startRoll.slice(0, 8)
    const startAlphanumeric = formData.startRoll.slice(8)
    const endAlphanumeric = formData.endRoll.slice(8)

    const startNum = parseInt(startAlphanumeric, 36)
    const endNum = parseInt(endAlphanumeric, 36)

    if (isNaN(startNum) || isNaN(endNum) || startNum > endNum) {
      alert('Invalid alphanumeric part of the roll numbers')
      return
    }

    const generatedImages = []
    for (let i = startNum; i <= endNum; i++) {
      const rollSuffix = i.toString(36).toUpperCase().padStart(startAlphanumeric.length, '0')
      const rollNumber = prefix + rollSuffix
      
      // Check if image exists (simulate)
      const imageExists = Math.random() > 0.3 // 70% chance image exists
      
      if (imageExists) {
        generatedImages.push({
          id: i,
          rollNumber,
          url: getImageUrl(rollNumber, formData.imageType),
          name: `Student ${rollNumber}`
        })
      }
    }
    
    setImages(generatedImages)
  }

  const getImageUrl = (rollNumber: string, imageType: string) => {
    switch (imageType) {
      case 'SSC Certificate':
        return `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNumber}/DOCS/${rollNumber}_SSC.jpg`
      case 'Inter Certificate':
        return `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNumber}/DOCS/${rollNumber}_INTER.jpg`
      case 'Aadhar':
        return `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNumber}/DOCS/${rollNumber}_Aadhar.jpg`
      case 'Caste Certificate':
        return `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNumber}/DOCS/${rollNumber}_Caste.jpg`
      case 'Income Certificate':
        return `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNumber}/DOCS/${rollNumber}_Income.jpg`
      case 'Photo':
        return `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNumber}/${rollNumber}.jpg`
      default:
        return `https://images.pexels.com/photos/1000000/pexels-photo-1000000.jpeg?auto=compress&cs=tinysrgb&w=300&h=200`
    }
  }

  // Utility functions (same as SelectorPage)
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
        <GoogleSignIn title="Sign in to access Roll Number Generator" />
      </Layout>
    )
  }

  if (!hasPageAccess) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Sorry, you no longer have access. Please contact the Administrator.
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
          <h1 className="text-4xl font-bold mb-4 gradient-text">Roll Number Generator</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome, {user.displayName}! Generate images by roll number range.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="glass-dark rounded-xl p-6 border border-gray-200 dark:border-dark-700">
              <h2 className="text-xl font-semibold mb-6">Roll Number Range</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Image Type</label>
                  <select
                    value={formData.imageType}
                    onChange={(e) => setFormData({ ...formData, imageType: e.target.value })}
                    className="w-full p-3 rounded-lg bg-gray-100 dark:bg-dark-800 border border-gray-300 dark:border-dark-600 input-focus"
                  >
                    <option value="">Select an option</option>
                    <option value="Photo">Photo</option>
                    {canShowInfo && (
                      <>
                        <option value="SSC Certificate">SSC Certificate</option>
                        <option value="Inter Certificate">Inter Certificate</option>
                        <option value="Aadhar">Aadhar</option>
                        <option value="Caste Certificate">Caste Certificate</option>
                        <option value="Income Certificate">Income Certificate</option>
                      </>
                    )}
                  </select>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Selected: {formData.imageType || 'No Selection'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Start Roll</label>
                  <input
                    type="text"
                    value={formData.startRoll}
                    onChange={(e) => setFormData({ ...formData, startRoll: e.target.value })}
                    placeholder="e.g., 22951A0001"
                    className="w-full p-3 rounded-lg bg-gray-100 dark:bg-dark-800 border border-gray-300 dark:border-dark-600 input-focus"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">End Roll</label>
                  <input
                    type="text"
                    value={formData.endRoll}
                    onChange={(e) => setFormData({ ...formData, endRoll: e.target.value })}
                    placeholder="e.g., 22951A0100"
                    className="w-full p-3 rounded-lg bg-gray-100 dark:bg-dark-800 border border-gray-300 dark:border-dark-600 input-focus"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isGenerating}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center space-x-2">
                      <LoadingSpinner size="sm" />
                      <span>Generating...</span>
                    </div>
                  ) : (
                    'Generate Images'
                  )}
                </button>

                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Total Images: {images.length}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <ImageGallery images={images} showInfo={canShowInfo} />
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

export default RollNumberPage