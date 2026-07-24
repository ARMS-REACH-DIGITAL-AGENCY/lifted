/**
 * Firebase Admin SDK — Liftêd™
 * Initialized once as a singleton.
 * Credentials come from FIREBASE_SERVICE_ACCOUNT_JSON (base64-encoded JSON)
 * set as a Vercel environment variable. Never committed to the repo.
 */
import admin from 'firebase-admin'

let app = null

export function getAdminApp() {
  if (app) return app
  const serviceAccountB64 = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
  if (!serviceAccountB64) {
    throw new Error('Missing FIREBASE_SERVICE_ACCOUNT_JSON environment variable')
  }
  const serviceAccount = JSON.parse(
    Buffer.from(serviceAccountB64, 'base64').toString('utf8')
  )
  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  })
  return app
}

export function getAdminAuth() {
  return admin.auth(getAdminApp())
}

export function getAdminStorage() {
  return admin.storage(getAdminApp())
}
