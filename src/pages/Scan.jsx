import React, { useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import LiftForm from '../components/LiftForm.jsx'

export default function Scan() {
  const [params] = useSearchParams()
  const source = params.get('source') || 'qr-scan'
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.lift-in').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ paddingTop: 68 }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(160deg, #0F1A30 0%, #1A2744 100%)', padding: '80px 0 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', height: '60%', background: 'radial-gradient(ellipse at 50% 100%, rgba(200,146,42,0.2) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div className="lift-in" style={{ display: 'inline-block', background: 'rgba(200,146,42,0.15)', border: '1px solid rgba(200,146,42,0.4)', borderRadius: 100, padding: '6px 20px', marginBottom: 24 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>You Found Liftêd™</span>
          </div>
          <h1 className="lift-in d1" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: 20 }}>
            You Found Liftêd™<br /><span style={{ color: 'var(--gold)' }}>Before the Official Launch.</span>
          </h1>
          <p className="lift-in d2" style={{ fontSize: 18, color: 'rgba(255,255,255,0.75)', maxWidth: 580, margin: '0 auto 16px', lineHeight: 1.7 }}>
            The message that brought you here is part of a new apparel brand built around encouragement, resilience, hope, and people lifting people.
          </p>
          <p className="lift-in d3" style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', maxWidth: 480, margin: '0 auto 40px', fontStyle: 'italic' }}>
            Our first private-label samples are currently in development. Choose how you would like to become involved.
          </p>
          <p className="lift-in d4" style={{ fontSize: 14, color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.08em' }}>Pass It On. Scan to Find Your Lift.</p>
        </div>
      </section>

      {/* CTA Buttons */}
      <section style={{ background: 'var(--cream)', padding: '64px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, maxWidth: 900, margin: '0 auto' }}>
            {[
              { label: 'Join the Founding Community', to: '/founding-community', primary: true },
              { label: 'View the First Messages', to: '/collections', primary: false },
              { label: 'Request a Sample Conversation', to: '/schedule?type=sample', primary: false },
              { label: 'Become a Partner or Sponsor', to: '/collaborate', primary: false },
              { label: 'Explore the Investment Opportunity', to: '/invest', primary: false },
              { label: 'Schedule a Zoom Call', to: '/schedule', primary: false },
            ].map(btn => (
              <Link key={btn.label} to={btn.to} className={`btn ${btn.primary ? 'btn-gold' : 'btn-outline'}`} style={{ justifyContent: 'center', textAlign: 'center' }}>
                {btn.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick form */}
      <section style={{ background: 'var(--warm-white)', padding: '64px 0' }}>
        <div className="container">
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div className="section-eyebrow">Stay Connected</div>
              <h2 className="section-title">Tell Us How You'd Like to Be Involved</h2>
              <p className="section-body" style={{ margin: '0 auto' }}>Leave your info and we'll follow up based on your interest.</p>
            </div>
            <div style={{ background: 'white', borderRadius: 16, padding: 40, boxShadow: 'var(--shadow-md)' }}>
              <LiftForm type="qr" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
