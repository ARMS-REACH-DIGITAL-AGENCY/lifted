/**
 * /investor-portal — Protected investor portal shell
 * All sub-routes are protected by ProtectedRoute with requiredRole="investor"
 * noindex: true — must not appear in search results
 */
import React from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'

const NAV_ITEMS = [
  { to: '/investor-portal/overview',     label: 'Welcome' },
  { to: '/investor-portal/brand',        label: 'Brand Thesis' },
  { to: '/investor-portal/opportunity',  label: 'Business Opportunity' },
  { to: '/investor-portal/market',       label: 'Market Opportunity' },
  { to: '/investor-portal/development',  label: 'Development Status' },
  { to: '/investor-portal/financials',   label: 'Financial Information' },
  { to: '/investor-portal/documents',    label: 'Document Library' },
  { to: '/investor-portal/schedule',     label: 'Schedule a Call' },
]

export default function InvestorPortal() {
  const { user, logout } = useAuth()
  const location = useLocation()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--black)', display: 'flex', flexDirection: 'column' }}>
      {/* Portal header */}
      <header style={{ background: 'var(--charcoal)', borderBottom: '2px solid var(--burnt-orange)', padding: '0 20px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <img src="/brand/lifted/lifted-wordmark-white.png" alt="Liftêd™" style={{ height: 22 }} />
            </Link>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--burnt-orange)', borderLeft: '1px solid rgba(247,244,236,0.2)', paddingLeft: 12 }}>Investor Portal</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(247,244,236,0.5)' }}>{user?.email}</span>
            <button onClick={logout} style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'none', border: '1px solid rgba(247,244,236,0.2)', color: 'rgba(247,244,236,0.6)', padding: '6px 12px', cursor: 'pointer', borderRadius: 'var(--radius)' }}>Sign Out</button>
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar nav */}
        <aside style={{ width: 220, background: 'rgba(247,244,236,0.03)', borderRight: '1px solid rgba(247,244,236,0.08)', padding: '24px 0', flexShrink: 0 }} className="portal-sidebar">
          {NAV_ITEMS.map(item => (
            <Link key={item.to} to={item.to} style={{
              display: 'block', padding: '11px 20px',
              fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: location.pathname === item.to ? 700 : 400,
              color: location.pathname === item.to ? 'var(--sand)' : 'rgba(247,244,236,0.55)',
              textDecoration: 'none',
              borderLeft: location.pathname === item.to ? '3px solid var(--burnt-orange)' : '3px solid transparent',
              background: location.pathname === item.to ? 'rgba(247,244,236,0.04)' : 'transparent',
            }}>{item.label}</Link>
          ))}
          <div style={{ margin: '24px 20px 0', padding: '12px', background: 'rgba(199,106,50,0.08)', border: '1px solid rgba(199,106,50,0.2)', borderRadius: 'var(--radius)' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(247,244,236,0.4)', lineHeight: 1.6 }}>
              This portal contains confidential information. Do not share access credentials or portal content.
            </p>
          </div>
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, padding: '40px 32px', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .portal-sidebar { display: none; }
        }
      `}</style>
    </div>
  )
}
