import React, { useEffect, useRef, useState } from 'react'

function useLiftIn(ref) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    ref.current?.querySelectorAll('.lift-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

export default function Contact() {
  const ref = useRef(null)
  useLiftIn(ref)
  const [type, setType] = useState('investor')
  const [submitted, setSubmitted] = useState(false)

  const types = [
    { id: 'investor', label: '💼 Investor Inquiry' },
    { id: 'partner', label: '🤝 Partnership / Collaboration' },
    { id: 'school', label: '🏫 School / Team Program' },
    { id: 'corporate', label: '🏢 Corporate Wellness' },
    { id: 'ambassador', label: '⭐ Ambassador' },
    { id: 'customer', label: '🛒 Customer / Shop' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" ref={ref} style={{ background: 'var(--warm-white)', padding: '100px 24px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 64, alignItems: 'start' }}>
          <div>
            <div className="lift-in section-eyebrow">Get In Touch</div>
            <h2 className="lift-in d1 section-title">The World Needs More Liftêd™.</h2>
            <div style={{ width: 60, height: 3, background: 'var(--gold)', borderRadius: 2, margin: '0 0 24px' }} />
            <p className="lift-in d2 section-body" style={{ marginBottom: 32 }}>
              Whether you're an investor who sees the opportunity, a school looking to partner,
              a corporation wanting to lift your team, or someone who simply wants to wear encouragement —
              we'd love to hear from you.
            </p>
            <div className="lift-in d3" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: '🌐', label: 'Website', val: 'WearLiftedToday.com' },
                { icon: '📱', label: 'Campaign', val: '#StayLiftêd' },
                { icon: '✉️', label: 'Tagline', val: 'Wear Encouragement. Wear Liftêd™.' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10, background: 'rgba(200,146,42,0.12)',
                    border: '1px solid rgba(200,146,42,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0,
                  }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mid-gray)', marginBottom: 2 }}>{item.label}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--navy)' }}>{item.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lift-in d2">
            {submitted ? (
              <div style={{
                background: 'var(--navy)', borderRadius: 16, padding: '48px 40px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>↑</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--gold)', marginBottom: 12 }}>You're Liftêd™.</h3>
                <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
                  Thank you for reaching out. We'll be in touch soon. The world needs more Liftêd™ — and people like you make it happen.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{
                background: 'white', borderRadius: 16, padding: '40px',
                boxShadow: '0 4px 32px rgba(0,0,0,0.08)',
              }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--navy)', marginBottom: 24 }}>Start a Conversation</h3>
                {/* Type selector */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                  {types.map(t => (
                    <button key={t.id} type="button" onClick={() => setType(t.id)} style={{
                      padding: '7px 14px', borderRadius: 100, border: 'none', cursor: 'pointer',
                      fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600,
                      background: type === t.id ? 'var(--gold)' : 'var(--off-white)',
                      color: type === t.id ? 'var(--navy-deep)' : 'var(--mid-gray)',
                      transition: 'all 0.2s',
                    }}>{t.label}</button>
                  ))}
                </div>
                {[
                  { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' },
                  { id: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
                  { id: 'org', label: 'Organization / Company', type: 'text', placeholder: 'Optional' },
                ].map(field => (
                  <div key={field.id} style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--navy)', marginBottom: 6, letterSpacing: '0.04em' }}>{field.label}</label>
                    <input type={field.type} placeholder={field.placeholder} required={field.id !== 'org'} style={{
                      width: '100%', padding: '12px 16px', borderRadius: 8,
                      border: '1.5px solid var(--light-gray)', fontFamily: 'var(--font-body)', fontSize: 14,
                      outline: 'none', transition: 'border-color 0.2s',
                      background: 'var(--warm-white)',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                    onBlur={e => e.target.style.borderColor = 'var(--light-gray)'}
                    />
                  </div>
                ))}
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--navy)', marginBottom: 6, letterSpacing: '0.04em' }}>Message</label>
                  <textarea rows={4} placeholder="Tell us about your interest in Liftêd™..." required style={{
                    width: '100%', padding: '12px 16px', borderRadius: 8,
                    border: '1.5px solid var(--light-gray)', fontFamily: 'var(--font-body)', fontSize: 14,
                    outline: 'none', resize: 'vertical', transition: 'border-color 0.2s',
                    background: 'var(--warm-white)',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                  onBlur={e => e.target.style.borderColor = 'var(--light-gray)'}
                  />
                </div>
                <button type="submit" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '15px', fontSize: 15 }}>
                  Send Message ↑
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

