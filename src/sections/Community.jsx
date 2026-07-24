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

const audiences = [
  { label: 'Fitness & Athletics', color: '#C8922A', items: ['Athletes', 'Gym Culture', 'Coaches'], focus: 'Wants daily encouragement and performance motivation.' },
  { label: 'Mental Wellness', color: '#5B8DB8', items: ['Mental health advocates', 'Faith-based consumers', 'Overcoming challenges'], focus: 'Seeks positive messaging and hope.' },
  { label: 'Personal Development', color: '#7B9E4A', items: ['Entrepreneurs', 'Students', 'Teachers & Parents'], focus: 'Believes in self-improvement and progress.' },
]

const flywheel = [
  { n: '01', title: 'Social Content & Ambassadors', desc: 'Short-form inspirational stories on Instagram, TikTok, and YouTube Shorts — featuring coaches, veterans, athletes, and everyday heroes.' },
  { n: '02', title: 'Drives Sales', desc: 'Customers purchase products to wear their inspiration. Every garment becomes a moving message in the world.' },
  { n: '03', title: '100-Item Community Impact', desc: 'For every 100 items sold, Liftêd™ donates apparel or support to youth sports, mental health organizations, or school initiatives.' },
  { n: '04', title: 'User Generated Content', desc: 'The #StayLiftêd campaign asks: "What helped lift you today?" Weekly submissions create authentic content and community.' },
]

export default function Community() {
  const ref = useRef(null)
  useLiftIn(ref)

  return (
    <section id="community" ref={ref} style={{ background: 'var(--off-white)', padding: '100px 24px' }}>
      <div className="container">
        <div className="lift-in" style={{ marginBottom: 60 }}>
          <div className="section-eyebrow">The Everyday Hero</div>
          <h2 className="section-title">The Liftêd™ Community</h2>
          <p className="section-body">
            Ages 15–45, unified more by mindset than demographics. The audience values self-improvement,
            motivational content, gym culture, mental wellness, perseverance, and daily encouragement.
          </p>
        </div>

        {/* Audience circles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, marginBottom: 80 }}>
          {audiences.map((a, i) => (
            <div key={a.label} className={`lift-in d${i+1} card`} style={{ padding: 32, borderTop: `4px solid ${a.color}` }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>{a.label}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                {a.items.map(item => (
                  <span key={item} style={{
                    fontSize: 12, fontWeight: 600, color: a.color,
                    background: `${a.color}18`, border: `1px solid ${a.color}40`,
                    borderRadius: 100, padding: '3px 10px',
                  }}>{item}</span>
                ))}
              </div>
              <p style={{ fontSize: 13, color: 'var(--mid-gray)', fontStyle: 'italic' }}>Focus: {a.focus}</p>
            </div>
          ))}
        </div>

        {/* Flywheel */}
        <div className="lift-in" style={{ marginBottom: 40 }}>
          <div className="section-eyebrow">The Growth Engine</div>
          <h2 className="section-title">The Marketing & Impact Flywheel</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          {flywheel.map((f, i) => (
            <div key={f.n} className={`lift-in d${i+1} card`} style={{ padding: 28 }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 900,
                color: 'var(--gold)', lineHeight: 1, marginBottom: 12, opacity: 0.6,
              }}>{f.n}</div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 10 }}>{f.title}</h4>
              <p style={{ fontSize: 14, color: 'var(--mid-gray)', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
