import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { FEATURED_PRODUCTS } from '../data/products.js'
import { SITE_LAUNCH_STATE } from '../config/launchState.js'

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
  { name: 'Core', color: 'var(--gold-deep)', icon: '◈', desc: 'Simple, elegant daily brand affinity.', messages: ['Stay Liftêd™', 'Lift Yourself. Lift Others.', 'Wear Encouragement.', 'The World Needs More Liftêd™'] },
  { name: 'Pick-Me-Up', color: '#5B8DB8', icon: '↑', desc: 'Direct messages of hope, resilience, and encouragement.', messages: ['You Matter Here.', 'Your Story Isn\'t Over.', 'One More Day.', 'Better Days Are Ahead.'] },
  { name: 'Athlete', color: '#1A2744', icon: '⚡', desc: 'Motivation centered on discipline, preparation, and resilience.', messages: ['Never Finished.', 'Earn Tomorrow.', 'Outwork Yesterday.', 'Built Through Adversity.'] },
  { name: 'Youth', color: '#7B9E4A', icon: '★', desc: 'Positive messaging for identity, confidence, and belonging.', messages: ['You Belong Here.', 'Different Is Not Less.', 'Your Voice Matters.', 'The Future Looks Good on You.'] },
  { name: 'Collaboration', color: '#8B4513', icon: '◎', desc: 'Co-branded editions for organizations, causes, and communities.', messages: ['Better Together.', 'Your Work Matters.', 'Hope Lives Here.', 'Play It Forward.'] },
]

const pathways = [
  { id: 'founding', icon: '🤝', title: 'Founding Supporter', desc: 'Get early access, follow the sample process, vote on designs, and be first to know when ordering opens.', cta: 'Join the Founding Community', to: '/founding-community' },
  { id: 'investor', icon: '💼', title: 'Investor', desc: 'Explore the market opportunity, business model, revenue lanes, and growth strategy.', cta: 'Explore the Investment Opportunity', to: '/invest' },
  { id: 'sponsor', icon: '🌟', title: 'Sponsor', desc: 'Support community impact, sample production, youth programs, and cause campaigns.', cta: 'Discuss Sponsorship', to: '/collaborate?type=sponsor' },
  { id: 'partner', icon: '🏢', title: 'Collaboration Partner', desc: 'Companies, nonprofits, schools, churches, teams, events, and causes.', cta: 'Request a Collaboration Concept', to: '/collaborate' },
  { id: 'ambassador', icon: '⭐', title: 'Ambassador', desc: 'Athletes, coaches, teachers, entrepreneurs, veterans, creators, and community leaders.', cta: 'Apply to Become a Founding Ambassador', to: '/founding-community?type=ambassador' },
  { id: 'customer', icon: '🛒', title: 'Early Buyer', desc: 'See the first designs and be notified the moment ordering opens.', cta: 'Get First Access', to: '/founding-community?type=customer' },
]

export default function Home() {
  const heroRef = useRef(null)
  const s2 = useRef(null), s3 = useRef(null), s4 = useRef(null), s5 = useRef(null), s6 = useRef(null), s7 = useRef(null), s8 = useRef(null), sProd = useRef(null)
  useLiftIn(s2); useLiftIn(s3); useLiftIn(s4); useLiftIn(s5); useLiftIn(s6); useLiftIn(s7); useLiftIn(s8); useLiftIn(sProd)

  return (
    <div>
      {/* Status Banner */}
      <div className="status-banner" style={{ paddingTop: 80 }}>
        <span>🔥 NOW IN PRODUCTION:</span> The first Liftêd™ private-label samples are being developed. <Link to="/founding-community" style={{ color: 'var(--gold)', fontWeight: 700, marginLeft: 8 }}>Join the Founding Community →</Link>
      </div>

      {/* ── Section 1: Hero ── */}
      <section ref={heroRef} style={{
        minHeight: '100vh', background: 'linear-gradient(160deg, #0F1A30 0%, #1A2744 50%, #1A3A5C 100%)',
        display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '80px 0 60px',
      }}>
        {/* Glow */}
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', height: '60%', background: 'radial-gradient(ellipse at 50% 100%, rgba(238,191,104,0.18) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '20%', right: '10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(238,191,104,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 760 }}>
            <div className="section-eyebrow" style={{ color: 'var(--gold)' }}>Pre-Revenue Launch Stage · Samples in Production</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(44px, 7vw, 88px)', fontWeight: 900, color: 'white', lineHeight: 1.05, marginBottom: 28 }}>
              The World Needs<br />
              <span style={{ color: 'var(--gold)' }}>More Liftêd™.</span>
            </h1>
            <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, marginBottom: 16, maxWidth: 580 }}>
              Private-label apparel designed to encourage the person wearing it — and the person standing behind them.
            </p>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', marginBottom: 40, maxWidth: 520 }}>
              Most apparel tells the world what you bought. Liftêd™ tells someone what they may need to hear.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              <Link to="/founding-community" className="btn btn-gold btn-lg">Join the Founding Community</Link>
              <Link to="/story" className="btn btn-outline-light btn-lg">Explore the Concept</Link>
              <Link to="/schedule" className="btn btn-outline-light btn-lg">Schedule a Conversation</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: See How It Works ── */}
      <section ref={s2} style={{ background: 'var(--cream)', padding: '96px 0' }}>
        <div className="container">
          <div className="lift-in" style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-eyebrow">The Two-Way Impact</div>
            <h2 className="section-title" style={{ margin: '0 auto 16px' }}>See How It Works</h2>
            <p style={{ fontSize: 18, color: 'var(--mid-gray)', maxWidth: 560, margin: '0 auto' }}>Every Liftêd™ garment is designed to work in two directions simultaneously.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, alignItems: 'center', marginBottom: 48 }}>
            {/* Front */}
            <div className="lift-in d1" style={{ textAlign: 'center' }}>
              <div style={{ background: 'var(--warm-white)', borderRadius: 16, padding: '32px 24px', marginBottom: 20, position: 'relative', boxShadow: 'var(--shadow-md)' }}>
                <div className="badge badge-gold" style={{ marginBottom: 16 }}>Front of Garment</div>
                <img src="/images/shirt-front-real.jpg" alt="You Matter Here shirt front" style={{ maxHeight: 340, margin: '0 auto', borderRadius: 8 }} />
              </div>
              <div style={{ background: 'rgba(238,191,104,0.08)', border: '1px solid rgba(238,191,104,0.2)', borderRadius: 10, padding: '16px 20px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>Internal Lift</div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--navy)' }}>The front speaks to the wearer.</p>
                <p style={{ fontSize: 14, color: 'var(--mid-gray)', marginTop: 6 }}>A personal affirmation for the person wearing it — a quiet reminder that they matter.</p>
              </div>
            </div>
            {/* Arrow */}
            <div className="lift-in d2" style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 64, color: 'var(--gold)', lineHeight: 1 }}>↔</div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontStyle: 'italic', color: 'var(--navy)', marginTop: 12, lineHeight: 1.4 }}>
                "Wear What Lifts You. Share What Lifts Others."
              </p>
            </div>
            {/* Back */}
            <div className="lift-in d3" style={{ textAlign: 'center' }}>
              <div style={{ background: 'var(--warm-white)', borderRadius: 16, padding: '32px 24px', marginBottom: 20, position: 'relative', boxShadow: 'var(--shadow-md)' }}>
                <div className="badge badge-navy" style={{ marginBottom: 16 }}>Back of Garment</div>
                <img src="/images/shirt-back-real.jpg" alt="Dear person behind me shirt back" style={{ maxHeight: 340, margin: '0 auto', borderRadius: 8 }} />
              </div>
              <div style={{ background: 'rgba(26,39,68,0.06)', border: '1px solid rgba(26,39,68,0.15)', borderRadius: 10, padding: '16px 20px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: 6 }}>External Radiance</div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--navy)' }}>The back speaks to the world.</p>
                <p style={{ fontSize: 14, color: 'var(--mid-gray)', marginTop: 6 }}>An unexpected message for the person standing behind them — someone who may need it most.</p>
              </div>
            </div>
          </div>
          <div className="lift-in d4" style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
            <div className="disclaimer">
              Product images shown may be concept mockups. Final garment quality, construction, color, and fit will be confirmed after physical sample testing.
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Why Liftêd™ Is Different ── */}
      <section ref={s3} style={{ background: 'var(--warm-white)', padding: '96px 0' }}>
        <div className="container">
          <div className="lift-in" style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-eyebrow">What Makes It Different</div>
            <h2 className="section-title" style={{ margin: '0 auto' }}>Why Liftêd™ Is Different</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {[
              { n: '01', title: 'Private Label', body: 'Liftêd™ is being developed as its own apparel brand — not simply artwork printed on another consumer label. Every garment carries the Liftêd™ identity.' },
              { n: '02', title: 'Two-Way Impact', body: 'Each garment is designed to encourage the wearer and communicate something meaningful to the observer. One product. Two people lifted.' },
              { n: '03', title: 'Meaning Before Merchandise', body: 'Every product must answer one question: Will this help someone feel better, stronger, more hopeful, or more confident?' },
              { n: '04', title: 'Built to Be Shared', body: 'Every garment can start a conversation, create a connection, and introduce another person to the brand. Encouragement is contagious.' },
            ].map((c, i) => (
              <div key={c.n} className={`lift-in d${i+1} card`} style={{ padding: 32 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 900, color: 'var(--gold)', opacity: 0.4, lineHeight: 1, marginBottom: 16 }}>{c.n}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>{c.title}</h3>
                <p style={{ fontSize: 15, color: 'var(--mid-gray)', lineHeight: 1.7 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Founding Collections ── */}
      <section ref={s4} id="collections" style={{ background: 'var(--cream)', padding: '96px 0' }}>
        <div className="container">
          <div className="lift-in" style={{ marginBottom: 56 }}>
            <div className="section-eyebrow">Five Collections. One Meaning.</div>
            <h2 className="section-title">The Founding Collections</h2>
            <p className="section-body">A portfolio designed to follow the customer through different identities and stages of life — without ever abandoning the single promise that holds it all together.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {collections.map((c, i) => (
              <div key={c.name} className={`lift-in d${i+1} card`} style={{ padding: 28, borderTop: `4px solid ${c.color}` }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: c.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{c.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>{c.name} Collection</h3>
                <p style={{ fontSize: 14, color: 'var(--mid-gray)', lineHeight: 1.6, marginBottom: 16 }}>{c.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {c.messages.map(m => (
                    <span key={m} style={{ fontSize: 11, fontWeight: 600, color: c.color, background: `${c.color}18`, border: `1px solid ${c.color}35`, borderRadius: 100, padding: '3px 10px' }}>{m}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="lift-in" style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/collections" className="btn btn-navy">Explore All Collections</Link>
          </div>
        </div>
      </section>

      {/* ── Section 5: Launch Status ── */}
      <section ref={s5} style={{ background: 'var(--navy)', padding: '96px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 64, alignItems: 'center' }}>
            <div>
              <div className="lift-in" style={{ display: 'inline-block', background: 'rgba(238,191,104,0.15)', border: '1px solid rgba(238,191,104,0.4)', borderRadius: 100, padding: '6px 16px', marginBottom: 20 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>🔥 Now in Production</span>
              </div>
              <h2 className="lift-in d1 section-title-light">The First Liftêd™ Samples Are Now in Production</h2>
              <div style={{ width: 56, height: 3, background: 'var(--gold)', borderRadius: 2, margin: '0 0 24px' }} />
              <p className="lift-in d2 section-body-light" style={{ marginBottom: 20 }}>
                Liftêd™ is currently developing its first private-label apparel samples. These garments are being produced with custom Liftêd™ labels — not printed on another manufacturer's consumer brand.
              </p>
              <p className="lift-in d3 section-body-light" style={{ marginBottom: 32 }}>
                Founding supporters, partners, and investors will receive behind-the-scenes updates and may be invited to help determine which designs move into the first official collection.
              </p>
              <div className="lift-in d4" style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <Link to="/founding-community" className="btn btn-gold">Join the Founding Community</Link>
                <Link to="/invest" className="btn btn-outline-light">Investor Overview</Link>
              </div>
            </div>
            <div className="lift-in d2">
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: 32 }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--gold)', marginBottom: 20 }}>Sample Validation Checklist</h4>
                {['Fabric quality', 'Fit and sizing', 'Sublimation print quality', 'Color accuracy', 'Label execution', 'Comfort & breathability', 'Wash durability', 'Shrinkage & pilling', 'Overall product experience'].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid var(--gold)', flexShrink: 0 }} />
                    <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 6: Organizations, Causes & Communities ── */}
      <section ref={s6} style={{ background: 'var(--warm-white)', padding: '96px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 64, alignItems: 'start' }}>
            <div>
              <div className="lift-in section-eyebrow">Collaboration Model</div>
              <h2 className="lift-in d1 section-title">Organizations, Causes, and Communities</h2>
              <div style={{ width: 56, height: 3, background: 'var(--gold)', borderRadius: 2, margin: '0 0 24px' }} />
              <p className="lift-in d2 section-body" style={{ marginBottom: 16 }}>
                Liftêd™ collaborates with organizations that want their apparel to represent more than an event logo. Each collaboration begins with a simple question:
              </p>
              <blockquote className="lift-in d3" style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic', color: 'var(--navy)', borderLeft: '4px solid var(--gold)', paddingLeft: 20, margin: '24px 0' }}>
                "Who are we trying to lift?"
              </blockquote>
              <p className="lift-in d4 section-body" style={{ marginBottom: 32 }}>
                Liftêd™ then develops an emotionally relevant message connected to the organization, audience, occasion, or cause — converting ordinary bulk apparel into meaningful brand assets that people will continue wearing after the event.
              </p>
              <Link to="/collaborate" className="lift-in d5 btn btn-gold">Request a Collaboration Concept</Link>
            </div>
            <div className="lift-in d2">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {['Corporate apparel', 'Employee appreciation', 'Leadership gifts', 'Golf tournaments', 'Charity events', 'Church retreats', 'School campaigns', 'Team programs', 'Fundraising stores', 'Awareness campaigns', 'Limited co-branded collections', 'Community events'].map(item => (
                  <div key={item} style={{ background: 'white', borderRadius: 8, padding: '12px 16px', fontSize: 14, color: 'var(--navy)', fontWeight: 500, boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: 'var(--gold)', fontWeight: 700 }}>→</span> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 7: How Would You Like to Be Involved ── */}
      <section ref={s7} style={{ background: 'var(--cream)', padding: '96px 0' }}>
        <div className="container">
          <div className="lift-in" style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-eyebrow">Find Your Path</div>
            <h2 className="section-title" style={{ margin: '0 auto 16px' }}>How Would You Like to Be Involved?</h2>
            <p style={{ fontSize: 17, color: 'var(--mid-gray)', maxWidth: 540, margin: '0 auto' }}>Liftêd™ is building a founding community of supporters, investors, partners, and ambassadors. Find your path below.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {pathways.map((p, i) => (
              <div key={p.id} className={`lift-in d${i+1} card`} style={{ padding: 28, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{p.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700, color: 'var(--navy)', marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--mid-gray)', lineHeight: 1.7, flex: 1, marginBottom: 20 }}>{p.desc}</p>
                <Link to={p.to} className="btn btn-ghost btn-sm">{p.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founding Collection Preview ── */}
      <section ref={sProd} style={{ background: 'var(--cream)', padding: '96px 0' }}>
        <div className="container">
          <div className="lift-in" style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-eyebrow">Founding Collection Preview</div>
            <h2 className="section-title" style={{ margin: '0 auto 16px' }}>The First Six Concepts</h2>
            <p style={{ fontSize: 17, color: 'var(--mid-gray)', maxWidth: 560, margin: '0 auto 12px', lineHeight: 1.7 }}>
              A curated preview of the founding collection. Each design carries a message for the wearer and a message for the world.
            </p>
            <p style={{ fontSize: 13, color: 'var(--mid-gray)', fontStyle: 'italic', maxWidth: 520, margin: '0 auto' }}>
              Product images shown are early samples or concept placeholders. Final designs will be confirmed after sample validation.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {FEATURED_PRODUCTS.map((product, i) => (
              <div key={product.id} className={`lift-in d${Math.min(i+1, 6)}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="lift-in" style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/collections" className="btn btn-navy">Explore All Collections</Link>
          </div>
        </div>
      </section>

      {/* ── Section 8: Closing CTA ── */}
      <section ref={s8} style={{ background: 'linear-gradient(160deg, #0F1A30 0%, #1A2744 100%)', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', height: '60%', background: 'radial-gradient(ellipse at 50% 100%, rgba(238,191,104,0.2) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div className="lift-in">
            <div className="section-eyebrow" style={{ color: 'var(--gold)' }}>The Movement</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, color: 'white', marginBottom: 20, lineHeight: 1.2 }}>
              Wear Encouragement.<br /><span style={{ color: 'var(--gold)' }}>Wear Liftêd™.</span>
            </h2>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.7 }}>
              The world needs more people who refuse to quit. That's who we make this for. Join us before the official launch.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
              <Link to="/founding-community" className="btn btn-gold btn-lg">Join the Founding Community</Link>
              <Link to="/schedule" className="btn btn-outline-light btn-lg">Schedule a Conversation</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
