import React, { createContext, useContext, useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, User } from 'firebase/auth'
import { getDatabase, ref, set, get } from 'firebase/database'

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
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const db = getDatabase(app)

interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  hasAccess: (section: string) => Promise<boolean>
  checkAndSetAccess: (email: string, section: string) => Promise<boolean>
  sanitizeKey: (input: string) => string
  db: any
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    try {
      provider.setCustomParameters({
        prompt: 'select_account'
      })
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error('Error signing in:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      await auth.signOut()
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  const sanitizeKey = (input: string): string => {
    return input.replace(/[.\$#\[\]\/]/g, '_')
  }

  const checkAndSetAccess = async (email: string, section: string): Promise<boolean> => {
    const sanitizedEmail = sanitizeKey(email)
    const accessPath = ref(db, `${section}/${sanitizedEmail}/access`)
    const snapshot = await get(accessPath)

    if (snapshot.exists()) {
      const accessValue = snapshot.val().value
      return accessValue === 1
    } else {
      await set(ref(db, `${section}/${sanitizedEmail}/access`), { value: section === 'UsersRoll' ? 1 : 0 })
      return section === 'UsersRoll'
    }
  }

  const hasAccess = async (section: string): Promise<boolean> => {
    if (!user) return false
    return await checkAndSetAccess(user.email!, section)
  }

  const value = {
    user,
    loading,
    signInWithGoogle,
    signOut,
    hasAccess,
    checkAndSetAccess,
    sanitizeKey,
    db
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}