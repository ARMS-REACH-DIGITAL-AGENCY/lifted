/**
 * formBridge.js — Liftêd™ HighLevel Form Submission Bridge
 *
 * EXACT FIELD KEYS confirmed from HighLevel Settings → Custom Fields (Jul 24, 2026):
 *
 * STANDARD CONTACT FIELDS (from screenshot 2):
 *   {{contact.first_name}}     → firstName
 *   {{contact.last_name}}      → lastName
 *   {{contact.email}}          → email
 *   {{contact.phone}}          → phone
 *   {{contact.source}}         → source
 *   {{contact.type}}           → contact_type
 *   {{contact.address1}}       → address1
 *   {{contact.city}}           → city
 *   {{contact.state}}          → state
 *   {{contact.postal_code}}    → postal_code
 *   {{contact.website}}        → website
 *   {{contact.company_name}}   → companyName
 *
 * CUSTOM CONTACT FIELDS (exact keys from screenshot 1 + 2):
 *   {{contact.liftd_collections_of_interest}}   → Lifted Collections of Interest
 *   {{contact.existing_apparel_brands}}         → Existing Apparel Brands
 *   {{contact.years_in_business}}               → Years in Business
 *   {{contact.additional_notes}}                → Additional Notes
 *   {{contact.resale_certificate_status}}       → Resale Certificate Status
 *   {{contact.estimated_opening_order}}         → Estimated Opening Order
 *   {{contact.number_of_locations}}             → Number of Locations
 *   {{contact.retail_channel}}                  → Retail Channel
 *   {{contact.store_type}}                      → Store Type
 *   {{contact.type_of_interest}}                → Type of Interest
 *   {{contact.anticipated_investment_range}}    → Anticipated Investment Range
 *   {{contact.why_are_you_interested}}          → Why are you interested?
 *   {{contact.how_did_you_hear_about_liftd}}    → How did you hear about Liftêd™?
 *   {{contact.interest_type}}                   → Interest Type
 *   {{contact.professional_role}}               → Professional Role
 *
 * CONFIG SWITCH:
 *   VITE_FORM_TARGET=highlevel  → submit to HighLevel Forms API (default)
 *   VITE_FORM_TARGET=api        → submit to /api/* backend (Firebase+Neon permanent)
 *
 * No API key or private credential is exposed in this file.
 * Form IDs and Location ID are public identifiers.
 */

const FORM_TARGET = import.meta.env.VITE_FORM_TARGET || 'highlevel'
const HL_LOCATION_ID = 'aONTFrcg4GyEubg0xdwW'
const HL_FORMS_ENDPOINT = 'https://services.leadconnectorhq.com/forms/submit'
const HL_FORM_INVESTOR = 'eylaKSX7etKXpjDAF84s'
const HL_FORM_WHOLESALE = 'wA5FYCmpPjckyDsPCEYF'

// Rate limiting: max 3 per email per 10 minutes (client-side, sessionStorage)
const RATE_WINDOW = 10 * 60 * 1000
const RATE_MAX = 3

function checkRate(key, email) {
  try {
    const k = `lifted_rl_${key}_${email.toLowerCase().trim()}`
    const stored = sessionStorage.getItem(k)
    const now = Date.now()
    if (!stored) return true
    const { attempts, first } = JSON.parse(stored)
    if (now - first > RATE_WINDOW) return true
    return attempts < RATE_MAX
  } catch { return true }
}

function recordRate(key, email) {
  try {
    const k = `lifted_rl_${key}_${email.toLowerCase().trim()}`
    const stored = sessionStorage.getItem(k)
    const now = Date.now()
    if (!stored) { sessionStorage.setItem(k, JSON.stringify({ attempts: 1, first: now })); return }
    const { attempts, first } = JSON.parse(stored)
    if (now - first > RATE_WINDOW) { sessionStorage.setItem(k, JSON.stringify({ attempts: 1, first: now })); return }
    sessionStorage.setItem(k, JSON.stringify({ attempts: attempts + 1, first }))
  } catch {}
}

// Safe fetch — handles empty body, text, or JSON responses
async function safeFetch(url, options) {
  const res = await fetch(url, options)
  const ct = res.headers.get('content-type') || ''
  let data = null
  try {
    data = ct.includes('application/json') ? await res.json() : await res.text()
  } catch {}
  return { ok: res.ok, status: res.status, data }
}

// ─── Investor Access Request ───────────────────────────────────────────────────
export async function submitInvestorAccess(formData, honeypot = '') {
  if (honeypot) return { success: true } // silently drop spam
  if (!formData.firstName?.trim()) throw new Error('First name is required.')
  if (!formData.lastName?.trim()) throw new Error('Last name is required.')
  if (!formData.email?.trim() || !formData.email.includes('@')) throw new Error('A valid email address is required.')
  if (!checkRate('investor', formData.email)) throw new Error('Too many submissions. Please wait a few minutes and try again.')
  recordRate('investor', formData.email)

  if (FORM_TARGET === 'api') {
    const { ok, data } = await safeFetch('/api/investor-access', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData), credentials: 'include',
    })
    if (!ok) throw new Error(data?.error || data?.message || 'Submission failed.')
    return { success: true }
  }

  // HighLevel field key mapping — exact keys from HighLevel Custom Fields
  const body = {
    formId: HL_FORM_INVESTOR,
    location_id: HL_LOCATION_ID,
    // Standard contact fields
    firstName: formData.firstName.trim(),
    lastName: formData.lastName.trim(),
    email: formData.email.trim().toLowerCase(),
    ...(formData.phone?.trim() && { phone: formData.phone.trim() }),
    ...(formData.company?.trim() && { companyName: formData.company.trim() }),
    // Custom fields — exact HighLevel keys (without {{ }})
    ...(formData.role?.trim() && { 'contact.professional_role': formData.role.trim() }),
    ...(formData.interestType && { 'contact.type_of_interest': formData.interestType }),
    ...(formData.howHeard?.trim() && { 'contact.how_did_you_hear_about_liftd': formData.howHeard.trim() }),
    ...(formData.whyInterested?.trim() && { 'contact.why_are_you_interested': formData.whyInterested.trim() }),
    ...(formData.investmentRange && { 'contact.anticipated_investment_range': formData.investmentRange }),
    // Consent
    ...(formData.consentEmail !== undefined && { email_opted_in: formData.consentEmail }),
    ...(formData.consentSms !== undefined && { sms_opted_in: formData.consentSms }),
    // Source tracking
    source: 'WearLiftedToday.com',
  }

  const { ok, status } = await safeFetch(HL_FORMS_ENDPOINT, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (ok || status === 201) return { success: true }
  throw new Error('Unable to submit your request. Please try again or contact us directly.')
}

// ─── Wholesale Retailer Application ───────────────────────────────────────────
export async function submitWholesale(formData, honeypot = '') {
  if (honeypot) return { success: true }
  if (!formData.firstName?.trim()) throw new Error('First name is required.')
  if (!formData.lastName?.trim()) throw new Error('Last name is required.')
  if (!formData.email?.trim() || !formData.email.includes('@')) throw new Error('A valid email address is required.')
  if (!formData.businessName?.trim()) throw new Error('Business name is required.')
  if (!checkRate('wholesale', formData.email)) throw new Error('Too many submissions. Please wait a few minutes and try again.')
  recordRate('wholesale', formData.email)

  if (FORM_TARGET === 'api') {
    const { ok, data } = await safeFetch('/api/wholesale', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData), credentials: 'include',
    })
    if (!ok) throw new Error(data?.error || data?.message || 'Submission failed.')
    return { success: true }
  }

  // HighLevel field key mapping — exact keys from HighLevel Custom Fields
  const body = {
    formId: HL_FORM_WHOLESALE,
    location_id: HL_LOCATION_ID,
    // Standard contact fields
    firstName: formData.firstName.trim(),
    lastName: formData.lastName.trim(),
    email: formData.email.trim().toLowerCase(),
    ...(formData.phone?.trim() && { phone: formData.phone.trim() }),
    ...(formData.businessName?.trim() && { companyName: formData.businessName.trim() }),
    ...(formData.website?.trim() && { website: formData.website.trim() }),
    ...(formData.city?.trim() && { city: formData.city.trim() }),
    ...(formData.state?.trim() && { state: formData.state.trim() }),
    // Custom fields — exact HighLevel keys
    ...(formData.storeType && { 'contact.store_type': formData.storeType }),
    ...(formData.retailChannel && { 'contact.retail_channel': formData.retailChannel }),
    ...(formData.numberOfLocations && { 'contact.number_of_locations': formData.numberOfLocations }),
    ...(formData.yearsInBusiness?.trim() && { 'contact.years_in_business': formData.yearsInBusiness.trim() }),
    ...(formData.existingBrands?.trim() && { 'contact.existing_apparel_brands': formData.existingBrands.trim() }),
    ...(formData.estimatedOpeningOrder && { 'contact.estimated_opening_order': formData.estimatedOpeningOrder }),
    ...(formData.collectionsOfInterest && { 'contact.liftd_collections_of_interest': formData.collectionsOfInterest }),
    ...(formData.resaleCertStatus && { 'contact.resale_certificate_status': formData.resaleCertStatus }),
    ...(formData.howHeard?.trim() && { 'contact.how_did_you_hear_about_liftd': formData.howHeard.trim() }),
    ...(formData.additionalNotes?.trim() && { 'contact.additional_notes': formData.additionalNotes.trim() }),
    // Consent
    ...(formData.consentEmail !== undefined && { email_opted_in: formData.consentEmail }),
    ...(formData.consentSms !== undefined && { sms_opted_in: formData.consentSms }),
    source: 'WearLiftedToday.com',
  }

  const { ok, status } = await safeFetch(HL_FORMS_ENDPOINT, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (ok || status === 201) return { success: true }
  throw new Error('Unable to submit your application. Please try again or contact us directly.')
}
