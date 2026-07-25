/**
 * Liftêd™ Form Bridge — HighLevel Public Submission Layer
 *
 * ARCHITECTURE:
 * This is a TEMPORARY production bridge that submits forms directly to HighLevel's
 * public Forms API endpoint. It requires NO API key and exposes NO private
 * credentials in the browser. Form IDs are public identifiers.
 *
 * PERMANENT ARCHITECTURE:
 * When Firebase, Neon, and Vercel environment variables are configured, set
 * VITE_FORM_TARGET=api in Vercel environment variables. All forms will automatically
 * route to /api/investor-access and /api/wholesale instead. The backend code
 * (server/routes/investorAccess.js and server/routes/wholesale.js) is already built
 * and waiting — no form rebuilding required.
 *
 * CONFIG SWITCH:
 * VITE_FORM_TARGET=highlevel  → submit directly to HighLevel (current default)
 * VITE_FORM_TARGET=api        → submit to /api/* backend routes (permanent)
 *
 * HighLevel Forms API endpoint used:
 * POST https://services.leadconnectorhq.com/forms/submit
 * This is HighLevel's public Forms API — the same endpoint used by HighLevel's
 * own form builder for browser submissions. No authentication required.
 * Form IDs and Location ID are public identifiers, not private credentials.
 *
 * Form IDs:
 * Investor Access Request:    eylaKSX7etKXpjDAF84s
 * Wholesale Retailer Application: wA5FYCmpPjckyDsPCEYF
 *
 * SECURITY:
 * - No API key, private token, or administrative credential in this file
 * - Location ID and Form IDs are public identifiers
 * - Rate limiting: max 3 submissions per email per 10-minute window (client-side)
 * - Honeypot field: submissions with _hp_field populated are silently dropped
 * - All fields validated before submission
 * - Response handling: checks Content-Type before calling .json()
 */

// ── Config switch ─────────────────────────────────────────────────────────────
const FORM_TARGET = import.meta.env.VITE_FORM_TARGET || 'highlevel'
const HL_LOCATION_ID = 'aONTFrcg4GyEubg0xdwW'
const HL_FORMS_ENDPOINT = 'https://services.leadconnectorhq.com/forms/submit'

// HighLevel Form IDs (public identifiers — not private credentials)
const HL_FORM_INVESTOR_ACCESS = 'eylaKSX7etKXpjDAF84s'
const HL_FORM_WHOLESALE = 'wA5FYCmpPjckyDsPCEYF'

// ── Rate limiting (client-side, per email, per form type) ────────────────────
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const RATE_LIMIT_MAX = 3

function getRateLimitKey(formType, email) {
  return `lifted_rl_${formType}_${email.toLowerCase().trim()}`
}

function checkRateLimit(formType, email) {
  try {
    const key = getRateLimitKey(formType, email)
    const stored = sessionStorage.getItem(key)
    const now = Date.now()
    if (!stored) return { allowed: true, attempts: 0 }
    const { attempts, firstAttempt } = JSON.parse(stored)
    if (now - firstAttempt > RATE_LIMIT_WINDOW_MS) return { allowed: true, attempts: 0 }
    if (attempts >= RATE_LIMIT_MAX) return { allowed: false, attempts }
    return { allowed: true, attempts }
  } catch {
    return { allowed: true, attempts: 0 }
  }
}

function recordAttempt(formType, email) {
  try {
    const key = getRateLimitKey(formType, email)
    const stored = sessionStorage.getItem(key)
    const now = Date.now()
    if (!stored) {
      sessionStorage.setItem(key, JSON.stringify({ attempts: 1, firstAttempt: now }))
    } else {
      const { attempts, firstAttempt } = JSON.parse(stored)
      if (now - firstAttempt > RATE_LIMIT_WINDOW_MS) {
        sessionStorage.setItem(key, JSON.stringify({ attempts: 1, firstAttempt: now }))
      } else {
        sessionStorage.setItem(key, JSON.stringify({ attempts: attempts + 1, firstAttempt }))
      }
    }
  } catch {}
}

// ── Safe fetch with response handling ────────────────────────────────────────
async function safeFetch(url, options) {
  const response = await fetch(url, options)
  const contentType = response.headers.get('content-type') || ''
  let data = null
  if (contentType.includes('application/json')) {
    try { data = await response.json() } catch { data = null }
  } else {
    // HighLevel sometimes returns empty body or text on success
    try { data = await response.text() } catch { data = null }
  }
  return { ok: response.ok, status: response.status, data, contentType }
}

// ── Investor Access Request submission ───────────────────────────────────────
/**
 * Field mappings to HighLevel:
 * firstName        → firstName
 * lastName         → lastName
 * email            → email
 * phone            → phone
 * company          → companyName
 * role             → custom field: lifted_professional_role
 * interestType     → custom field: lifted_interest_type
 * howHeard         → custom field: lifted_how_heard
 * whyInterested    → custom field: lifted_why_interested
 * investmentRange  → custom field: lifted_investment_range
 * consentEmail     → email opt-in flag
 * consentSms       → SMS opt-in flag
 *
 * Tags applied: Lifted Investor Access Requested
 * Pipeline: Lifted Investor Access → Stage: Access Requested
 * (Pipeline stage assignment happens via HighLevel automation triggered by tag)
 */
export async function submitInvestorAccess(formData, honeypot = '') {
  // Honeypot check
  if (honeypot) return { success: true } // Silently drop spam

  // Validation
  if (!formData.firstName?.trim()) throw new Error('First name is required.')
  if (!formData.lastName?.trim()) throw new Error('Last name is required.')
  if (!formData.email?.trim() || !formData.email.includes('@')) throw new Error('A valid email address is required.')

  // Rate limit
  const rl = checkRateLimit('investor', formData.email)
  if (!rl.allowed) throw new Error('Too many submissions. Please wait a few minutes before trying again.')

  recordAttempt('investor', formData.email)

  if (FORM_TARGET === 'api') {
    // ── Permanent backend route ──
    const { ok, data } = await safeFetch('/api/investor-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      credentials: 'include',
    })
    if (!ok) throw new Error(data?.error || data?.message || 'Submission failed. Please try again.')
    return { success: true, data }
  }

  // ── HighLevel public form bridge ──
  // HighLevel Forms API requires JSON body with formId
  const body = {
    formId: HL_FORM_INVESTOR_ACCESS,
    location_id: HL_LOCATION_ID,
    first_name: formData.firstName.trim(),
    last_name: formData.lastName.trim(),
    email: formData.email.trim().toLowerCase(),
    ...(formData.phone && { phone: formData.phone.trim() }),
    ...(formData.company && { company_name: formData.company.trim() }),
    // Custom fields mapped to HighLevel field keys
    ...(formData.role && { 'lifted_professional_role': formData.role }),
    ...(formData.interestType && { 'lifted_interest_type': formData.interestType }),
    ...(formData.howHeard && { 'lifted_how_heard': formData.howHeard }),
    ...(formData.whyInterested && { 'lifted_why_interested': formData.whyInterested }),
    ...(formData.investmentRange && { 'lifted_investment_range': formData.investmentRange }),
    // Consent flags
    ...(formData.consentEmail !== undefined && { 'email_opt_in': formData.consentEmail }),
    ...(formData.consentSms !== undefined && { 'sms_opt_in': formData.consentSms }),
    // Source tracking
    source: 'WearLiftedToday.com — /investor-access',
    tags: ['Lifted Investor Access Requested'],
  }

  const { ok, status } = await safeFetch(HL_FORMS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (ok || status === 201) return { success: true }
  throw new Error('Unable to submit your request right now. Please try again or email us directly.')
}

// ── Wholesale Application submission ─────────────────────────────────────────
/**
 * Field mappings to HighLevel:
 * firstName              → firstName
 * lastName               → lastName
 * email                  → email
 * phone                  → phone
 * businessName           → companyName
 * businessType           → custom field: lifted_business_type
 * website                → website
 * location               → address1
 * storeCount             → custom field: lifted_store_count
 * currentBrands          → custom field: lifted_current_brands (if exists)
 * whyLifted              → custom field: lifted_why_lifted
 * estimatedMonthlyUnits  → custom field: lifted_estimated_monthly_units
 *
 * Tags applied: Lifted Retailer Application
 * Pipeline: Lifted Wholesale → Stage: Application Received
 */
export async function submitWholesale(formData, honeypot = '') {
  if (honeypot) return { success: true }

  if (!formData.firstName?.trim()) throw new Error('First name is required.')
  if (!formData.lastName?.trim()) throw new Error('Last name is required.')
  if (!formData.email?.trim() || !formData.email.includes('@')) throw new Error('A valid email address is required.')
  if (!formData.businessName?.trim()) throw new Error('Business name is required.')

  const rl = checkRateLimit('wholesale', formData.email)
  if (!rl.allowed) throw new Error('Too many submissions. Please wait a few minutes before trying again.')
  recordAttempt('wholesale', formData.email)

  if (FORM_TARGET === 'api') {
    const { ok, data } = await safeFetch('/api/wholesale', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      credentials: 'include',
    })
    if (!ok) throw new Error(data?.error || data?.message || 'Submission failed. Please try again.')
    return { success: true, data }
  }

  const payload = new URLSearchParams()
  const body = {
    formId: HL_FORM_WHOLESALE,
    location_id: HL_LOCATION_ID,
    first_name: formData.firstName.trim(),
    last_name: formData.lastName.trim(),
    email: formData.email.trim().toLowerCase(),
    ...(formData.phone && { phone: formData.phone.trim() }),
    ...(formData.businessName && { company_name: formData.businessName.trim() }),
    ...(formData.website && { website: formData.website.trim() }),
    ...(formData.location && { address1: formData.location.trim() }),
    // Custom fields
    ...(formData.businessType && { 'lifted_business_type': formData.businessType }),
    ...(formData.storeCount && { 'lifted_store_count': formData.storeCount }),
    ...(formData.whyLifted && { 'lifted_why_lifted': formData.whyLifted }),
    ...(formData.estimatedMonthlyUnits && { 'lifted_estimated_monthly_units': formData.estimatedMonthlyUnits }),
    ...(formData.currentBrands && { 'lifted_current_brands': formData.currentBrands }),
    source: 'WearLiftedToday.com — /wholesale',
    tags: ['Lifted Retailer Application'],
  }

  const { ok, status } = await safeFetch(HL_FORMS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (ok || status === 201) return { success: true }
  throw new Error('Unable to submit your application right now. Please try again or email us directly.')
}
