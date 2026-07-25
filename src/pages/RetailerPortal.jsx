/**
 * /retailer-portal — Protected retailer portal placeholder
 * Full functionality (pricing, line sheets, orders) to be built in Phase 2.
 * noindex: true
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { TM } from '../components/TM.jsx'

export default function RetailerPortal() {
  const { user, logout } = useAuth()
  return (
    <div style={{ minHeight: '100vh', background: 'var(--black)' }}>
      <header style={{ background: 'var(--charcoal)', borderBottom: '2px solid var(--burnt-orange)', padding: '0 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <img src="/brand/lifted/lifted-wordmark-white.png" alt="Liftêd™" style={{ height: 22 }} />
            </Link>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--burnt-orange)', borderLeft: '1px solid rgba(247,244,236,0.2)', paddingLeft: 12 }}>Retailer Portal</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(247,244,236,0.5)' }}>{user?.email}</span>
            <button onClick={logout} style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'none', border: '1px solid rgba(247,244,236,0.2)', color: 'rgba(247,244,236,0.6)', padding: '6px 12px', cursor: 'pointer', borderRadius: 'var(--radius)' }}>Sign Out</button>
          </div>
        </div>
      </header>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 20px' }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--burnt-orange)', marginBottom: 16 }}>Retailer Portal</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 44px)', color: 'var(--off-white)', textTransform: 'uppercase', lineHeight: 1.05, marginBottom: 24 }}>Welcome to Your Retailer Dashboard</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'rgba(247,244,236,0.65)', lineHeight: 1.7, marginBottom: 40 }}>Your retailer portal is being prepared. The following features will be available here:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 48 }}>
          {['Wholesale Pricing', 'Line Sheets', 'Product Catalogs', 'Order Forms', 'Reorder Tools', 'Account Documents', 'Retailer Resources', 'Support Contact'].map(f => (
            <div key={f} style={{ padding: '16px', background: 'rgba(247,244,236,0.04)', border: '1px solid rgba(247,244,236,0.08)', fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(247,244,236,0.5)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: 'var(--burnt-orange)', fontSize: 16 }}>◻</span> {f}
            </div>
          ))}
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(247,244,236,0.4)', lineHeight: 1.7 }}>
          Questions? Contact <a href="mailto:wholesale@wearliftedtoday.com" style={{ color: 'var(--sand)' }}>wholesale@wearliftedtoday.com</a>
        </p>
      </div>
    </div>
  )
}

