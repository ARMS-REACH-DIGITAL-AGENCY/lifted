/**
 * Auth routes — Liftêd™
 * POST /api/auth/login  — exchange Firebase UID for a session cookie
 * POST /api/auth/logout — clear session cookie
 * GET  /api/auth/me     — return current session
 */
import express from 'express'
import { getAdminAuth } from '../lib/firebase-admin.js'
import { getSql } from '../lib/db.js'

const router = express.Router()
const SESSION_COOKIE = 'lifted-session'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 14 * 1000 // 14 days

router.post('/login', async (req, res) => {
  try {
    const { idToken } = req.body
    if (!idToken) return res.status(400).json({ error: 'idToken required' })

    // Verify the ID token server-side
    const decoded = await getAdminAuth().verifyIdToken(idToken)
    const { uid, email } = decoded
    const role = decoded.role || decoded.investor ? 'investor' : decoded.retailer ? 'retailer' : decoded.admin ? 'admin' : 'guest'

    // Record login timestamp in Neon
    try {
      const sql = getSql()
      await sql`
        INSERT INTO portal_activity (firebase_uid, event_type, metadata)
        VALUES (${uid}, 'login', ${JSON.stringify({ email, role })})
        ON CONFLICT DO NOTHING
      `
      // Update last_login on investor_profiles or retailer_accounts
      if (role === 'investor') {
        await sql`UPDATE investor_profiles SET last_login_at = now() WHERE firebase_uid = ${uid}`
      } else if (role === 'retailer') {
        await sql`UPDATE retailer_accounts SET last_login_at = now() WHERE firebase_uid = ${uid}`
      }
    } catch (dbErr) {
      console.warn('Login DB update failed (non-fatal):', dbErr.message)
    }

    const session = { uid, email, role }
    res.cookie(SESSION_COOKIE, JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: COOKIE_MAX_AGE,
      path: '/',
    })
    return res.json({ ok: true, session })
  } catch (err) {
    console.error('Login error:', err.message)
    return res.status(401).json({ error: 'Authentication failed' })
  }
})

router.post('/logout', (req, res) => {
  res.clearCookie(SESSION_COOKIE, { path: '/' })
  return res.json({ ok: true })
})

router.get('/me', (req, res) => {
  const raw = req.cookies?.[SESSION_COOKIE]
  if (!raw) return res.json({ authenticated: false })
  try {
    const session = JSON.parse(raw)
    return res.json({ authenticated: true, session })
  } catch {
    return res.json({ authenticated: false })
  }
})

export default router
