/**
 * ProtectedRoute — Liftêd<TM/>
 * Wraps portal routes that require authentication and a specific role.
 * Unauthenticated users are redirected to /investor-access or /investor-login.
 * Authenticated users without the required role see an access-denied message.
 */
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { TM } from '../components/TM.jsx'

export default function ProtectedRoute({ children, requiredRole = 'investor' }) {
  const { user, claims, loading, isInvestor, isRetailer, isAdmin } = useAuth()

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 40, height: 40, border: '3px solid var(--burnt-orange)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(247,244,236,0.5)', fontSize: 14 }}>Verifying access...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (!user) {
    // Not logged in — redirect to investor access request page
    return <Navigate to="/investor-access" replace />
  }

  const hasAccess =
    isAdmin ||
    (requiredRole === 'investor' && isInvestor) ||
    (requiredRole === 'retailer' && isRetailer)

  if (!hasAccess) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ maxWidth: 480, textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--burnt-orange)', marginBottom: 16 }}>Access Restricted</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--off-white)', marginBottom: 16, textTransform: 'uppercase' }}>You Don't Have Access to This Area</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'rgba(247,244,236,0.6)', lineHeight: 1.7, marginBottom: 28 }}>
            This section requires approved {requiredRole} access. If you believe this is an error, please contact us.
          </p>
          <a href="/investor-access" style={{ display: 'inline-block', fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'var(--burnt-orange)', color: 'var(--off-white)', textDecoration: 'none', padding: '12px 24px', borderRadius: 'var(--radius)' }}>Request Access</a>
        </div>
      </div>
    )
  }

  return children
}

