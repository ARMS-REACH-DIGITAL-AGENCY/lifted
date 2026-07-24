/**
 * Secure document access — Liftêd™
 * GET /api/documents        — list documents available to the user's role
 * GET /api/documents/:id/url — get a short-lived signed URL for a document
 *
 * Documents are stored in Firebase Storage under:
 *   investor-portal/documents/{filename}
 *   retailer-portal/documents/{filename}
 *
 * Signed URLs expire in 15 minutes. Never expose permanent public URLs.
 */
import express from 'express'
import { getAdminStorage } from '../lib/firebase-admin.js'
import { getSql } from '../lib/db.js'
import { requireAuth, requireRole } from '../middleware/requireAuth.js'

const router = express.Router()

// Investor documents list
router.get('/investor', requireAuth, requireRole('investor'), async (req, res) => {
  try {
    const sql = getSql()
    const rows = await sql`
      SELECT id, name, description, version, file_path, file_size, created_at, updated_at
      FROM investor_documents
      WHERE is_active = true
      ORDER BY sort_order ASC, created_at DESC
    `
    return res.json({ ok: true, documents: rows })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

// Get signed URL for a document (expires in 15 min)
router.get('/investor/:id/url', requireAuth, requireRole('investor'), async (req, res) => {
  try {
    const { id } = req.params
    const sql = getSql()
    const rows = await sql`SELECT * FROM investor_documents WHERE id = ${id} AND is_active = true`
    if (!rows[0]) return res.status(404).json({ error: 'Document not found' })
    const doc = rows[0]

    // Generate signed URL
    const bucket = getAdminStorage().bucket()
    const file = bucket.file(doc.file_path)
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    })

    // Record document access
    try {
      await sql`
        INSERT INTO document_activity (firebase_uid, document_id, event_type)
        VALUES (${req.user.uid}, ${id}, 'view')
      `
    } catch (trackErr) {
      console.warn('Document tracking failed (non-fatal):', trackErr.message)
    }

    return res.json({ ok: true, url, expiresIn: 900 })
  } catch (err) {
    console.error('Document URL error:', err.message)
    return res.status(500).json({ error: 'Failed to generate document URL' })
  }
})

// Record document download
router.post('/investor/:id/download', requireAuth, requireRole('investor'), async (req, res) => {
  try {
    const { id } = req.params
    const sql = getSql()
    await sql`
      INSERT INTO document_activity (firebase_uid, document_id, event_type)
      VALUES (${req.user.uid}, ${id}, 'download')
    `
    return res.json({ ok: true })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

export default router
