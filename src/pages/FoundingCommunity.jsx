import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import LiftForm from '../components/LiftForm.jsx'
import { TM } from '../components/TM.jsx'

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

export default function FoundingCommunity() {
  const ref = useRef(null)
  useLiftIn(ref)

  return (
    <div ref={ref} style={{ paddingTop: 68 }}>
      <section style={{ background: 'var(--black)', padding: '80px 0 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', height: '60%', background: 'radial-gradient(ellipse at 50% 100%, rgba(238,191,104,0.2) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 680 }}>
            <div className="lift-in section-eyebrow" style={{ color: 'var(--gold)' }}>Be Part of the Beginning</div>
            <h1 className="lift-in d1" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: 20 }}>
              Join the Liftêd™<br /><span style={{ color: 'var(--gold)' }}>Founding Community</span>
            </h1>
            <p className="lift-in d2" style={{ fontSize: 18, color: 'rgba(247,244,236,0.7)', lineHeight: 1.7 }}>
              The founding community is for people who believe in what Liftêd<TM/> represents — and want to be part of building it before the official launch.
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--cream)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 64, alignItems: 'start' }}>
            <div>
              <div className="lift-in section-eyebrow">What You Get</div>
              <h2 className="lift-in d1 section-title">Founding Member Benefits</h2>
              <div style={{ width: 56, height: 3, background: 'var(--gold)', borderRadius: 2, margin: '0 0 24px' }} />
              <div className="lift-in d2" style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
                {[
                  { icon: '🔔', title: 'Behind-the-Scenes Updates', desc: 'Follow the sample development process from fabric selection to final reveal.' },
                  { icon: '🗳️', title: 'Vote on Designs', desc: 'Help determine which messages and designs move into the first official collection.' },
                  { icon: '🎯', title: 'First Access', desc: 'Be first to know when ordering opens, crowdfunding launches, or preorders begin.' },
                  { icon: '👕', title: 'Sample Reveal Invitation', desc: 'Founding members will be invited to see the first physical samples before public launch.' },
                  { icon: '🏆', title: 'Founding Member Status', desc: 'Recognized as a founding supporter of the Liftêd™ brand.' },
                ].map(b => (
                  <div key={b.title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '16px 0', borderBottom: '1px solid var(--light-gray)' }}>
                    <div style={{ fontSize: 24, flexShrink: 0 }}>{b.icon}</div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 4 }}>{b.title}</h4>
                      <p style={{ fontSize: 14, color: 'var(--muted-olive)', lineHeight: 1.6 }}>{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="lift-in d3" style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <Link to="/invest" className="btn btn-navy">Investor Overview</Link>
                <Link to="/collaborate" className="btn btn-ghost">Collaboration Inquiry</Link>
              </div>
            </div>
            <div className="lift-in d2" style={{ background: 'white', borderRadius: 4, padding: 40, boxShadow: '3px 3px 0 var(--charcoal)' }}>
              <LiftForm type="founding" title="Join the Founding Community" subtitle="Submit your information and we'll send you a welcome message and your first behind-the-scenes update." />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

