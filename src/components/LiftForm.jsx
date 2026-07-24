import React, { useState } from 'react'

// HighLevel location ID for Liftêd sub-account
const HL_LOCATION_ID = 'aONTFrcg4GyEubg0xdwW'

const INTEREST_TAGS = {
  founding: 'Liftêd™ – Founding Community',
  investor: 'Liftêd™ – Investor Lead',
  sponsor: 'Liftêd™ – Sponsor Lead',
  partner: 'Liftêd™ – Collaboration Lead',
  ambassador: 'Liftêd™ – Ambassador Lead',
  customer: 'Liftêd™ – Customer Interest',
  sample: 'Liftêd™ – Sample Recipient',
  qr: 'Liftêd™ – QR Scan',
}

export default function LiftForm({ type = 'founding', title, subtitle, dark = false, onSuccess }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', organization: '', jobTitle: '', cityState: '', message: '', referralSource: '', sampleReceived: '', preferredMeeting: '', investmentRange: '', collaborationEstimate: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      // Submit to HighLevel Contacts API
      const payload = {
        locationId: HL_LOCATION_ID,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        companyName: form.organization,
        tags: [INTEREST_TAGS[type]].filter(Boolean),
        customFields: [
          { key: 'job_title', field_value: form.jobTitle },
          { key: 'city_state', field_value: form.cityState },
          { key: 'interest_type', field_value: type },
          { key: 'message', field_value: form.message },
          { key: 'referral_source', field_value: form.referralSource },
          { key: 'sample_received', field_value: form.sampleReceived },
          { key: 'preferred_meeting', field_value: form.preferredMeeting },
          ...(type === 'investor' ? [{ key: 'investment_range', field_value: form.investmentRange }] : []),
          ...(type === 'partner' ? [{ key: 'collaboration_estimate', field_value: form.collaborationEstimate }] : []),
        ].filter(f => f.field_value),
        source: 'WearLiftedToday.com',
      }
      const res = await fetch('https://services.leadconnectorhq.com/contacts/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Version': '2021-07-28' },
        body: JSON.stringify(payload),
      })
      if (res.ok || res.status === 422) {
        setSubmitted(true)
        onSuccess && onSuccess(form)
      } else {
        setError('Something went wrong. Please try again or email us directly.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  const inputStyle = { background: dark ? 'rgba(247,244,236,0.07)' : 'white', color: dark ? 'white' : 'var(--charcoal)', borderColor: dark ? 'rgba(247,244,236,0.15)' : 'var(--light-gray)' }
  const labelStyle = { color: dark ? 'rgba(247,244,236,0.7)' : 'var(--charcoal)' }

  if (submitted) return (
    <div style={{ textAlign: 'center', padding: '48px 24px' }}>
      <div style={{ fontSize: 48, marginBottom: 16, color: 'var(--gold)' }}>↑</div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: dark ? 'white' : 'var(--charcoal)', marginBottom: 12 }}>You're Liftêd™.</h3>
      <p style={{ fontSize: 16, color: dark ? 'rgba(247,244,236,0.7)' : 'var(--muted-olive)', lineHeight: 1.7 }}>
        Thank you for reaching out. We'll be in touch soon. The world needs more Liftêd™ — and people like you make it happen.
      </p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit}>
      {title && <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: dark ? 'white' : 'var(--charcoal)', marginBottom: 8 }}>{title}</h3>}
      {subtitle && <p style={{ fontSize: 15, color: dark ? 'rgba(247,244,236,0.6)' : 'var(--muted-olive)', marginBottom: 24, lineHeight: 1.6 }}>{subtitle}</p>}

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" style={labelStyle}>First Name *</label>
          <input className="form-input" style={inputStyle} required value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="First name" />
        </div>
        <div className="form-group">
          <label className="form-label" style={labelStyle}>Last Name *</label>
          <input className="form-input" style={inputStyle} required value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Last name" />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" style={labelStyle}>Email *</label>
          <input className="form-input" style={inputStyle} type="email" required value={form.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com" />
        </div>
        <div className="form-group">
          <label className="form-label" style={labelStyle}>Mobile Phone *</label>
          <input className="form-input" style={inputStyle} type="tel" required value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="(555) 000-0000" />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" style={labelStyle}>Organization</label>
          <input className="form-input" style={inputStyle} value={form.organization} onChange={e => set('organization', e.target.value)} placeholder="Company or org" />
        </div>
        <div className="form-group">
          <label className="form-label" style={labelStyle}>City / State</label>
          <input className="form-input" style={inputStyle} value={form.cityState} onChange={e => set('cityState', e.target.value)} placeholder="Phoenix, AZ" />
        </div>
      </div>

      {type === 'investor' && (
        <div className="form-group">
          <label className="form-label" style={labelStyle}>Investment Range (Optional)</label>
          <select className="form-select" style={inputStyle} value={form.investmentRange} onChange={e => set('investmentRange', e.target.value)}>
            <option value="">Select a range</option>
            <option>Under $10,000</option>
            <option>$10,000 – $25,000</option>
            <option>$25,000 – $50,000</option>
            <option>$50,000 – $100,000</option>
            <option>$100,000+</option>
            <option>Prefer to discuss</option>
          </select>
        </div>
      )}
      {type === 'partner' && (
        <div className="form-group">
          <label className="form-label" style={labelStyle}>Estimated Order Size (Optional)</label>
          <select className="form-select" style={inputStyle} value={form.collaborationEstimate} onChange={e => set('collaborationEstimate', e.target.value)}>
            <option value="">Select a range</option>
            <option>Under 50 units</option>
            <option>50–100 units</option>
            <option>100–250 units</option>
            <option>250–500 units</option>
            <option>500+ units</option>
            <option>Not sure yet</option>
          </select>
        </div>
      )}

      <div className="form-group">
        <label className="form-label" style={labelStyle}>Preferred Meeting Type</label>
        <select className="form-select" style={inputStyle} value={form.preferredMeeting} onChange={e => set('preferredMeeting', e.target.value)}>
          <option value="">Select</option>
          <option>Zoom call</option>
          <option>Phone call</option>
          <option>In-person</option>
          <option>Email first</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label" style={labelStyle}>Message</label>
        <textarea className="form-textarea" style={inputStyle} value={form.message} onChange={e => set('message', e.target.value)} placeholder="Tell us about your interest in Liftêd™..." />
      </div>
      <div className="form-group">
        <label className="form-label" style={labelStyle}>How did you hear about us?</label>
        <select className="form-select" style={inputStyle} value={form.referralSource} onChange={e => set('referralSource', e.target.value)}>
          <option value="">Select</option>
          <option>QR code on a shirt</option>
          <option>QR code on a card / postcard</option>
          <option>Mailed sample kit</option>
          <option>Social media</option>
          <option>Referred by someone</option>
          <option>Presentation / meeting</option>
          <option>Search engine</option>
          <option>Other</option>
        </select>
      </div>

      {error && <p style={{ color: '#c0392b', fontSize: 14, marginBottom: 16 }}>{error}</p>}

      <p style={{ fontSize: 12, color: dark ? 'rgba(247,244,236,0.4)' : 'var(--muted-olive)', marginBottom: 16, lineHeight: 1.6 }}>
        By submitting this form, you consent to receive email and SMS communications from Liftêd™ / ARMS Reach Digital Agency. You may opt out at any time.
      </p>

      <button type="submit" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '15px' }} disabled={loading}>
        {loading ? 'Sending…' : 'Submit ↑'}
      </button>
    </form>
  )
}

