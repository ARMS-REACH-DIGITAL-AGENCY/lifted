import PageHero from '../components/PageHero.jsx'
import React, { useEffect, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
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

const callTypes = [
  { id: 'investor', label: '💼 Investor Conversation', desc: 'Discuss the investment opportunity, review the deck, and explore next steps.' },
  { id: 'partner', label: '🤝 Collaboration Discovery', desc: 'Explore a co-branded Liftêd™ collaboration for your organization, team, or cause.' },
  { id: 'sponsor', label: '🌟 Sponsorship Conversation', desc: 'Discuss sponsoring community impact, sample production, or cause campaigns.' },
  { id: 'sample', label: '👕 Sample Feedback', desc: 'Share your feedback on a physical sample you received.' },
  { id: 'ambassador', label: '⭐ Ambassador Conversation', desc: 'Explore becoming a founding Liftêd™ ambassador.' },
  { id: 'founding', label: '🙌 General Founder Call', desc: 'Connect with the Liftêd™ team about anything else.' },
]

export default function Schedule() {
  const ref = useRef(null)
  useLiftIn(ref)
  const [params] = useSearchParams()
  const defaultType = params.get('type') || 'founding'

  return (
    <div ref={ref} style={{ background: 'var(--warm-cream)' }}>
      <PageHero
        eyebrow="LET'S TALK"
        heading={<>Schedule a 20-Minute<br />Lift<span style={{ color: 'var(--sand)' }}>ê</span>d<TM /> Conversation</>}
        description="Choose the type of conversation that fits your interest. We'll confirm a time and send you a Zoom link."
      />

      <section style={{ background: 'var(--cream)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 64, alignItems: 'start' }}>
            {/* Call types */}
            <div>
              <div className="lift-in section-eyebrow">Choose Your Conversation Type</div>
              <h2 className="lift-in d1 section-title">What Would You Like to Discuss?</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {callTypes.map((t, i) => (
                  <div key={t.id} className={`lift-in d${i+1}`} style={{ background: 'white', borderRadius: 10, padding: '16px 20px', boxShadow: 'none', borderLeft: '4px solid var(--gold)' }}>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 4 }}>{t.label}</h4>
                    <p style={{ fontSize: 13, color: 'var(--muted-olive)', lineHeight: 1.6 }}>{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Form */}
            <div className="lift-in d2" style={{ background: 'white', borderRadius: 4, padding: 40, boxShadow: '3px 3px 0 var(--charcoal)' }}>
              <LiftForm type={defaultType} title="Book Your Conversation" subtitle="Submit your info and preferred meeting type. We'll confirm your Zoom time within 24 hours." />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
