import PageHero from '../components/PageHero.jsx'
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
    <div ref={ref} style={{ background: 'var(--warm-cream)' }}>
      <PageHero
        eyebrow="BE PART OF THE BEGINNING"
        heading={<>Join the Lift<span style={{ color: 'var(--sand)' }}>ê</span>d<TM /><br />Founding Community</>}
        description="The founding community is for people who believe in what Liftêd™ represents — and want to be part of building it before the official launch."
      />

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
