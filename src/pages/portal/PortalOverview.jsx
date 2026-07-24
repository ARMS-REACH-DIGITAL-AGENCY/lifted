import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'

export default function PortalOverview() {
  const { user } = useAuth()
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--burnt-orange)', marginBottom: 12 }}>Welcome</div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 38px)', color: 'var(--off-white)', textTransform: 'uppercase', lineHeight: 1.05, marginBottom: 24 }}>The Liftêd™ Investor Portal</h1>
      <div style={{ background: 'rgba(199,106,50,0.08)', border: '1px solid rgba(199,106,50,0.3)', padding: '16px 20px', marginBottom: 32, borderLeft: '3px solid var(--burnt-orange)' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(247,244,236,0.65)', lineHeight: 1.7, margin: 0 }}>
          <strong style={{ color: 'var(--sand)' }}>Confidentiality Notice:</strong> This portal contains non-public, confidential information about Liftêd™. By accessing this portal, you agree to maintain the confidentiality of all materials and not to share, reproduce, or distribute any information without prior written consent from Liftêd™.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 40 }}>
        {[
          { label: 'Brand Thesis', to: '/investor-portal/brand', desc: 'Mission, consumer problem, and the Liftêd™ concept' },
          { label: 'Business Opportunity', to: '/investor-portal/opportunity', desc: 'Revenue model, target audiences, and growth strategy' },
          { label: 'Development Status', to: '/investor-portal/development', desc: 'Current stage, samples in production, milestones' },
          { label: 'Financial Information', to: '/investor-portal/financials', desc: 'Projections, funding needs, use of funds' },
          { label: 'Document Library', to: '/investor-portal/documents', desc: 'Pitch deck, executive summary, and supporting materials' },
          { label: 'Schedule a Call', to: '/investor-portal/schedule', desc: 'Book a conversation with the founder' },
        ].map(item => (
          <Link key={item.to} to={item.to} style={{ display: 'block', padding: '20px', background: 'rgba(247,244,236,0.04)', border: '1px solid rgba(247,244,236,0.1)', textDecoration: 'none', transition: 'border-color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--burnt-orange)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(247,244,236,0.1)'}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--off-white)', marginBottom: 8, textTransform: 'uppercase' }}>{item.label}</div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(247,244,236,0.5)', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
          </Link>
        ))}
      </div>
      <div style={{ padding: '20px', background: 'rgba(247,244,236,0.03)', border: '1px solid rgba(247,244,236,0.08)' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(247,244,236,0.4)', lineHeight: 1.7, margin: 0 }}>
          Information provided in this portal is for informational purposes only and does not constitute an offer to sell or a solicitation to purchase securities. Financial projections are estimates only and are not guaranteed. Liftêd™ is a pre-revenue brand in development.
        </p>
      </div>
    </div>
  )
}
