/**
 * Wholesale / retailer application routes — Liftêd™
 * POST /api/wholesale  — submit retailer application (public)
 * GET  /api/wholesale  — list applications (admin only)
 * POST /api/wholesale/:id/approve — approve (admin only)
 * POST /api/wholesale/:id/deny    — deny (admin only)
 */
import express from 'express'
import { getSql } from '../lib/db.js'
import { upsertHLContact, addHLOpportunity } from '../lib/highlevel.js'
import { requireAuth, requireRole } from '../middleware/requireAuth.js'

const router = express.Router()

// Public: submit retailer application
router.post('/', async (req, res) => {
  try {
    const {
      firstName, lastName, email, phone, businessName, businessType,
      website, location, storeCount, currentBrands, whyLifted,
      estimatedMonthlyUnits, consentEmail, consentSms,
    } = req.body

    if (!firstName || !lastName || !email || !businessName) {
      return res.status(400).json({ error: 'firstName, lastName, email, and businessName are required' })
    }

    const sql = getSql()
    const rows = await sql`
      INSERT INTO retailer_applications (
        first_name, last_name, email, phone, business_name, business_type,
        website, location, store_count, current_brands, why_lifted,
        estimated_monthly_units, consent_email, consent_sms, status
      ) VALUES (
        ${firstName}, ${lastName}, ${email}, ${phone || null}, ${businessName}, ${businessType || null},
        ${website || null}, ${location || null}, ${storeCount || null}, ${currentBrands || null}, ${whyLifted || null},
        ${estimatedMonthlyUnits || null}, ${consentEmail || false}, ${consentSms || false}, 'pending'
      )
      ON CONFLICT (email) DO UPDATE SET
        business_name = EXCLUDED.business_name,
        updated_at = now()
      RETURNING id
    `
    const appId = rows[0]?.id

    // Send to HighLevel
    try {
      const { contactId } = await upsertHLContact({
        email, firstName, lastName, phone, company: businessName,
        tags: ['Lifted Wholesale Lead', 'Lifted Retailer Application'],
        customFields: {
          'lifted_business_type': businessType,
          'lifted_store_count': String(storeCount || ''),
          'lifted_why_lifted': whyLifted,
          'lifted_estimated_monthly_units': String(estimatedMonthlyUnits || ''),
          'lifted_retailer_app_id': String(appId),
        },
      })
      if (process.env.HIGHLEVEL_WHOLESALE_PIPELINE_ID) {
        await addHLOpportunity({
          contactId,
          pipelineId: process.env.HIGHLEVEL_WHOLESALE_PIPELINE_ID,
          stageId: process.env.HIGHLEVEL_WHOLESALE_STAGE_APPLICATION_RECEIVED,
          name: `${businessName} — Wholesale Application`,
        })
      }
      if (contactId && appId) {
        await sql`UPDATE retailer_applications SET highlevel_contact_id = ${contactId} WHERE id = ${appId}`
      }
    } catch (hlErr) {
      console.warn('HighLevel wholesale sync failed (non-fatal):', hlErr.message)
    }

    return res.json({
      ok: true,
      message: 'Your wholesale application has been received. Our team will review it and be in touch within 3–5 business days.',
    })
  } catch (err) {
    console.error('Wholesale application error:', err.message)
    return res.status(500).json({ error: 'Failed to submit application. Please try again.' })
  }
})

router.get('/', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const sql = getSql()
    const rows = await sql`SELECT * FROM retailer_applications ORDER BY created_at DESC`
    return res.json({ ok: true, applications: rows })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

router.post('/:id/approve', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const { id } = req.params
    const sql = getSql()
    const rows = await sql`
      UPDATE retailer_applications SET status = 'approved', reviewed_at = now()
      WHERE id = ${id} RETURNING *
    `
    if (!rows[0]) return res.status(404).json({ error: 'Application not found' })
    return res.json({ ok: true, application: rows[0] })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

router.post('/:id/deny', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const { id } = req.params
    const sql = getSql()
    await sql`UPDATE retailer_applications SET status = 'denied', reviewed_at = now() WHERE id = ${id}`
    return res.json({ ok: true })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

export default router
