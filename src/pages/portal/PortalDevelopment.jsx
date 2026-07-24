import React from 'react'

export default function PortalDevelopment() {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--burnt-orange)', marginBottom: 12 }}>Development Status</div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 36px)', color: 'var(--off-white)', textTransform: 'uppercase', lineHeight: 1.05, marginBottom: 32 }}>Where We Are</h1>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 32, padding: '6px 14px', border: '1.5px solid var(--burnt-orange)', borderRadius: 'var(--radius)' }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--burnt-orange)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--burnt-orange)' }}>Pre-Revenue · Samples in Production</span>
        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
      </div>
      {[
        { title: 'Pre-Revenue Status', content: 'Liftêd™ is currently pre-revenue. No products have been sold to date. The brand is in the product development and validation phase, with the first private-label samples currently in production.' },
        { title: 'Sample Production', content: 'The first Liftêd™ private-label samples are currently being developed. These are not print-on-demand products — they are being produced with custom Liftêd™ labels, custom construction, and the full front-and-back message system.' },
        { title: 'Manufacturer Validation', content: 'Sample validation will confirm fabric quality, fit and sizing, sublimation print quality, color accuracy, label execution, comfort and breathability, wash durability, shrinkage and pilling resistance, and overall product experience.' },
        { title: 'Design Library', content: 'The founding design library includes concepts across all five collections. Designs are being developed in parallel with sample production. Founding community members and approved investors will receive design previews.' },
        { title: 'Current Milestones', content: 'Completed: Brand identity and naming, founding collection concept development, private-label manufacturer identification, sample production initiated, founding community building, investor portal development.' },
        { title: 'Upcoming Milestones', content: 'Pending: Sample receipt and validation, design finalization, founding community design vote, pre-order launch, first production run, wholesale outreach, e-commerce launch.' },
      ].map(s => (
        <div key={s.title} style={{ marginBottom: 32, paddingBottom: 32, borderBottom: '1px solid rgba(247,244,236,0.08)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--sand)', textTransform: 'uppercase', marginBottom: 12 }}>{s.title}</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'rgba(247,244,236,0.72)', lineHeight: 1.75 }}>{s.content}</p>
        </div>
      ))}
    </div>
  )
}
