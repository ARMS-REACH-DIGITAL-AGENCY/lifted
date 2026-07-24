/**
 * AuthContext — Liftêd™
 * Provides Firebase auth state and role-based access throughout the app.
 * Gracefully handles the case where Firebase credentials are not yet configured —
 * the public site renders normally, auth features are simply unavailable.
 */
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, safeOnAuthStateChanged, safeSignOut, isConfigured } from '../lib/firebase.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [claims, setClaims] = useState(null)
  // If Firebase isn't configured, skip the loading state entirely
  const [loading, setLoading] = useState(isConfigured)

  useEffect(() => {
    const unsubscribe = safeOnAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const tokenResult = await firebaseUser.getIdTokenResult(true)
          setUser(firebaseUser)
          setClaims(tokenResult.claims)
        } catch (err) {
          console.warn('Token refresh failed:', err.message)
          setUser(firebaseUser)
          setClaims({})
        }
      } else {
        setUser(null)
        setClaims(null)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const logout = async () => {
    await safeSignOut()
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    } catch {}
  }

  const isAdmin    = claims?.admin    === true || claims?.role === 'admin'
  const isInvestor = claims?.investor === true || claims?.role === 'investor' || isAdmin
  const isRetailer = claims?.retailer === true || claims?.role === 'retailer' || isAdmin

  return (
    <AuthContext.Provider value={{ user, claims, loading, logout, isAdmin, isInvestor, isRetailer, isConfigured }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
