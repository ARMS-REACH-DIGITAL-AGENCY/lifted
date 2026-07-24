import React, { useEffect, useRef } from 'react'
import LiftForm from '../components/LiftForm.jsx'

function useLiftIn(ref) {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.lift-in').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

export default function Collaborate() {
  const ref = useRef(null)
  useLiftIn(ref)

  return (
    <div ref={ref} style={{ paddingTop: 68 }}>
      <section style={{ background: 'var(--black)', padding: '80px 0 64px', borderBottom: '3px solid var(--burnt-orange)' }}>
        <div className="container">
          <div style={{ maxWidth: 680 }}>
            <div className="lift-in section-eyebrow" style={{ color: 'var(--gold)' }}>Collaboration Model</div>
            <h1 className="lift-in d1" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: 20 }}>
              Organizations, Causes,<br /><span style={{ color: 'var(--gold)' }}>and Communities</span>
            </h1>
            <p className="lift-in d2" style={{ fontSize: 18, color: 'rgba(247,244,236,0.7)', lineHeight: 1.7 }}>
              Liftêd™ collaborates with organizations that want their apparel to represent more than an event logo.
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--cream)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 64, alignItems: 'start' }}>
            <div>
              <div className="lift-in section-eyebrow">How It Works</div>
              <h2 className="lift-in d1 section-title">Every Collaboration Starts With One Question</h2>
              <div style={{ width: 56, height: 3, background: 'var(--gold)', borderRadius: 2, margin: '0 0 24px' }} />
              <blockquote className="lift-in d2" style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontStyle: 'italic', color: 'var(--charcoal)', borderLeft: '4px solid var(--gold)', paddingLeft: 20, marginBottom: 24 }}>
                "Who are we trying to lift?"
              </blockquote>
              <p className="lift-in d3 section-body" style={{ marginBottom: 16 }}>
                Liftêd™ develops an emotionally relevant message connected to the organization, audience, occasion, or cause — converting ordinary bulk apparel into meaningful brand assets that people will continue wearing after the event.
              </p>
              <p className="lift-in d4 section-body" style={{ marginBottom: 32 }}>
                Each collaboration carries the Liftêd™ meaning and identity. Custom apparel services are available separately for client-owned branding.
              </p>
              <div className="lift-in d5" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {['Corporate apparel', 'Employee appreciation', 'Leadership gifts', 'Golf tournaments', 'Charity events', 'Church retreats', 'School campaigns', 'Team programs', 'Fundraising stores', 'Awareness campaigns', 'Limited co-branded collections', 'Community events'].map(item => (
                  <div key={item} style={{ background: 'white', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: 'var(--charcoal)', fontWeight: 500, boxShadow: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: 'var(--gold)', fontWeight: 700 }}>→</span> {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="lift-in d2" style={{ background: 'white', borderRadius: 4, padding: 40, boxShadow: '3px 3px 0 var(--charcoal)' }}>
              <LiftForm type="partner" title="Request a Collaboration Concept" subtitle="Tell us about your organization and we'll follow up with a creative brief and collaboration overview." />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
