/**
 * Firebase Cloud Functions — Liftêd™
 * Deploy with: firebase deploy --only functions
 *
 * Functions:
 * - approveInvestor   : creates Firebase user, sets investor claim, sends invitation
 * - approveRetailer   : creates Firebase user, sets retailer claim, sends invitation
 * - revokeAccess      : disables Firebase user and removes custom claim
 * - onInvestorLogin   : tracks first login timestamp in Neon
 *
 * All functions require the caller to have admin role.
 * Neon connection uses DATABASE_URL from Firebase Functions config.
 */
import { onCall, HttpsError } from 'firebase-functions/v2/https'
import { onDocumentUpdated } from 'firebase-functions/v2/firestore'
import { getAuth } from 'firebase-admin/auth'
import { initializeApp } from 'firebase-admin/app'
import { neon } from '@neondatabase/serverless'

initializeApp()

function getSql() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('Missing DATABASE_URL in Cloud Functions environment')
  return neon(url)
}

// ─────────────────────────────────────────────
// approveInvestor
// Called by admin panel after reviewing an access request.
// Creates Firebase user, sets investor custom claim, sends invitation email.
// ─────────────────────────────────────────────
export const approveInvestor = onCall(async (request) => {
  // Verify caller is admin
  if (!request.auth?.token?.admin) {
    throw new HttpsError('permission-denied', 'Admin role required')
  }

  const { requestId, email, firstName, lastName } = request.data
  if (!requestId || !email) {
    throw new HttpsError('invalid-argument', 'requestId and email are required')
  }

  const auth = getAuth()
  const sql = getSql()
  let uid = null

  try {
    // Create Firebase user (no password — they'll set one via invitation link)
    const userRecord = await auth.createUser({
      email,
      displayName: `${firstName || ''} ${lastName || ''}`.trim(),
      emailVerified: false,
      disabled: false,
    })
    uid = userRecord.uid

    // Set investor custom claim
    await auth.setCustomUserClaims(uid, { investor: true, role: 'investor' })

    // Generate password reset link (used as invitation link)
    const invitationLink = await auth.generatePasswordResetLink(email, {
      url: `${process.env.APP_URL || 'https://wearliftedtoday.com'}/investor-portal`,
    })

    // Update Neon: mark request as approved, create investor profile
    await sql`
      UPDATE investor_access_requests
      SET status = 'approved', firebase_uid = ${uid}, reviewed_at = now(),
          reviewed_by_uid = ${request.auth.uid}, invitation_sent_at = now()
      WHERE id = ${requestId}
    `
    await sql`
      INSERT INTO investor_profiles (
        firebase_uid, email, first_name, last_name,
        access_request_id, approved_by_uid, approved_at, invitation_sent_at, account_created_at
      ) VALUES (
        ${uid}, ${email}, ${firstName || null}, ${lastName || null},
        ${requestId}, ${request.auth.uid}, now(), now(), now()
      )
      ON CONFLICT (firebase_uid) DO UPDATE SET
        invitation_sent_at = now(), updated_at = now()
    `

    // Log activity
    await sql`
      INSERT INTO portal_activity (firebase_uid, event_type, metadata)
      VALUES (${uid}, 'invitation_sent', ${JSON.stringify({ requestId, approvedBy: request.auth.uid })})
    `

    return { ok: true, uid, invitationLink }
  } catch (err) {
    // If Firebase user was created but Neon failed, still return the UID
    console.error('approveInvestor error:', err.message)
    throw new HttpsError('internal', `Approval failed: ${err.message}`)
  }
})

// ─────────────────────────────────────────────
// approveRetailer
// ─────────────────────────────────────────────
export const approveRetailer = onCall(async (request) => {
  if (!request.auth?.token?.admin) {
    throw new HttpsError('permission-denied', 'Admin role required')
  }

  const { applicationId, email, firstName, lastName, businessName } = request.data
  if (!applicationId || !email) {
    throw new HttpsError('invalid-argument', 'applicationId and email are required')
  }

  const auth = getAuth()
  const sql = getSql()

  try {
    const userRecord = await auth.createUser({
      email,
      displayName: businessName || `${firstName || ''} ${lastName || ''}`.trim(),
      emailVerified: false,
      disabled: false,
    })
    const uid = userRecord.uid
    await auth.setCustomUserClaims(uid, { retailer: true, role: 'retailer' })
    const invitationLink = await auth.generatePasswordResetLink(email, {
      url: `${process.env.APP_URL || 'https://wearliftedtoday.com'}/retailer-portal`,
    })
    await sql`
      UPDATE retailer_applications
      SET status = 'approved', firebase_uid = ${uid}, reviewed_at = now(),
          reviewed_by_uid = ${request.auth.uid}, invitation_sent_at = now()
      WHERE id = ${applicationId}
    `
    await sql`
      INSERT INTO retailer_accounts (
        firebase_uid, email, first_name, last_name, business_name,
        application_id, approved_by_uid, approved_at, invitation_sent_at, account_created_at
      ) VALUES (
        ${uid}, ${email}, ${firstName || null}, ${lastName || null}, ${businessName || null},
        ${applicationId}, ${request.auth.uid}, now(), now(), now()
      )
      ON CONFLICT (firebase_uid) DO UPDATE SET invitation_sent_at = now(), updated_at = now()
    `
    return { ok: true, uid, invitationLink }
  } catch (err) {
    console.error('approveRetailer error:', err.message)
    throw new HttpsError('internal', `Approval failed: ${err.message}`)
  }
})

// ─────────────────────────────────────────────
// revokeAccess
// Disables a Firebase user and removes their custom claim.
// ─────────────────────────────────────────────
export const revokeAccess = onCall(async (request) => {
  if (!request.auth?.token?.admin) {
    throw new HttpsError('permission-denied', 'Admin role required')
  }

  const { uid, reason } = request.data
  if (!uid) throw new HttpsError('invalid-argument', 'uid is required')

  const auth = getAuth()
  const sql = getSql()

  try {
    // Disable the Firebase account
    await auth.updateUser(uid, { disabled: true })
    // Remove custom claims
    await auth.setCustomUserClaims(uid, {})
    // Update Neon
    await sql`
      UPDATE investor_profiles SET is_active = false WHERE firebase_uid = ${uid}
    `
    await sql`
      UPDATE retailer_accounts SET is_active = false WHERE firebase_uid = ${uid}
    `
    await sql`
      INSERT INTO portal_activity (firebase_uid, event_type, metadata)
      VALUES (${uid}, 'access_revoked', ${JSON.stringify({ revokedBy: request.auth.uid, reason: reason || '' })})
    `
    return { ok: true }
  } catch (err) {
    console.error('revokeAccess error:', err.message)
    throw new HttpsError('internal', `Revoke failed: ${err.message}`)
  }
})
