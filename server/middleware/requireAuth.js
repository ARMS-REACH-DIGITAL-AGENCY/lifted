/**
 * Express middleware — verifies Firebase ID token and attaches decoded claims.
 * Usage: router.post('/protected', requireAuth, requireRole('investor'), handler)
 */
import { getAdminAuth } from '../lib/firebase-admin.js'

export async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid Authorization header' })
    }
    const idToken = authHeader.split('Bearer ')[1]
    const decoded = await getAdminAuth().verifyIdToken(idToken)
    req.user = decoded
    next()
  } catch (err) {
    console.error('requireAuth error:', err.message)
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

/**
 * Role guard — must be used after requireAuth.
 * Checks Firebase custom claims for the required role.
 */
export function requireRole(role) {
  return (req, res, next) => {
    const claims = req.user
    if (!claims) return res.status(401).json({ error: 'Not authenticated' })
    // admin can access everything
    if (claims.role === 'admin' || claims.admin === true) return next()
    if (claims.role !== role && claims[role] !== true) {
      return res.status(403).json({ error: `Requires ${role} role` })
    }
    next()
  }
}
