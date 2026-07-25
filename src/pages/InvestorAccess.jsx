/**
 * /investor-access — Public investor access request page
 * Form submits via formBridge → HighLevel Forms API (form ID: eylaKSX7etKXpjDAF84s)
 * No automatic account creation. No Firebase user created here.
 * Switch VITE_FORM_TARGET=api to route to /api/investor-access when backend is ready.
 */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { submitInvestorAccess } from '../lib/formBridge.js'
import { TM } from '../components/TM.jsx'

export default function InvestorAccess() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    company: '', role: '', interestType: '', howHeard: '',
    whyInterested: '', investmentRange: '',
    consentEmail: false, consentSms: false,
  })
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [honeypot, setHoneypot] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.firstName || !form.lastName || !form.email) return
    setStatus('submitting')
    setErrorMsg('')
    try {
      await submitInvestorAccess(form, honeypot)
      setStatus('success')
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Your information has been preserved — please try again.')
      setStatus('error')
    }
  }

  const inputStyle = {
    width: '100%', padding: '12px 14px', background: 'var(--off-white)',
    border: '1.5px solid var(--charcoal)', borderRadius: 'var(--radius)',
    fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--charcoal)',
    outline: 'none', boxSizing: 'border-box',
  }
  const labelStyle = {
    display: 'block', fontFamily: 'var(--font-body)', fontSize: 11,
    fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
    color: 'var(--earth-brown)', marginBottom: 6,
  }

  return (
    <div style={{ background: 'var(--warm-cream)', minHeight: '100vh', paddingTop: 80 }}>
      {/* Hero */}
      <div style={{ background: 'var(--black)', padding: '64px 0 48px', borderBottom: '3px solid var(--burnt-orange)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 20px' }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--burnt-orange)', marginBottom: 14 }}>Private Access</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 5vw, 52px)', color: 'var(--off-white)', lineHeight: 1.0, letterSpacing: '-0.02em', textTransform: 'none', marginBottom: 20 }}>
            R<span style={{ color: 'var(--sand)', textTransform: 'none' }}>ê</span>quest Private<br />Investor Access
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'rgba(247,244,236,0.7)', lineHeight: 1.7, maxWidth: 560 }}>
            Liftêd<TM/> is currently sharing its business opportunity with selected investors, strategic partners, advisors, and supporters. Submit your information below to request access to the private Liftêd<TM/> information room.
          </p>
        </div>
      </div>

      {/* Form */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 20px 80px' }}>
        {status === 'success' ? (
          <div style={{ background: 'var(--off-white)', border: '2px solid var(--burnt-orange)', padding: '40px 32px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--charcoal)', marginBottom: 16, textTransform: 'none' }}>Request Received</div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--muted-olive)', lineHeight: 1.7, marginBottom: 24 }}>
              Thank you. Your request has been received and will be reviewed. Approved applicants will receive a secure email invitation with private access instructions.
            </p>
            <Link to="/" style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--burnt-orange)', textDecoration: 'none' }}>← Return to Liftêd™</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Honeypot — hidden from real users, catches bots */}
            <input type="text" value={honeypot} onChange={e => setHoneypot(e.target.value)} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 16 }}>
              <div><label style={labelStyle}>First Name *</label><input style={inputStyle} value={form.firstName} onChange={e => set('firstName', e.target.value)} required /></div>
              <div><label style={labelStyle}>Last Name *</label><input style={inputStyle} value={form.lastName} onChange={e => set('lastName', e.target.value)} required /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 16 }}>
              <div><label style={labelStyle}>Email Address *</label><input type="email" style={inputStyle} value={form.email} onChange={e => set('email', e.target.value)} required /></div>
              <div><label style={labelStyle}>Mobile Number</label><input type="tel" style={inputStyle} value={form.phone} onChange={e => set('phone', e.target.value)} /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 16 }}>
              <div><label style={labelStyle}>Company or Organization</label><input style={inputStyle} value={form.company} onChange={e => set('company', e.target.value)} /></div>
              <div><label style={labelStyle}>Professional Role</label><input style={inputStyle} value={form.role} onChange={e => set('role', e.target.value)} placeholder="e.g. CEO, Investor, Advisor" /></div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Interest Type</label>
              <select style={{ ...inputStyle, appearance: 'none' }} value={form.interestType} onChange={e => set('interestType', e.target.value)}>
                <option value="">Select one...</option>
                <option>Potential Investor</option>
                <option>Strategic Partner</option>
                <option>Advisor</option>
                <option>Sponsor</option>
                <option>Other</option>
              </select>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>How Did You Hear About Liftêd<TM/>?</label>
              <input style={inputStyle} value={form.howHeard} onChange={e => set('howHeard', e.target.value)} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Why Are You Interested?</label>
              <textarea style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }} value={form.whyInterested} onChange={e => set('whyInterested', e.target.value)} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Anticipated Investment Range (Optional)</label>
              <select style={{ ...inputStyle, appearance: 'none' }} value={form.investmentRange} onChange={e => set('investmentRange', e.target.value)}>
                <option value="">Prefer not to say</option>
                <option>Under $10,000</option>
                <option>$10,000 – $25,000</option>
                <option>$25,000 – $50,000</option>
                <option>$50,000 – $100,000</option>
                <option>$100,000 – $250,000</option>
                <option>$250,000+</option>
              </select>
            </div>
            <div style={{ marginBottom: 12, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <input type="checkbox" id="consentEmail" checked={form.consentEmail} onChange={e => set('consentEmail', e.target.checked)} style={{ marginTop: 2, flexShrink: 0 }} />
              <label htmlFor="consentEmail" style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--charcoal)', lineHeight: 1.6, cursor: 'pointer' }}>
                I consent to receive email follow-up from Liftêd<TM/> regarding my access request.
              </label>
            </div>
            <div style={{ marginBottom: 28, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <input type="checkbox" id="consentSms" checked={form.consentSms} onChange={e => set('consentSms', e.target.checked)} style={{ marginTop: 2, flexShrink: 0 }} />
              <label htmlFor="consentSms" style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--charcoal)', lineHeight: 1.6, cursor: 'pointer' }}>
                I consent to receive SMS follow-up from Liftêd<TM/>. Message and data rates may apply.
              </label>
            </div>
            {status === 'error' && (
              <div style={{ background: '#FEE2E2', border: '1px solid #EF4444', padding: '12px 16px', marginBottom: 16, fontFamily: 'var(--font-body)', fontSize: 13, color: '#B91C1C', borderRadius: 'var(--radius)' }}>
                {errorMsg}
              </div>
            )}
            <button
              type="submit"
              disabled={status === 'submitting'}
              style={{ width: '100%', padding: '16px', background: status === 'submitting' ? 'var(--muted-olive)' : 'var(--burnt-orange)', color: 'var(--off-white)', border: 'none', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: status === 'submitting' ? 'wait' : 'pointer', transition: 'background 0.15s' }}
            >
              {status === 'submitting' ? 'Submitting...' : 'Request Access'}
            </button>
            <div style={{ marginTop: 20, padding: '16px', background: 'rgba(41,42,40,0.06)', borderLeft: '3px solid var(--burnt-orange)', fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--muted-olive)', lineHeight: 1.7 }}>
              Information provided through this website is for informational purposes only and does not constitute an offer to sell or a solicitation to purchase securities.
            </div>
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--muted-olive)' }}>Already have access? </span>
              <Link to="/investor-login" style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--burnt-orange)', fontWeight: 700 }}>Sign In →</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
