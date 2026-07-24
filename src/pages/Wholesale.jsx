/**
 * /wholesale — Carry Liftêd™ in Your Store
 * Separate from /collaborate (co-branded campaigns) and /investor-access.
 * Retailers buy inventory for resale.
 */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Wholesale() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    businessName: '', businessType: '', website: '', location: '',
    storeCount: '', currentBrands: '', whyLifted: '',
    estimatedMonthlyUnits: '', consentEmail: false, consentSms: false,
  })
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('/api/wholesale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed')
      setStatus('success')
    } catch (err) {
      setErrorMsg(err.message)
      setStatus('error')
    }
  }

  const inputStyle = { width: '100%', padding: '12px 14px', background: 'var(--off-white)', border: '1.5px solid var(--charcoal)', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--charcoal)', outline: 'none', boxSizing: 'border-box' }
  const labelStyle = { display: 'block', fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--earth-brown)', marginBottom: 6 }

  return (
    <div style={{ background: 'var(--warm-cream)', minHeight: '100vh', paddingTop: 80 }}>
      <div style={{ background: 'var(--black)', padding: '64px 0 48px', borderBottom: '3px solid var(--burnt-orange)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 20px' }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--burnt-orange)', marginBottom: 14 }}>Wholesale</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 5vw, 52px)', color: 'var(--off-white)', lineHeight: 1.0, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: 20 }}>
            Carry Liftêd™<br />in Your Store
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'rgba(247,244,236,0.7)', lineHeight: 1.7, maxWidth: 560 }}>
            Liftêd™ is building its wholesale retailer network. Apply to carry Liftêd™ in your store, boutique, gym, or online shop.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 20px 80px' }}>
        {/* Distinction callout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 48 }}>
          {[
            { label: 'Wholesale', desc: 'Buy Liftêd™ inventory at wholesale pricing and resell in your store.', active: true },
            { label: 'Collaborate', desc: 'Create a co-branded Liftêd™ campaign, event, or product for your organization.', to: '/collaborate' },
            { label: 'Invest', desc: 'Explore the Liftêd™ business opportunity as a qualified investor.', to: '/investor-access' },
          ].map(p => (
            <div key={p.label} style={{ padding: '20px', background: p.active ? 'var(--charcoal)' : 'var(--off-white)', border: `1.5px solid ${p.active ? 'var(--burnt-orange)' : 'var(--charcoal)'}`, borderRadius: 'var(--radius)' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: p.active ? 'var(--burnt-orange)' : 'var(--muted-olive)', marginBottom: 8 }}>{p.label}</div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: p.active ? 'rgba(247,244,236,0.7)' : 'var(--muted-olive)', lineHeight: 1.6, marginBottom: p.to ? 12 : 0 }}>{p.desc}</p>
              {p.to && <Link to={p.to} style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: 'var(--burnt-orange)', textDecoration: 'none' }}>Learn more →</Link>}
            </div>
          ))}
        </div>

        {status === 'success' ? (
          <div style={{ background: 'var(--off-white)', border: '2px solid var(--burnt-orange)', padding: '40px 32px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--charcoal)', marginBottom: 16, textTransform: 'uppercase' }}>Application Received</div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--muted-olive)', lineHeight: 1.7 }}>Your wholesale application has been received. Our team will review it and be in touch within 3–5 business days.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ background: 'var(--off-white)', border: '1.5px solid var(--charcoal)', padding: '36px 32px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--charcoal)', marginBottom: 28, textTransform: 'uppercase' }}>Retailer Application</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div><label style={labelStyle}>First Name *</label><input style={inputStyle} value={form.firstName} onChange={e => set('firstName', e.target.value)} required /></div>
              <div><label style={labelStyle}>Last Name *</label><input style={inputStyle} value={form.lastName} onChange={e => set('lastName', e.target.value)} required /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div><label style={labelStyle}>Email *</label><input type="email" style={inputStyle} value={form.email} onChange={e => set('email', e.target.value)} required /></div>
              <div><label style={labelStyle}>Phone</label><input type="tel" style={inputStyle} value={form.phone} onChange={e => set('phone', e.target.value)} /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div><label style={labelStyle}>Business Name *</label><input style={inputStyle} value={form.businessName} onChange={e => set('businessName', e.target.value)} required /></div>
              <div><label style={labelStyle}>Business Type</label>
                <select style={{ ...inputStyle, appearance: 'none' }} value={form.businessType} onChange={e => set('businessType', e.target.value)}>
                  <option value="">Select...</option>
                  <option>Retail Store</option><option>Boutique</option><option>Gym / Fitness Studio</option>
                  <option>Online Store</option><option>Gift Shop</option><option>Corporate Gifting</option><option>Other</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div><label style={labelStyle}>Website</label><input type="url" style={inputStyle} value={form.website} onChange={e => set('website', e.target.value)} placeholder="https://" /></div>
              <div><label style={labelStyle}>Location (City, State)</label><input style={inputStyle} value={form.location} onChange={e => set('location', e.target.value)} /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div><label style={labelStyle}>Number of Locations</label><input style={inputStyle} value={form.storeCount} onChange={e => set('storeCount', e.target.value)} placeholder="e.g. 1, 3, 10+" /></div>
              <div><label style={labelStyle}>Estimated Monthly Units</label><input style={inputStyle} value={form.estimatedMonthlyUnits} onChange={e => set('estimatedMonthlyUnits', e.target.value)} placeholder="e.g. 50, 200" /></div>
            </div>
            <div style={{ marginBottom: 16 }}><label style={labelStyle}>Current Brands You Carry</label><input style={inputStyle} value={form.currentBrands} onChange={e => set('currentBrands', e.target.value)} /></div>
            <div style={{ marginBottom: 24 }}><label style={labelStyle}>Why Do You Want to Carry Liftêd™?</label><textarea style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }} value={form.whyLifted} onChange={e => set('whyLifted', e.target.value)} /></div>
            <div style={{ marginBottom: 12, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <input type="checkbox" id="wConsentEmail" checked={form.consentEmail} onChange={e => set('consentEmail', e.target.checked)} style={{ marginTop: 2 }} />
              <label htmlFor="wConsentEmail" style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--charcoal)', lineHeight: 1.6, cursor: 'pointer' }}>I consent to receive email follow-up from Liftêd™ regarding my application.</label>
            </div>
            <div style={{ marginBottom: 28, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <input type="checkbox" id="wConsentSms" checked={form.consentSms} onChange={e => set('consentSms', e.target.checked)} style={{ marginTop: 2 }} />
              <label htmlFor="wConsentSms" style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--charcoal)', lineHeight: 1.6, cursor: 'pointer' }}>I consent to receive SMS follow-up. Message and data rates may apply.</label>
            </div>
            {status === 'error' && <div style={{ background: '#FEE2E2', border: '1px solid #EF4444', padding: '12px 16px', marginBottom: 16, fontFamily: 'var(--font-body)', fontSize: 13, color: '#B91C1C' }}>{errorMsg}</div>}
            <button type="submit" disabled={status === 'submitting'} style={{ width: '100%', padding: '16px', background: 'var(--burnt-orange)', color: 'var(--off-white)', border: 'none', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: status === 'submitting' ? 'wait' : 'pointer' }}>
              {status === 'submitting' ? 'Submitting...' : 'Submit Wholesale Application'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
