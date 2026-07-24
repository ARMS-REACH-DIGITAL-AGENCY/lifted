/**
 * Firebase Client SDK — Liftêd™
 * Credentials come from VITE_FIREBASE_* environment variables.
 * Set these in Vercel → Settings → Environment Variables.
 *
 * IMPORTANT: Firebase is initialized lazily and gracefully handles missing
 * credentials so the public site renders normally even before credentials
 * are configured. Auth features simply remain unavailable until credentials
 * are set.
 */
import { initializeApp, getApps, getApp } from 'firebase/app'
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY            || '',
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN        || '',
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID         || '',
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET     || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId:             import.meta.env.VITE_FIREBASE_APP_ID             || '',
}

// Firebase requires a non-empty apiKey to initialize.
// If credentials aren't set yet, we skip initialization and export null stubs.
const isConfigured = !!firebaseConfig.apiKey && !!firebaseConfig.projectId

let app = null
let auth = null

if (isConfigured) {
  try {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig)
    auth = getAuth(app)
  } catch (err) {
    console.warn('Firebase initialization failed:', err.message)
    app = null
    auth = null
  }
}

export { app, auth, isConfigured }

export function safeSignIn(email, password) {
  if (!auth) throw new Error('Firebase is not configured. Set VITE_FIREBASE_* environment variables.')
  return signInWithEmailAndPassword(auth, email, password)
}

export function safeSendPasswordReset(email) {
  if (!auth) throw new Error('Firebase is not configured.')
  return sendPasswordResetEmail(auth, email)
}

export function safeSignOut() {
  if (!auth) return Promise.resolve()
  return signOut(auth)
}

export function safeOnAuthStateChanged(callback) {
  if (!auth) {
    // No Firebase — immediately call back with null user, return no-op unsubscribe
    callback(null)
    return () => {}
  }
  return onAuthStateChanged(auth, callback)
}

// Legacy named exports for backward compatibility
export { signInWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged }
