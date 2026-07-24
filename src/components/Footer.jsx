import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ background: 'var(--navy-deep)', color: 'rgba(255,255,255,0.6)', padding: '64px 0 32px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <img src="/images/lifted-logo-icon.png" alt="Liftêd™" style={{ width: 32, height: 32, borderRadius: 5 }} />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'white' }}>Liftêd™</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>More Than Apparel. A Pick-Me-Up.</p>
            <p style={{ fontSize: 13, fontStyle: 'italic', color: 'rgba(255,255,255,0.4)' }}>The World Needs More Liftêd™.</p>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>Navigate</div>
            {[['/', 'Home'], ['/story', 'Our Story'], ['/collections', 'Collections'], ['/collaborate', 'Collaborate'], ['/founding-community', 'Founding Community']].map(([to, label]) => (
              <Link key={to} to={to} style={{ display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 10 }}>{label}</Link>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>Get Involved</div>
            {[['/invest', 'Invest'], ['/schedule', 'Schedule a Call'], ['/scan', 'Scan a QR Code'], ['/sample', 'Sample Feedback']].map(([to, label]) => (
              <Link key={to} to={to} style={{ display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 10 }}>{label}</Link>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>Join Us</div>
            <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>Be part of the founding community. Help bring Liftêd™ to market.</p>
            <Link to="/founding-community" className="btn btn-gold btn-sm">Join the Founding Community</Link>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: 13 }}>© {year} Liftêd™. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 20 }}>
            <Link to="/privacy" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Privacy Policy</Link>
            <Link to="/terms" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Terms of Use</Link>
          </div>
        </div>
        <div style={{ marginTop: 16, padding: '12px 16px', background: 'rgba(255,255,255,0.04)', borderRadius: 6, fontSize: 12, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>
          Investment Disclaimer: Nothing on this website constitutes an offer to sell or a solicitation of an offer to buy any securities. Any investment-related information is provided for informational purposes only. Liftêd™ is a pre-revenue brand in development.
        </div>
      </div>
    </footer>
  )
}
