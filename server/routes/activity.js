/**
 * Portal activity tracking — Liftêd™
 * POST /api/activity  — record a portal event (authenticated users only)
 */
import express from 'express'
import { getSql } from '../lib/db.js'
import { requireAuth } from '../middleware/requireAuth.js'

const router = express.Router()

const ALLOWED_EVENTS = [
  'page_view', 'document_view', 'document_download',
  'video_view', 'booking_link_click', 'call_scheduled',
  'portal_accessed', 'first_login',
]

router.post('/', requireAuth, async (req, res) => {
  try {
    const { eventType, metadata } = req.body
    if (!ALLOWED_EVENTS.includes(eventType)) {
      return res.status(400).json({ error: `Invalid eventType. Allowed: ${ALLOWED_EVENTS.join(', ')}` })
    }
    const sql = getSql()
    await sql`
      INSERT INTO portal_activity (firebase_uid, event_type, metadata)
      VALUES (${req.user.uid}, ${eventType}, ${JSON.stringify(metadata || {})})
    `
    return res.json({ ok: true })
  } catch (err) {
    console.error('Activity tracking error:', err.message)
    return res.status(500).json({ error: 'Failed to record activity' })
  }
})

export default router
