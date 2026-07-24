import React from 'react'

export default function PortalMarket() {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--burnt-orange)', marginBottom: 12 }}>Market Opportunity</div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 36px)', color: 'var(--off-white)', textTransform: 'uppercase', lineHeight: 1.05, marginBottom: 32 }}>The Market</h1>
      <div style={{ background: 'rgba(199,106,50,0.08)', border: '1px solid rgba(199,106,50,0.2)', padding: '14px 18px', marginBottom: 32, borderLeft: '3px solid var(--burnt-orange)' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(247,244,236,0.55)', margin: 0 }}>Market data and competitive analysis will be added to this section. Detailed market research documents are available in the Document Library.</p>
      </div>
      {[
        { title: 'Industry Overview', content: 'The U.S. custom and branded apparel market represents a multi-billion dollar opportunity. The intersection of wellness culture, personal development, and purpose-driven consumer behavior creates a specific and underserved niche for emotionally resonant apparel.' },
        { title: 'Audience Opportunity', content: 'Liftêd™ targets audiences that are already organized, already purchasing branded apparel, and already motivated by encouragement and community. Fitness communities, youth programs, churches, and corporate wellness programs represent high-density, high-repeat purchasing audiences.' },
        { title: 'Competitive Positioning', content: 'Liftêd™ is not competing with general athletic apparel brands. It occupies a distinct position: purpose-driven, message-forward, private-label apparel designed specifically for the encouragement category. No major brand currently owns this positioning.' },
        { title: 'Differentiation', content: 'Key differentiators: (1) The front-and-back message system — no other brand does this consistently; (2) Private-label construction — not a print-on-demand product; (3) The collaboration engine — organizations co-create rather than just purchase; (4) The L-hand gesture reclamation — a cultural moment with viral potential.' },
      ].map(s => (
        <div key={s.title} style={{ marginBottom: 32, paddingBottom: 32, borderBottom: '1px solid rgba(247,244,236,0.08)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--sand)', textTransform: 'uppercase', marginBottom: 12 }}>{s.title}</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'rgba(247,244,236,0.72)', lineHeight: 1.75 }}>{s.content}</p>
        </div>
      ))}
    </div>
  )
}
