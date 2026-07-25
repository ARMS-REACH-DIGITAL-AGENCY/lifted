import React, { useEffect, useRef } from 'react'
import LiftForm from '../components/LiftForm.jsx'
import { TM } from '../components/TM.jsx'
import { useState } from 'react'

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

const COLLAB_TILES = [
  { label: 'Corporate Apparel',          icon: '◈', front: 'Your Work Matters.', back: 'To the person behind me:\nCulture is not what an organization says.\nIt is how people are treated every day.' },
  { label: 'Employee Appreciation',      icon: '★', front: 'People First. Always.', back: 'To the person behind me:\nCulture is not what an organization says.\nIt is how people are treated every day.' },
  { label: 'Leadership Gifts',           icon: '◎', front: 'Lift Your Game.',      back: 'To the player behind me:\nOne bad shot does not define the round.\nReset. Refocus. Swing again.' },
  { label: 'Golf Tournaments',           icon: '⛳', front: 'Play It Forward.',     back: 'The best teams do more than compete.\nThey lift each other.' },
  { label: 'Charity Events',             icon: '♡', front: 'Every Step Lifts Someone.', back: 'We walk for hope.\nWe walk for those still fighting.\nWe walk together.' },
  { label: 'Church Retreats',            icon: '✦', front: 'Hope Lives Here.',     back: 'To the person behind me:\nWhatever you are facing,\nyou do not have to face it alone.' },
  { label: 'School Campaigns',           icon: '◆', front: 'Kind Is Strong.',      back: 'Dear person behind me:\nBeing kind does not make you weak.\nIt takes strength to make someone feel seen.' },
  { label: 'Team Programs',              icon: '⚡', front: 'Together We Lift.',    back: 'Strong communities are built\nwhen nobody has to carry everything alone.' },
  { label: 'Fundraising Stores',         icon: '◉', front: 'Lift the Mission.',    back: 'Every shirt supports more than a cause.\nIt supports people, possibilities,\nand the belief that together\nwe can make a difference.' },
  { label: 'Awareness Campaigns',        icon: '◐', front: 'Be Someone\'s Light.', back: 'To the person behind me:\nA little hope, offered at the right moment,\ncan change the direction of a day.' },
  { label: 'Limited Co-Branded',         icon: '◑', front: 'Better Together.',     back: 'To the person behind me:\nStrong communities are built\nwhen people support, encourage,\nand lift one another.' },
  { label: 'Community Events',           icon: '◈', front: 'United by Purpose.',   back: 'Different roles. Different stories.\nOne mission.\nTogether, we lift more people.' },
]

function CollabTile({ tile }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <div
      onClick={() => setFlipped(f => !f)}
      style={{
        perspective: 800,
        cursor: 'pointer',
        height: 160,
        userSelect: 'none',
      }}
    >
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}>
        {/* FRONT */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          background: 'var(--charcoal)',
          border: '1.5px solid rgba(247,244,236,0.1)',
          borderTop: '3px solid var(--burnt-orange)',
          borderRadius: 4,
          padding: '18px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: 22, lineHeight: 1, color: 'var(--burnt-orange)' }}>{tile.icon}</span>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 900, color: 'var(--off-white)', lineHeight: 1.2, marginBottom: 8 }}>{tile.label}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--burnt-orange)', opacity: 0.8 }}>Tap to see sample →</div>
          </div>
        </div>
        {/* BACK */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: 'var(--off-white)',
          border: '1.5px solid var(--charcoal)',
          borderTop: '3px solid var(--burnt-orange)',
          borderRadius: 4,
          padding: '14px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 8, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--burnt-orange)', marginBottom: 6 }}>Sample Message</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 900, color: 'var(--charcoal)', lineHeight: 1.25, marginBottom: 8 }}>{tile.front}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--muted-olive)', lineHeight: 1.55, whiteSpace: 'pre-line' }}>{tile.back}</div>
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 8, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--charcoal)', opacity: 0.4 }}>← Tap to flip back</div>
        </div>
      </div>
    </div>
  )
}

export default function Collaborate() {
  const ref = useRef(null)
  useLiftIn(ref)

  return (
    <div ref={ref} style={{ background: 'var(--black)' }}>
      <section style={{ background: 'var(--black)', padding: '148px 0 64px', borderBottom: '3px solid var(--burnt-orange)' }}>
        <div className="container">
          <div style={{ maxWidth: 680 }}>
            <div className="lift-in section-eyebrow" style={{ color: 'var(--gold)' }}>Collaboration Model</div>
            <h1 className="lift-in d1" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: 20 }}>
              Organizations,<br />Communities &amp;<br />Caus<span style={{ color: '#C4748A', textTransform: 'none' }}>ê</span>s.
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
                {COLLAB_TILES.map(tile => <CollabTile key={tile.label} tile={tile} />)}
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
