import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import BrandE from '../components/BrandE.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { FEATURED_PRODUCTS } from '../data/products.js'
import { TM } from '../components/TM.jsx'
import { BrandName } from '../components/BrandName.jsx'

function useLiftIn(ref) {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    ref.current?.querySelectorAll('.lift-in').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

const collections = [
  { name: 'Core', color: 'var(--charcoal)', accent: '#D4A843', icon: '◈', desc: 'Daily brand affinity. Clean, bold, unmistakably Liftêd™.', messages: ['Stay Liftêd™', 'Lift Yourself. Lift Others.', 'Wear Encouragement.', 'The World Needs More Liftêd™'] },
  { name: 'Pick-Me-Up', color: 'var(--charcoal)', accent: '#4A7FB5', icon: '↑', desc: 'First-person messages written for the wearer — shown upside down so they read correctly when you look down.', messages: ['I Matter Here.', "My Story Isn't Over.", 'Better Days Are Ahead for Me.', "I'm Doing Better Than I Think."] },
  { name: 'Athlete', color: 'var(--charcoal)', accent: '#C76A32', icon: '⚡', desc: 'Discipline, preparation, resilience. Built for competitors.', messages: ['Never Finished.', 'Earn Tomorrow.', 'Outwork Yesterday.', 'Built Through Adversity.'] },
  { name: 'Youth', color: 'var(--charcoal)', accent: '#8A9A5B', icon: '★', desc: 'Confidence, identity, belonging. For the next generation.', messages: ['You Belong Here.', 'Different Is Not Less.', 'Your Voice Matters.', 'The Future Looks Good on You.'] },
  { name: 'Collaboration', color: 'var(--charcoal)', accent: '#C4748A', icon: '◎', desc: 'Co-branded editions for organizations, causes, and communities.', messages: ['Better Together.', 'Your Work Matters.', 'Hope Lives Here.', 'Play It Forward.'] },
]

const pathways = [
  { id: 'founding', icon: '01', title: 'Founding Supporter', desc: 'Get early access, follow the sample process, vote on designs, and be first to know when ordering opens.', cta: 'Join the Founding Community', to: '/founding-community' },
  { id: 'investor', icon: '02', title: 'Investor', desc: 'Explore the market opportunity, business model, revenue lanes, and growth strategy.', cta: 'Explore the Investment Opportunity', to: '/invest' },
  { id: 'sponsor', icon: '03', title: 'Sponsor', desc: 'Support community impact, sample production, youth programs, and cause campaigns.', cta: 'Discuss Sponsorship', to: '/collaborate?type=sponsor' },
  { id: 'partner', icon: '04', title: 'Collaboration Partner', desc: 'Companies, nonprofits, schools, churches, teams, events, and causes.', cta: 'Request a Collaboration Concept', to: '/collaborate' },
  { id: 'ambassador', icon: '05', title: 'Ambassador', desc: 'Athletes, coaches, teachers, entrepreneurs, veterans, creators, and community leaders.', cta: 'Apply to Become a Founding Ambassador', to: '/founding-community?type=ambassador' },
  { id: 'customer', icon: '06', title: 'Early Buyer', desc: 'See the first designs and be notified the moment ordering opens.', cta: 'Get First Access', to: '/founding-community?type=customer' },
]

export default function Home() {
  const s2 = useRef(null), s3 = useRef(null), s4 = useRef(null), s5 = useRef(null), s6 = useRef(null), s7 = useRef(null), sProd = useRef(null), s8 = useRef(null)
  useLiftIn(s2); useLiftIn(s3); useLiftIn(s4); useLiftIn(s5); useLiftIn(s6); useLiftIn(s7); useLiftIn(sProd); useLiftIn(s8)
  const [heroImg, setHeroImg] = useState(null)
  const heroKeys = ['core', 'pickmeup', 'athlete', 'youth', 'collab']
  const [autoIdx, setAutoIdx] = useState(0)
  const [userHovering, setUserHovering] = useState(false)
  useEffect(() => {
    if (userHovering) return
    const t = setInterval(() => setAutoIdx(i => (i + 1) % heroKeys.length), 4000)
    return () => clearInterval(t)
  }, [userHovering])
  const activeKey = userHovering ? heroImg : heroKeys[autoIdx]

  return (
    <div>
      {/* ── Status Banner ── */}
{/* ── HERO ── */}
      <section style={{
        minHeight: '100vh',
        background: 'var(--black)',
        display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
        padding: '80px 0 60px',
      }}>
        {/* ── Hero background — cross-dissolves on collection pill hover ── */}
       {[
         { key: 'core',     src: '/images/hero-core.png' },
         { key: 'pickmeup', src: '/images/hero-pickmeup.png' },
         { key: 'athlete',  src: '/images/hero-athlete.png' },
         { key: 'youth',    src: '/images/hero-youth.png' },
         { key: 'collab',   src: '/images/hero-colab.png' },
       ].map(({ key, src }) => (
         <div key={key} style={{
           position: 'absolute', inset: 0, zIndex: 0,
           backgroundImage: `url(${src})`,
           backgroundSize: 'cover',
            backgroundPosition: key === 'pickmeup' ? '60% center' : 'center',
           opacity: activeKey === key ? 0.80 : 0,
           transition: 'opacity 0.8s ease',
         }} />
       ))}
        {/* Gradient overlay — strong on left for text, lighter on right to reveal imagery */}
        {/* Gradient: dark on left/top where text lives, transparent on right so image shows */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(110deg, rgba(23,24,22,0.96) 0%, rgba(23,24,22,0.88) 30%, rgba(23,24,22,0.55) 58%, rgba(23,24,22,0.18) 100%)' }} />
        {/* Orange bottom accent line */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'var(--burnt-orange)', zIndex: 3 }} />
        {/* ── Hero content ── */}
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 820 }}>
            {/* Production status badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 32, padding: '6px 14px', border: '1.5px solid rgba(199,106,50,0.6)', borderRadius: 'var(--radius)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--burnt-orange)', display: 'inline-block' }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--burnt-orange)' }}>Wear Encouragement. Wear Liftêd™.</span>
            </div>
            {/* ── Premium title-case headline ── */}
            <h1 style={{ fontFamily: '"Archivo Black", "Inter Tight", system-ui, sans-serif', fontSize: 'clamp(42px, 7.5vw, 88px)', fontWeight: 900, color: 'var(--off-white)', lineHeight: 1.0, letterSpacing: '-0.025em', marginBottom: 28, textTransform: 'none' }}>
              The World Needs More <BrandName theme="dark" />
              <span style={{ color: 'var(--burnt-orange)', marginLeft: '0.04em' }}>.</span>
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'rgba(247,244,236,0.75)', lineHeight: 1.7, marginBottom: 12, maxWidth: 560 }}>
              Private-label apparel designed to encourage the person wearing it — and the person standing behind them.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontStyle: 'italic', color: 'rgba(247,244,236,0.38)', lineHeight: 1.6, marginBottom: 44, maxWidth: 500 }}>
              Most apparel tells the world what you bought. Liftêd™ tells someone what they may need to hear.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <Link to="/founding-community" style={{ display: 'inline-block', background: '#EEBF68', color: 'var(--black)', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '16px 28px', borderRadius: 4, textDecoration: 'none' }}>Join the Founding Community</Link>
              <Link to="/story" className="btn btn-outline-light btn-lg">Our Story</Link>
              <Link to="/schedule" className="btn btn-outline-light btn-lg">Schedule a Call</Link>
            </div>
            {/* Collection pills — hover to cross-dissolve hero image */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 48 }}>
              {[
                { label: 'Core',          key: 'core',     color: '#D4A843' },
                { label: 'Pick-Me-Up',    key: 'pickmeup', color: '#4A7FB5' },
                { label: 'Athlete',       key: 'athlete',  color: '#C76A32' },
                { label: 'Youth',         key: 'youth',    color: '#8A9A5B' },
                { label: 'Collaboration', key: 'collab',   color: '#C4748A' },
              ].map(col => (
                <span
                  key={col.key}
                  onMouseEnter={() => { setHeroImg(col.key); setUserHovering(true) }}
                  onMouseLeave={() => { setHeroImg(null); setUserHovering(false) }}
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 700,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: heroImg === col.key ? col.color : 'rgba(247,244,236,0.40)',
                    padding: '5px 12px',
                    border: `1px solid ${heroImg === col.key ? col.color : 'rgba(247,244,236,0.15)'}`,
                    borderRadius: 2, cursor: 'default',
                    transition: 'color 0.3s, border-color 0.3s',
                  }}
                >{col.label} Collection</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ── HOW IT WORKS ── */}
      <section ref={s2} style={{ background: 'var(--warm-cream)', padding: '88px 0', borderBottom: '1.5px solid rgba(41,42,40,0.12)' }}>
        <div className="container">
          <div className="lift-in" style={{ marginBottom: 48 }}>
            <div className="section-eyebrow">The Two-Way Impact</div>
            <h2 className="section-title" aria-label="See How It Works">S<span style={{ color: "var(--sand)", textTransform: "none" }}>ê</span>e How It Works</h2>
            <p className="section-body">Every Liftêd™ garment works in two directions simultaneously.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, alignItems: 'start', marginBottom: 32 }}>
            {/* Front */}
            <div className="lift-in d1">
              <div style={{ background: 'var(--off-white)', border: '2px solid var(--charcoal)', padding: '24px 20px 20px', marginBottom: 14 }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--burnt-orange)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--burnt-orange)', display: 'inline-block' }} />
                  Front of Garment
                </div>
                <img src="/products/lft-001/sample-front.jpg" alt="You Matter Here shirt front" style={{ width: '100%', maxHeight: 320, objectFit: 'contain', background: '#f0ece4' }} />
              </div>
              <div style={{ padding: '14px 16px', background: 'var(--charcoal)', borderLeft: '3px solid var(--sand)' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--sand)', marginBottom: 5 }}>Internal Lift</div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--off-white)', marginBottom: 4 }}>THE FRONT SPEAKS TO THE WEARER.</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(247,244,236,0.6)', lineHeight: 1.6 }}>A personal affirmation — a quiet reminder that they matter.</p>
              </div>
            </div>

            {/* Arrow */}
            <div className="lift-in d2" style={{ textAlign: 'center', padding: '32px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 72, color: 'var(--burnt-orange)', lineHeight: 1 }}>↔</div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--charcoal)', lineHeight: 1.3, maxWidth: 200, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                WEAR WHAT LIFTS YOU. SHARE WHAT LIFTS OTHERS.
              </p>
            </div>

            {/* Back */}
            <div className="lift-in d3">
              <div style={{ background: 'var(--off-white)', border: '2px solid var(--charcoal)', padding: '24px 20px 20px', marginBottom: 14 }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted-olive)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--muted-olive)', display: 'inline-block' }} />
                  Back of Garment
                </div>
                <img src="/products/lft-001/sample-back.jpg" alt="Dear person behind me shirt back" style={{ width: '100%', maxHeight: 320, objectFit: 'contain', background: '#f0ece4' }} />
              </div>
              <div style={{ padding: '14px 16px', background: 'var(--earth-brown)', borderLeft: '3px solid var(--sand)' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--sand)', marginBottom: 5 }}>External Radiance</div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--off-white)', marginBottom: 4 }}>THE BACK SPEAKS TO THE WORLD.</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(247,244,236,0.6)', lineHeight: 1.6 }}>An unexpected message for the person standing behind them.</p>
              </div>
            </div>
          </div>
          <div className="lift-in d4">
            <div className="disclaimer">Product images shown may be concept mockups. Final garment quality, construction, color, and fit will be confirmed after physical sample testing.</div>
          </div>
        </div>
      </section>

      {/* ── WHY DIFFERENT ── */}
      <section ref={s3} style={{ background: 'var(--charcoal)', padding: '88px 0' }}>
        <div className="container">
          <div className="lift-in" style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--burnt-orange)', marginBottom: 10 }}>What Makes It Different</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 44px)', color: 'var(--off-white)', lineHeight: 1.05, letterSpacing: '-0.02em', textTransform: 'none' }}>Why <BrandName theme="dark" /> Is Different</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
            {[
              { n: '01', title: 'Private Label', body: 'Liftêd™ is being developed as its own apparel brand — not simply artwork printed on another consumer label. Every garment carries the Liftêd™ identity.' },
              { n: '02', title: 'Two-Way Impact', body: 'Each garment encourages the wearer and communicates something meaningful to the observer. One product. Two people lifted.' },
              { n: '03', title: 'Meaning Before Merchandise', body: 'Every product must answer one question: Will this help someone feel better, stronger, more hopeful, or more confident?' },
              { n: '04', title: 'Built to Be Shared', body: 'Every garment can start a conversation, create a connection, and introduce another person to the brand. Encouragement is contagious.' },
            ].map((c, i) => (
              <div key={c.n} className={`lift-in d${i+1}`} style={{ padding: '28px 24px', background: i % 2 === 0 ? 'rgba(247,244,236,0.04)' : 'transparent', borderTop: '2px solid var(--burnt-orange)', borderLeft: '1px solid rgba(247,244,236,0.06)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--burnt-orange)', opacity: 0.5, lineHeight: 1, marginBottom: 14 }}>{c.n}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, color: 'var(--off-white)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{c.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(247,244,236,0.6)', lineHeight: 1.7 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COLLECTIONS ── */}
      <section ref={s4} style={{ background: 'var(--warm-cream)', padding: '88px 0', borderBottom: '1.5px solid rgba(41,42,40,0.12)' }}>
        <div className="container">
          <div className="lift-in" style={{ marginBottom: 48 }}>
            <div className="section-eyebrow">Five Collections. One Meaning.</div>
            <h2 className="section-title">The Founding Collections</h2>
            <p className="section-body">A portfolio designed to follow the customer through different identities and stages of life.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {collections.map((c, i) => (
              <div key={c.name} className={`lift-in d${i+1}`} style={{ padding: '24px', background: 'var(--off-white)', border: '1.5px solid var(--charcoal)', boxShadow: '3px 3px 0 var(--charcoal)', borderTop: `4px solid var(--burnt-orange)` }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--burnt-orange)', lineHeight: 1, marginBottom: 12 }}>{c.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--charcoal)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{c.name} Collection</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--muted-olive)', lineHeight: 1.6, marginBottom: 14 }}>{c.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {c.messages.map(m => (
                    <span key={m} style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 600, color: 'var(--earth-brown)', background: 'rgba(90,68,52,0.08)', border: '1px solid rgba(90,68,52,0.2)', borderRadius: 0, padding: '2px 8px' }}>{m}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="lift-in" style={{ marginTop: 32 }}>
            <Link to="/collections" className="btn btn-navy">Explore All Collections</Link>
          </div>
        </div>
      </section>

      {/* ── LAUNCH STATUS ── */}
      <section ref={s5} style={{ background: 'var(--black)', padding: '88px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 56, alignItems: 'start' }}>
            <div>
              <div className="lift-in" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20, padding: '5px 12px', border: '1.5px solid var(--burnt-orange)', borderRadius: 'var(--radius)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--burnt-orange)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--burnt-orange)' }}>Now in Production</span>
              </div>
              <h2 className="lift-in d1" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 40px)', color: 'var(--off-white)', lineHeight: 1.05, letterSpacing: '-0.02em', textTransform: 'none', marginBottom: 20 }}>The First Liftêd™ Samples Are Now in Production</h2>
              <div style={{ width: 40, height: 3, background: 'var(--burnt-orange)', marginBottom: 20 }} />
              <p className="lift-in d2" style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'rgba(247,244,236,0.65)', lineHeight: 1.7, marginBottom: 14 }}>
                Liftêd™ is currently developing its first private-label apparel samples — produced with custom Liftêd™ labels, not printed on another manufacturer's consumer brand.
              </p>
              <p className="lift-in d3" style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'rgba(247,244,236,0.65)', lineHeight: 1.7, marginBottom: 28 }}>
                Founding supporters, partners, and investors will receive behind-the-scenes updates and may be invited to help determine which designs move into the first official collection.
              </p>
              <div className="lift-in d4" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                <Link to="/founding-community" className="btn btn-gold">Join the Founding Community</Link>
                <Link to="/invest" className="btn btn-outline-light">Investor Overview</Link>
              </div>
            </div>
            <div className="lift-in d2">
              <div style={{ border: '1.5px solid rgba(247,244,236,0.12)', padding: 28 }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--burnt-orange)', marginBottom: 18 }}>Sample Validation Checklist</div>
                {['Fabric quality', 'Fit and sizing', 'Sublimation print quality', 'Color accuracy', 'Label execution', 'Comfort & breathability', 'Wash durability', 'Shrinkage & pilling', 'Overall product experience'].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(247,244,236,0.06)' }}>
                    <div style={{ width: 16, height: 16, border: '1.5px solid var(--burnt-orange)', flexShrink: 0, borderRadius: 0 }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(247,244,236,0.75)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COLLABORATIONS ── */}
      <section ref={s6} style={{ background: 'var(--off-white)', padding: '88px 0', borderTop: '1.5px solid rgba(41,42,40,0.12)', borderBottom: '1.5px solid rgba(41,42,40,0.12)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 56, alignItems: 'start' }}>
            <div>
              <div className="lift-in section-eyebrow">Collaboration Model</div>
              <h2 className="lift-in d1 section-title">Organizations, Causes, and Communities</h2>
              <div style={{ width: 40, height: 3, background: 'var(--burnt-orange)', marginBottom: 20 }} />
              <p className="lift-in d2 section-body" style={{ marginBottom: 16 }}>
                Liftêd™ collaborates with organizations that want their apparel to represent more than an event logo. Each collaboration begins with a simple question:
              </p>
              <blockquote className="lift-in d3" style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--charcoal)', borderLeft: '4px solid var(--burnt-orange)', paddingLeft: 18, margin: '20px 0', textTransform: 'uppercase', letterSpacing: '0.01em' }}>
                "WHO ARE WE TRYING TO LIFT?"
              </blockquote>
              <p className="lift-in d4 section-body" style={{ marginBottom: 28 }}>
                Liftêd™ then develops an emotionally relevant message connected to the organization, audience, occasion, or cause — converting ordinary bulk apparel into meaningful brand assets.
              </p>
              <Link to="/collaborate" className="lift-in d5 btn btn-gold">Request a Collaboration Concept</Link>
            </div>
            <div className="lift-in d2">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {['Corporate apparel', 'Employee appreciation', 'Leadership gifts', 'Golf tournaments', 'Charity events', 'Church retreats', 'School campaigns', 'Team programs', 'Fundraising stores', 'Awareness campaigns', 'Co-branded collections', 'Community events'].map(item => (
                  <div key={item} style={{ background: 'var(--warm-cream)', border: '1px solid rgba(41,42,40,0.15)', padding: '10px 12px', fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--charcoal)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span style={{ color: 'var(--burnt-orange)', fontWeight: 700, fontSize: 14 }}>→</span> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PATHWAYS ── */}
      <section ref={s7} style={{ background: 'var(--warm-cream)', padding: '88px 0' }}>
        <div className="container">
          <div className="lift-in" style={{ marginBottom: 48 }}>
            <div className="section-eyebrow">Find Your Path</div>
            <h2 className="section-title">How Would You Like to Be Involved?</h2>
            <p className="section-body">Liftêd™ is building a founding community of supporters, investors, partners, and ambassadors.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {pathways.map((p, i) => (
              <div key={p.id} className={`lift-in d${i+1}`} style={{ padding: '24px', background: 'var(--off-white)', border: '1.5px solid var(--charcoal)', boxShadow: '3px 3px 0 var(--charcoal)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--burnt-orange)', opacity: 0.6, lineHeight: 1, marginBottom: 12 }}>{p.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--charcoal)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{p.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--muted-olive)', lineHeight: 1.7, flex: 1, marginBottom: 18 }}>{p.desc}</p>
                <Link to={p.to} className="btn btn-ghost btn-sm" style={{ justifyContent: 'center', textAlign: 'center', width: '100%', lineHeight: 1.3 }}>{p.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT PREVIEW ── */}
      <section ref={sProd} style={{ background: 'var(--off-white)', padding: '88px 0', borderTop: '1.5px solid rgba(41,42,40,0.12)' }}>
        <div className="container">
          <div className="lift-in" style={{ marginBottom: 48 }}>
            <div className="section-eyebrow">Founding Collection Preview</div>
            <h2 className="section-title">The First Six Concepts</h2>
            <p className="section-body" style={{ marginBottom: 8 }}>A curated preview of the founding collection. Each design carries a message for the wearer and a message for the world.</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--muted-olive)', fontStyle: 'italic' }}>Product images shown are early samples or concept placeholders. Final designs confirmed after sample validation.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {FEATURED_PRODUCTS.map((product, i) => (
              <div key={product.id} className={`lift-in d${Math.min(i+1,6)}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="lift-in" style={{ marginTop: 32 }}>
            <Link to="/collections" className="btn btn-navy">Explore All Collections</Link>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section ref={s8} style={{ background: 'var(--charcoal)', padding: '88px 0', position: 'relative', overflow: 'hidden', borderTop: '3px solid var(--burnt-orange)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="lift-in">
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--burnt-orange)', marginBottom: 16 }}>The Movement</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 6vw, 64px)', color: 'var(--off-white)', lineHeight: 1.0, letterSpacing: '-0.02em', textTransform: 'none', marginBottom: 20 }}>
              Wear Encouragement.<br />Wear <BrandName theme="dark" />.
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'rgba(247,244,236,0.6)', maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.7 }}>
              The world needs more people who refuse to quit. That's who we make this for. Join us before the official launch.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
              <Link to="/founding-community" style={{ display: 'inline-block', background: '#EEBF68', color: 'var(--black)', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '16px 28px', borderRadius: 4, textDecoration: 'none' }}>Join the Founding Community</Link>
              <Link to="/schedule" className="btn btn-outline-light btn-lg">Schedule a Conversation</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
