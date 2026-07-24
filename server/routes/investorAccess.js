/**
 * Investor access request routes — Liftêd™
 * POST /api/investor-access  — submit access request (public, no auth required)
 * GET  /api/investor-access  — list requests (admin only)
 * POST /api/investor-access/:id/approve — approve a request (admin only)
 * POST /api/investor-access/:id/deny    — deny a request (admin only)
 */
import express from 'express'
import { getSql } from '../lib/db.js'
import { upsertHLContact, addHLOpportunity } from '../lib/highlevel.js'
import { requireAuth, requireRole } from '../middleware/requireAuth.js'

const router = express.Router()

// Public: submit investor access request
router.post('/', async (req, res) => {
  try {
    const {
      firstName, lastName, email, phone, company, role,
      interestType, howHeard, whyInterested, investmentRange,
      consentEmail, consentSms,
    } = req.body

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'firstName, lastName, and email are required' })
    }

    const sql = getSql()

    // Store in Neon
    const rows = await sql`
      INSERT INTO investor_access_requests (
        first_name, last_name, email, phone, company, professional_role,
        interest_type, how_heard, why_interested, investment_range,
        consent_email, consent_sms, status
      ) VALUES (
        ${firstName}, ${lastName}, ${email}, ${phone || null}, ${company || null}, ${role || null},
        ${interestType || null}, ${howHeard || null}, ${whyInterested || null}, ${investmentRange || null},
        ${consentEmail || false}, ${consentSms || false}, 'pending'
      )
      ON CONFLICT (email) DO UPDATE SET
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        phone = EXCLUDED.phone,
        company = EXCLUDED.company,
        professional_role = EXCLUDED.professional_role,
        interest_type = EXCLUDED.interest_type,
        how_heard = EXCLUDED.how_heard,
        why_interested = EXCLUDED.why_interested,
        investment_range = EXCLUDED.investment_range,
        consent_email = EXCLUDED.consent_email,
        consent_sms = EXCLUDED.consent_sms,
        updated_at = now()
      RETURNING id
    `
    const requestId = rows[0]?.id

    // Send to HighLevel (non-fatal if it fails)
    try {
      const { contactId } = await upsertHLContact({
        email, firstName, lastName, phone, company,
        tags: ['Lifted Investor Access Requested'],
        customFields: {
          'lifted_interest_type': interestType,
          'lifted_how_heard': howHeard,
          'lifted_why_interested': whyInterested,
          'lifted_investment_range': investmentRange,
          'lifted_professional_role': role,
          'lifted_access_request_id': String(requestId),
        },
      })
      // Add to investor pipeline — stage: Access Requested
      // HIGHLEVEL_INVESTOR_PIPELINE_ID must be set in Vercel env vars
      if (process.env.HIGHLEVEL_INVESTOR_PIPELINE_ID) {
        await addHLOpportunity({
          contactId,
          pipelineId: process.env.HIGHLEVEL_INVESTOR_PIPELINE_ID,
          stageId: process.env.HIGHLEVEL_INVESTOR_STAGE_ACCESS_REQUESTED,
          name: `${firstName} ${lastName} — Investor Access Request`,
        })
      }
      // Update Neon with HL contact ID
      if (contactId && requestId) {
        await sql`UPDATE investor_access_requests SET highlevel_contact_id = ${contactId} WHERE id = ${requestId}`
      }
    } catch (hlErr) {
      console.warn('HighLevel sync failed (non-fatal):', hlErr.message)
    }

    return res.json({
      ok: true,
      message: 'Your request has been received and will be reviewed. Approved applicants will receive a secure email invitation with private access instructions.',
    })
  } catch (err) {
    console.error('Investor access request error:', err.message)
    return res.status(500).json({ error: 'Failed to submit request. Please try again.' })
  }
})

// Admin: list all requests
router.get('/', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const sql = getSql()
    const rows = await sql`
      SELECT * FROM investor_access_requests ORDER BY created_at DESC
    `
    return res.json({ ok: true, requests: rows })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

// Admin: approve a request
router.post('/:id/approve', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const { id } = req.params
    const sql = getSql()
    const rows = await sql`
      UPDATE investor_access_requests SET status = 'approved', reviewed_at = now()
      WHERE id = ${id} RETURNING *
    `
    if (!rows[0]) return res.status(404).json({ error: 'Request not found' })
    // The actual Firebase user creation and invitation is handled by a Cloud Function
    // triggered by this status change, or manually via the admin panel.
    return res.json({ ok: true, request: rows[0] })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

// Admin: deny a request
router.post('/:id/deny', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const { id } = req.params
    const sql = getSql()
    await sql`
      UPDATE investor_access_requests SET status = 'denied', reviewed_at = now()
      WHERE id = ${id}
    `
    return res.json({ ok: true })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

export default router
