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

const collections = [
  {
    name: 'Core Collection',
    icon: '◈',
    color: '#C8922A',
    bg: 'rgba(200,146,42,0.08)',
    border: 'rgba(200,146,42,0.25)',
    desc: 'Simple, elegant brand affinity for everyday wear. The foundation of the Liftêd™ identity.',
    messages: ['Liftêd™', 'Stay Liftêd™', 'Lift Others', 'Lifted Mindset'],
    products: 'Tees · Hoodies · Hats · Joggers · Quarter-zips',
  },
  {
    name: 'Pick-Me-Up Collection',
    icon: '↑',
    color: '#5B8DB8',
    bg: 'rgba(91,141,184,0.08)',
    border: 'rgba(91,141,184,0.25)',
    desc: 'Direct, explicit messages of encouragement and resilience. For the days that need it most.',
    messages: ['One More Day', 'Keep Going', 'Better Than Yesterday', 'Your Story Isn\'t Over'],
    products: 'Message tees · Hoodies · Sweatshirts',
  },
  {
    name: 'Athlete Collection',
    icon: '⚡',
    color: '#1A2744',
    bg: 'rgba(26,39,68,0.06)',
    border: 'rgba(26,39,68,0.2)',
    desc: 'Sports-inspired motivation centered on discipline, the grind, and earning tomorrow.',
    messages: ['Never Finished', 'Earn Tomorrow', 'Outwork Yesterday', 'Respect the Grind'],
    products: 'Performance tees · Training gear · Shorts',
  },
  {
    name: 'Youth Collection',
    icon: '★',
    color: '#7B9E4A',
    bg: 'rgba(123,158,74,0.08)',
    border: 'rgba(123,158,74,0.25)',
    desc: 'Positive messaging for teens building confidence and identity. The next generation of Liftêd™.',
    messages: ['You Matter', 'Believe Bigger', 'Future Looks Good On You', 'Stronger Than You Think'],
    products: 'Youth tees · Hoodies · Hats',
  },
  {
    name: 'Alumni Collection',
    icon: '◎',
    color: '#8B4513',
    bg: 'rgba(139,69,19,0.08)',
    border: 'rgba(139,69,19,0.25)',
    desc: 'Connection, pride, and identity after graduation. The strategic wedge into school ecosystems.',
    messages: ['Once a Wildcat. Always Liftêd™.', 'Alumni Strong', 'The Journey Continues', 'Beyond Graduation'],
    products: 'Custom school editions · Fundraising gear',
  },
]

export default function Collections() {
  const ref = useRef(null)
  useLiftIn(ref)

  return (
    <section id="collections" ref={ref} style={{
      background: 'var(--off-white)',
      padding: '100px 24px',
    }}>
      <div className="container">
        <div className="lift-in" style={{ marginBottom: 60 }}>
          <div className="section-eyebrow">Five Collections. One Meaning.</div>
          <h2 className="section-title">The Product Constellation</h2>
          <p className="section-body">
            A portfolio designed to follow the customer through different identities and stages of life —
            without ever abandoning the single promise that holds it all together.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {collections.map((c, i) => (
            <div key={c.name} className={`lift-in d${i + 1} card`} style={{
              padding: 32,
              border: `1.5px solid ${c.border}`,
              background: c.bg,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 10,
                background: c.color, color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, fontWeight: 700, marginBottom: 20,
              }}>{c.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 10 }}>{c.name}</h3>
              <p style={{ fontSize: 14, color: 'var(--mid-gray)', lineHeight: 1.7, marginBottom: 20 }}>{c.desc}</p>
              <div style={{ marginBottom: 16 }}>
                {c.messages.map(m => (
                  <span key={m} style={{
                    display: 'inline-block', fontSize: 12, fontWeight: 600,
                    color: c.color, background: `${c.bg}`,
                    border: `1px solid ${c.border}`,
                    borderRadius: 100, padding: '3px 10px', margin: '3px 4px 3px 0',
                  }}>{m}</span>
                ))}
              </div>
              <p style={{ fontSize: 12, color: 'var(--mid-gray)', fontStyle: 'italic' }}>{c.products}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
