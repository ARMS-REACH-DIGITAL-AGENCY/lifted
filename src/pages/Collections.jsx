import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
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

const collections = [
  { id: 'core', name: 'Core Collection', color: '#EEBF68', icon: '◈', tagline: 'Simple, elegant daily brand affinity.', desc: 'The foundation of the Liftêd™ identity. Designed for everyday wear — clean, refined, and unmistakably Liftêd™.', messages: ['Stay Liftêd™', 'Lift Yourself. Lift Others.', 'Wear Encouragement.', 'The World Needs More Liftêd™'], products: 'Tees · Hoodies · Hats · Joggers · Quarter-zips' },
  { id: 'pickup', name: 'Pick-Me-Up Collection', color: '#4A7FB5', icon: '↑', tagline: 'Direct messages of hope, resilience, and encouragement.', desc: 'For the days that need it most. Explicit, honest messages that speak directly to the person wearing them.', messages: ['You Matter Here.', 'Your Story Isn\'t Over.', 'One More Day.', 'Better Days Are Ahead.', 'You\'re Doing Better Than You Think.'], products: 'Message tees · Hoodies · Sweatshirts' },
  { id: 'athlete', name: 'Athlete Collection', color: '#C76A32', icon: '⚡', tagline: 'Motivation centered on discipline, preparation, and resilience.', desc: 'For competitors, coaches, and anyone who understands that the work is never finished.', messages: ['Never Finished.', 'Earn Tomorrow.', 'Outwork Yesterday.', 'Built Through Adversity.', 'Strong Mind. Strong Finish.'], products: 'Performance tees · Training gear · Shorts' },
  { id: 'youth', name: 'Youth Collection', color: '#626552', icon: '★', tagline: 'Positive messaging for identity, confidence, and belonging.', desc: 'For the next generation. Messages that build confidence, celebrate identity, and remind young people they belong.', messages: ['You Belong Here.', 'Different Is Not Less.', 'Your Voice Matters.', 'The Future Looks Good on You.', 'Stronger Than You Think.'], products: 'Youth tees · Hoodies · Hats' },
  { id: 'collab', name: 'Collaboration Collection', color: '#5A4434', icon: '◎', tagline: 'Co-branded editions for organizations, causes, and communities.', desc: 'Custom Liftêd™ editions that carry the brand\'s meaning and identity — built for organizations that want their apparel to represent more than a logo.', messages: ['Better Together.', 'Your Work Matters.', 'Every Step Lifts Someone.', 'Hope Lives Here.', 'Play It Forward.'], products: 'Custom editions · Event gear · Fundraising collections' },
]

export default function Collections() {
  const ref = useRef(null)
  useLiftIn(ref)
  const [active, setActive] = useState('core')
  const col = collections.find(c => c.id === active)

  return (
    <div ref={ref} style={{ paddingTop: 68 }}>
      <section style={{ background: 'var(--black)', padding: '80px 0 64px', borderBottom: '3px solid var(--burnt-orange)' }}>
        <div className="container">
          <div style={{ maxWidth: 680 }}>
            <div className="lift-in section-eyebrow" style={{ color: 'var(--gold)' }}>Five Collections. One Meaning.</div>
            <h1 className="lift-in d1" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: 20 }}>
              The Founding<br />Coll<span style={{ color: 'var(--sand)', textTransform: 'none' }}>ê</span>ctions
            </h1>
            <p className="lift-in d2" style={{ fontSize: 18, color: 'rgba(247,244,236,0.7)', lineHeight: 1.7 }}>
              A portfolio designed to follow the customer through different identities and stages of life — without ever abandoning the single promise that holds it all together.
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--cream)', padding: '80px 0' }}>
        <div className="container">
          {/* Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 48 }}>
            {collections.map(c => (
              <button key={c.id} onClick={() => setActive(c.id)} style={{
                padding: '10px 20px', borderRadius: 4, border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600,
                background: active === c.id ? c.color : 'var(--off-white)',
                color: active === c.id ? 'white' : 'var(--muted-olive)',
                transition: 'all 0.2s',
              }}>{c.name.replace(' Collection', '')}</button>
            ))}
          </div>

          {/* Active collection */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 48, alignItems: 'start' }}>
            <div>
              <div style={{ display: 'inline-block', background: `${col.color}18`, border: `1px solid ${col.color}40`, borderRadius: 4, padding: '5px 14px', marginBottom: 16 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: col.color, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{col.name}</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#C76A32', marginBottom: 12, lineHeight: 1.2 }}>{col.tagline}</h2>
              <div style={{ width: 56, height: 3, background: col.color, borderRadius: 2, margin: '0 0 20px' }} />
              <p style={{ fontSize: 16, color: 'var(--muted-olive)', lineHeight: 1.7, marginBottom: 24 }}>{col.desc}</p>
              <p style={{ fontSize: 13, color: 'var(--muted-olive)', fontStyle: 'italic', marginBottom: 32 }}>Products: {col.products}</p>
              <div className="disclaimer" style={{ marginBottom: 32 }}>
                All designs shown are concept examples. Final collection designs will be confirmed after sample validation.
              </div>
              <Link to="/founding-community" style={{ display: 'inline-block', background: col.color, color: 'white', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '14px 28px', borderRadius: 4, textDecoration: 'none', border: 'none' }}>Get First Access</Link>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted-olive)', marginBottom: 16 }}>Example Messages</div>
              {col.messages.map(m => (
                <div key={m} style={{ background: 'white', borderRadius: 10, padding: '20px 24px', marginBottom: 12, boxShadow: 'none', borderLeft: `4px solid ${col.color}` }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: '#C76A32' }}>{m}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--charcoal)', padding: '64px 0', textAlign: 'center' }}>
        <div className="container">
          <div className="lift-in">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: 'white', marginBottom: 16 }}>Be First to Know When Ordering Opens</h2>
            <p style={{ fontSize: 16, color: 'rgba(247,244,236,0.65)', maxWidth: 480, margin: '0 auto 28px' }}>Join the founding community and get first access to the initial collection.</p>
            <Link to="/founding-community" className="btn btn-gold btn-lg">Join the Founding Community</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
