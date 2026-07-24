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

export default function Impact() {
  const ref = useRef(null)
  useLiftIn(ref)

  return (
    <section ref={ref} style={{
      background: 'linear-gradient(160deg, #1A2744 0%, #2C3E6B 50%, #1A3A5C 100%)',
      padding: '100px 24px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', height: '60%',
        background: 'radial-gradient(ellipse at 50% 100%, rgba(200,146,42,0.2) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="lift-in" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>The Long-Term Vision</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, color: 'white', marginBottom: 20, maxWidth: 800, margin: '0 auto 20px' }}>
            More Than Apparel.<br />
            <span style={{ color: 'var(--gold)' }}>A Pick-Me-Up.</span>
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, maxWidth: 640, margin: '0 auto 40px' }}>
            The biggest opportunity is not becoming another T-shirt company. The opportunity is creating
            a recognizable symbol that instantly communicates hope, encouragement, resilience, and growth.
          </p>
          <div style={{ width: 60, height: 3, background: 'var(--gold)', borderRadius: 2, margin: '0 auto 40px' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, marginBottom: 64 }}>
          {[
            { icon: '🎓', title: 'Youth Sports Programs', desc: 'Donating apparel and support to youth athletic programs across the country.' },
            { icon: '🧠', title: 'Mental Health Organizations', desc: 'Partnering with organizations that support mental wellness and resilience.' },
            { icon: '🏫', title: 'School Initiatives', desc: 'Funding school programs that build confidence and community in young people.' },
            { icon: '🌍', title: 'The Movement', desc: 'When someone sees the Liftêd™ logo, the feeling should be the same as receiving an unexpected compliment.' },
          ].map((item, i) => (
            <div key={item.title} className={`lift-in d${i+1}`} style={{
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12, padding: 28, textAlign: 'center',
            }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{item.icon}</div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'white', marginBottom: 10 }}>{item.title}</h4>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="lift-in" style={{ textAlign: 'center' }}>
          <blockquote style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3vw, 30px)',
            fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', lineHeight: 1.4,
            maxWidth: 700, margin: '0 auto 32px',
          }}>
            "The world needs more people who refuse to quit. That's who we make this for."
          </blockquote>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--gold)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>— Liftêd™</div>
        </div>
      </div>
    </section>
  )
}
