import React, { useEffect, useRef } from 'react'

function useLiftIn(ref) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.15 }
    )
    ref.current?.querySelectorAll('.lift-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

export default function Mission() {
  const ref = useRef(null)
  useLiftIn(ref)

  return (
    <section id="mission" ref={ref} style={{
      background: 'var(--warm-white)',
      padding: '100px 24px',
    }}>
      <div className="container">
        {/* Top quote */}
        <div className="lift-in" style={{ textAlign: 'center', marginBottom: 80 }}>
          <div className="section-eyebrow" style={{ textAlign: 'center' }}>The Brand Promise</div>
          <blockquote style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(26px, 4vw, 44px)',
            fontWeight: 700, color: 'var(--navy)',
            lineHeight: 1.25, maxWidth: 820, margin: '0 auto 24px',
            fontStyle: 'italic',
          }}>
            "Every person deserves a reminder that they are capable of more than they believe."
          </blockquote>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--gold)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            — Liftêd™ Core Mission
          </div>
          <div style={{ width: 60, height: 3, background: 'var(--gold)', borderRadius: 2, margin: '24px auto 0' }} />
        </div>

        {/* Dual impact */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, marginBottom: 80 }}>
          <div className="lift-in d1 card" style={{ padding: 40 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 12,
              background: 'linear-gradient(135deg, var(--gold-light), var(--gold))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24, marginBottom: 20,
            }}>↑</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>The Internal Lift</h3>
            <p style={{ fontSize: 15, color: 'var(--mid-gray)', lineHeight: 1.75 }}>
              Acts as a physical anchor for confidence and resilience. Reinforces personal growth and perseverance. Gives the wearer a private daily affirmation — a reminder to keep going.
            </p>
          </div>
          <div className="lift-in d2 card" style={{ padding: 40 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 12,
              background: 'linear-gradient(135deg, #5B8DB8, #3A6B9A)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24, color: 'white', marginBottom: 20,
            }}>✦</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>The External Radiance</h3>
            <p style={{ fontSize: 15, color: 'var(--mid-gray)', lineHeight: 1.75 }}>
              Communicates hope to anyone who reads the garment. Creates a natural opening for connection. Functions like an unexpected compliment delivered in public — a gift to the observer.
            </p>
          </div>
        </div>

        {/* Brand promise filter */}
        <div className="lift-in" style={{
          background: 'var(--navy)',
          borderRadius: 16, padding: '48px 48px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
        }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>The Brand Promise Filter</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 700, color: 'white', marginBottom: 16, maxWidth: 640 }}>
            Will this make someone feel better, stronger, more hopeful, or more confident?
          </h3>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            background: 'rgba(200,146,42,0.15)', border: '1.5px solid var(--gold)',
            borderRadius: 100, padding: '10px 28px', marginTop: 8,
          }}>
            <span style={{ fontSize: 20 }}>✓</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--gold)' }}>Yes — it belongs in Liftêd™.</span>
          </div>
        </div>
      </div>
    </section>
  )
}

