import React, { useEffect, useRef } from 'react'

export default function Hero() {
  const ref = useRef(null)
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.lift-in')
    const timer = setTimeout(() => els?.forEach(el => el.classList.add('visible')), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section ref={ref} style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #1A2744 0%, #2C3E6B 40%, #1A3A5C 70%, #0F1929 100%)',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      padding: '120px 24px 80px',
    }}>
      {/* Sunrise glow */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '120%', height: '55%',
        background: 'radial-gradient(ellipse at 50% 100%, rgba(200,146,42,0.28) 0%, rgba(200,146,42,0.08) 45%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      {/* Sky light */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '50%', height: '60%',
        background: 'radial-gradient(ellipse at 80% 20%, rgba(91,141,184,0.18) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 760 }}>
          <div className="lift-in" style={{ marginBottom: 20 }}>
            <span style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'var(--gold)', background: 'rgba(200,146,42,0.15)',
              border: '1px solid rgba(200,146,42,0.35)',
              padding: '5px 16px', borderRadius: 100,
            }}>More Than Apparel. A Pick-Me-Up.</span>
          </div>

          <h1 className="lift-in d1" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 8vw, 96px)',
            fontWeight: 900, color: 'white',
            lineHeight: 1.05, marginBottom: 28,
            letterSpacing: '-0.02em',
          }}>
            Wear What<br />
            <span style={{ color: 'var(--gold)' }}>Lifts You.</span>
          </h1>

          <p className="lift-in d2" style={{
            fontSize: 'clamp(17px, 2.2vw, 21px)',
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.7, maxWidth: 580, marginBottom: 44,
          }}>
            Every person deserves a reminder that they are capable of more than they believe.
            Liftêd™ turns encouragement into something you can wear — and share.
          </p>

          <div className="lift-in d3" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a href="#collections" className="btn btn-gold" style={{ fontSize: 15, padding: '16px 36px' }}>
              Explore Collections ↑
            </a>
            <a href="#contact" className="btn btn-outline" style={{ fontSize: 15, padding: '16px 36px', color: 'rgba(255,255,255,0.85)', borderColor: 'rgba(255,255,255,0.35)' }}>
              Partner With Us
            </a>
          </div>
        </div>
      </div>

      {/* Bottom tagline bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '20px 24px',
        display: 'flex', gap: 48, overflowX: 'auto',
      }}>
        <div className="container" style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
          {[
            { n: 'Rise Above.', d: 'The Internal Lift' },
            { n: 'Elevate Every Day.', d: 'The External Radiance' },
            { n: '#StayLiftêd', d: 'The Community' },
            { n: 'The World Needs More Liftêd™.', d: 'The Mission' },
          ].map(s => (
            <div key={s.n} style={{ whiteSpace: 'nowrap' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, color: 'var(--gold-light)' }}>{s.n}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 2 }}>{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
