/**
 * HighLevel (GoHighLevel) API integration — Liftêd™
 * Location ID: aONTFrcg4GyEubg0xdwW (Liftêd sub-account)
 * API key comes from HIGHLEVEL_API_KEY (Vercel env var, never committed).
 */
const HL_BASE = 'https://rest.gohighlevel.com/v1'
const HL_LOCATION_ID = process.env.HIGHLEVEL_LOCATION_ID || 'aONTFrcg4GyEubg0xdwW'

function hlHeaders() {
  const key = process.env.HIGHLEVEL_API_KEY
  if (!key) throw new Error('Missing HIGHLEVEL_API_KEY environment variable')
  return {
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
  }
}

/**
 * Create or update a HighLevel contact.
 * Returns { contactId }
 */
export async function upsertHLContact({ email, firstName, lastName, phone, company, tags = [], customFields = {} }) {
  const body = {
    locationId: HL_LOCATION_ID,
    email,
    firstName,
    lastName,
    phone,
    companyName: company,
    tags,
    customFields: Object.entries(customFields).map(([key, value]) => ({ key, value })),
  }
  const res = await fetch(`${HL_BASE}/contacts/upsert`, {
    method: 'POST',
    headers: hlHeaders(),
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`HighLevel upsert failed: ${res.status} ${err}`)
  }
  const data = await res.json()
  return { contactId: data.contact?.id || data.id }
}

/**
 * Add a contact to a pipeline opportunity.
 */
export async function addHLOpportunity({ contactId, pipelineId, stageId, name }) {
  const body = {
    locationId: HL_LOCATION_ID,
    contactId,
    pipelineId,
    pipelineStageId: stageId,
    name: name || 'New Opportunity',
    status: 'open',
  }
  const res = await fetch(`${HL_BASE}/opportunities`, {
    method: 'POST',
    headers: hlHeaders(),
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`HighLevel opportunity failed: ${res.status} ${err}`)
  }
  const data = await res.json()
  return { opportunityId: data.opportunity?.id || data.id }
}
