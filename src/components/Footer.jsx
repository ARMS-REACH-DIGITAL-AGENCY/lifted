import React from 'react'
import { Link } from 'react-router-dom'
import { LiftedLogo } from './LiftedLogo.jsx'
import { TM } from '../components/TM.jsx'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ background: 'var(--black)', color: 'rgba(247,244,236,0.6)', padding: '56px 0 28px', borderTop: '2px solid var(--burnt-orange)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 40 }}>
          <div>
            <Link to="/" style={{ display: 'inline-block', marginBottom: 14 }}>
              <LiftedLogo variant="light" height={80} />
            </Link>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.65, marginBottom: 10 }}>More Than Apparel. A Pick-Me-Up.</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontStyle: 'italic', color: 'rgba(247,244,236,0.35)' }}>The World Needs More Liftêd™.</p>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--burnt-orange)', marginBottom: 14 }}>NAVIGATE</div>
            {[['/', 'Home'], ['/story', 'Our Story'], ['/collections', 'Collections'], ['/collaborate', 'Collaborate'], ['/wholesale', 'Wholesale'], ['/shop', 'Shop']].map(([to, label]) => (
              <Link key={to} to={to} style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(247,244,236,0.6)', marginBottom: 9, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--burnt-orange)', marginBottom: 14 }}>GET INVOLVED</div>
            {[['/founding-community', 'Join Community'], ['/support', 'Help Bring Liftêd™ to Life'], ['/schedule', 'Schedule a Call'], ['/scan', 'Scan a QR Code'], ['/sample', 'Sample Feedback']].map(([to, label]) => (
              <Link key={to} to={to} style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(247,244,236,0.6)', marginBottom: 9, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--burnt-orange)', marginBottom: 14 }}>JOIN US</div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.65, marginBottom: 18 }}>Be part of the founding community. Help bring Liftêd™ to market.</p>
            <Link to="/founding-community" style={{
              display: 'inline-block', fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              background: 'var(--sand)', color: 'var(--black)',
              textDecoration: 'none', padding: '10px 18px', borderRadius: 'var(--radius)',
            }}>Join the Founding Community</Link>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(247,244,236,0.1)', paddingTop: 20, display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 12 }}>© {year} Liftêd™. All rights reserved. Liftêd™ is a trademark of ARMS Reach Digital Agency.</p>
          <div style={{ display: 'flex', gap: 18 }}>
            <Link to="/privacy" style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(247,244,236,0.45)', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link to="/terms" style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(247,244,236,0.45)', textDecoration: 'none' }}>Terms of Use</Link>
            <Link to="/investor-access" style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(247,244,236,0.3)', textDecoration: 'none' }}>Private Investor Access</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
