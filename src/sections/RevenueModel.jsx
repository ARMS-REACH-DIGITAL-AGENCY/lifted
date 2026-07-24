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

const streams = [
  { icon: '🛒', title: 'Direct-to-Consumer', aov: '$45–$75 AOV', desc: 'Website sales that validate demand, build first-party customer data, and establish hero products.', tag: 'DTC' },
  { icon: '📦', title: 'The Liftêd™ Box', aov: '$29–$49/month', desc: 'Monthly subscription delivering inspirational apparel, wristbands, stickers, personal growth cards, and motivational content.', tag: 'Recurring' },
  { icon: '🏫', title: 'Team & School Programs', aov: 'Bulk orders', desc: 'Custom editions like "Liftêd Wildcats Edition" with fundraising opportunities for schools and athletic programs.', tag: 'B2B' },
  { icon: '🏢', title: 'Corporate Programs', aov: 'Enterprise', desc: 'Employee wellness apparel, leadership gifts, and team-building merchandise for mission-aligned organizations.', tag: 'B2B' },
  { icon: '🤝', title: 'Collaborations', aov: 'Partner-led', desc: 'Co-branded collections for companies, churches, nonprofits, causes, and events. Liftêd™ × Partner editions.', tag: 'Collab' },
  { icon: '⚖️', title: 'Licensing', aov: 'IP Revenue', desc: 'Scalable IP use for schools, sports organizations, youth programs, and nonprofits with lower inventory exposure.', tag: 'Licensing' },
]

export default function RevenueModel() {
  const ref = useRef(null)
  useLiftIn(ref)

  return (
    <section ref={ref} style={{ background: 'var(--navy)', padding: '100px 24px' }}>
      <div className="container">
        <div className="lift-in" style={{ marginBottom: 60 }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>The Business Model</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, color: 'white', marginBottom: 20 }}>A Diversified Revenue Engine</h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, maxWidth: 620 }}>
            The apparel is the first delivery system. The meaning is the scalable product.
            Multiple channels create multiple reasons to buy, renew, partner, and license.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 64 }}>
          {streams.map((s, i) => (
            <div key={s.title} className={`lift-in d${i+1}`} style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12, padding: 28,
              transition: 'background 0.25s, border-color 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,146,42,0.1)'; e.currentTarget.style.borderColor = 'rgba(200,146,42,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <span style={{ fontSize: 28 }}>{s.icon}</span>
                <span style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'var(--gold)', background: 'rgba(200,146,42,0.15)',
                  border: '1px solid rgba(200,146,42,0.3)', borderRadius: 100, padding: '3px 10px',
                }}>{s.tag}</span>
              </div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 6 }}>{s.title}</h4>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--gold)', marginBottom: 10 }}>{s.aov}</div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Key quote */}
        <div className="lift-in" style={{
          borderLeft: '4px solid var(--gold)', paddingLeft: 28,
          maxWidth: 700,
        }}>
          <blockquote style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 2.5vw, 24px)', fontStyle: 'italic', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>
            "Liftêd™ collaborations sell alignment. Custom services sell capability. Both create revenue; only one carries the consumer brand."
          </blockquote>
        </div>
      </div>
    </section>
  )
}
