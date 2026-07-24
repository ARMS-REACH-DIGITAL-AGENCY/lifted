import React, { useEffect, useRef } from 'react'

function useLiftIn(ref) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    ref.current?.querySelectorAll('.lift-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

const phases = [
  {
    phase: 'Phase 1', name: 'Basecamp', subtitle: 'Brand Foundation',
    milestone: 'First 100 Sales', target: '2,500 customers · $55 AOV · $137,500 Revenue',
    items: ['Brand refinement & logo', 'Shopify store launch', '10 initial designs', 'Social media setup', 'Production validation'],
    color: '#C8922A', year: 'Year 1',
  },
  {
    phase: 'Phase 2', name: 'The Climb', subtitle: 'Community Growth',
    milestone: '1,000 Customers', target: '7,500 customers · $60 AOV · $450,000 Revenue',
    items: ['Influencer partnerships', 'Ambassador program', 'Referral system', 'Founding collaborations', 'Subscription launch'],
    color: '#5B8DB8', year: 'Year 2',
  },
  {
    phase: 'Phase 3', name: 'The Summit', subtitle: 'National Expansion',
    milestone: '10,000 Customers', target: '20,000 customers · $65 AOV · $1.3M+ Revenue',
    items: ['School partnerships', 'Sports partnerships', 'Corporate gifting rollout', 'Retail & licensing', 'Scaled B2B programs'],
    color: '#7B9E4A', year: 'Year 3',
  },
]

export default function Roadmap() {
  const ref = useRef(null)
  useLiftIn(ref)

  return (
    <section ref={ref} style={{ background: 'var(--warm-white)', padding: '100px 24px' }}>
      <div className="container">
        <div className="lift-in" style={{ marginBottom: 60 }}>
          <div className="section-eyebrow">The Ascension Roadmap</div>
          <h2 className="section-title">A Disciplined Path to Scale</h2>
          <p className="section-body">
            Three phases from proof of demand to repeatable national distribution —
            each milestone unlocking the next level of growth.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28, marginBottom: 64 }}>
          {phases.map((p, i) => (
            <div key={p.phase} className={`lift-in d${i+1} card`} style={{
              padding: 36, borderTop: `4px solid ${p.color}`, position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 16, right: 20,
                fontFamily: 'var(--font-display)', fontSize: 64, fontWeight: 900,
                color: `${p.color}12`, lineHeight: 1,
              }}>{i + 1}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: p.color, marginBottom: 8 }}>{p.phase}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>{p.name}</h3>
              <p style={{ fontSize: 14, color: 'var(--mid-gray)', marginBottom: 20 }}>{p.subtitle}</p>
              <div style={{
                display: 'inline-block', background: `${p.color}18`, border: `1px solid ${p.color}40`,
                borderRadius: 100, padding: '6px 16px', marginBottom: 20,
                fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, color: p.color,
              }}>Milestone: {p.milestone}</div>
              <ul style={{ listStyle: 'none', marginBottom: 20 }}>
                {p.items.map(item => (
                  <li key={item} style={{ fontSize: 14, color: 'var(--mid-gray)', padding: '4px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: p.color, fontWeight: 700 }}>→</span> {item}
                  </li>
                ))}
              </ul>
              <div style={{ borderTop: '1px solid var(--light-gray)', paddingTop: 16 }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mid-gray)', marginBottom: 4 }}>{p.year} Target</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600, color: 'var(--navy)' }}>{p.target}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="lift-in" style={{
          background: 'var(--navy)', borderRadius: 16, padding: '40px 48px',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32,
        }}>
          {[
            { n: '$137K', l: 'Year 1 Revenue Target' },
            { n: '$450K', l: 'Year 2 Revenue Target' },
            { n: '$1.3M+', l: 'Year 3 Revenue Target' },
            { n: '20,000', l: 'Year 3 Customer Target' },
          ].map(s => (
            <div key={s.n} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 900, color: 'var(--gold)', lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 8, letterSpacing: '0.04em' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
