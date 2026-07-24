/**
 * AuthContext — Liftêd™
 * Provides Firebase auth state and role-based access throughout the app.
 * Reads custom claims (investor, retailer, admin) from the Firebase ID token.
 */
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, onAuthStateChanged, signOut } from '../lib/firebase.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [claims, setClaims] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Force refresh to get latest custom claims
        const tokenResult = await firebaseUser.getIdTokenResult(true)
        setUser(firebaseUser)
        setClaims(tokenResult.claims)
      } else {
        setUser(null)
        setClaims(null)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const logout = async () => {
    await signOut(auth)
    // Clear server session cookie
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' }).catch(() => {})
  }

  const isAdmin    = claims?.admin    === true || claims?.role === 'admin'
  const isInvestor = claims?.investor === true || claims?.role === 'investor' || isAdmin
  const isRetailer = claims?.retailer === true || claims?.role === 'retailer' || isAdmin

  return (
    <AuthContext.Provider value={{ user, claims, loading, logout, isAdmin, isInvestor, isRetailer }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
