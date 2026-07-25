import PageHero from '../components/PageHero.jsx'
/**
 * /wholesale — Carry Liftêd™ in Your Stor<span style={{ color: 'var(--sand)', textTransform: 'none' }}>ê</span>
 * Submits via formBridge → HighLevel Forms API (form ID: wA5FYCmpPjckyDsPCEYF)
 * Field keys confirmed from HighLevel Settings → Custom Fields (Jul 24, 2026).
 * Creates a wholesale application only — no retailer account created here.
 */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { submitWholesale } from '../lib/formBridge.js'
import { TM } from '../components/TM.jsx'

const inputStyle = {
  width: '100%', padding: '12px 14px', background: 'var(--off-white)',
  border: '1.5px solid var(--charcoal)', borderRadius: 'var(--radius)',
  fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--charcoal)',
  outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s',
}
const labelStyle = {
  display: 'block', fontFamily: 'var(--font-body)', fontSize: 11,
  fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
  color: 'var(--earth-brown)', marginBottom: 6,
}
const gridTwo = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 16 }
const field = { marginBottom: 16 }

export default function Wholesale() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    businessName: '', website: '', city: '', state: '',
    storeType: '', retailChannel: '', numberOfLocations: '',
    yearsInBusiness: '', existingBrands: '', estimatedOpeningOrder: '',
    collectionsOfInterest: '', resaleCertStatus: '',
    howHeard: '', additionalNotes: '',
    consentEmail: false, consentSms: false,
  })
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [honeypot, setHoneypot] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')
    try {
      await submitWholesale(form, honeypot)
      setStatus('success')
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Your information has been preserved — please try again.')
      setStatus('error')
    }
  }

  return (
    <div style={{ background: 'var(--warm-cream)', minHeight: '100vh' }}>
      {/* Hero */}
      <PageHero
        eyebrow="WHOLESALE"
        heading={<>Carry Lift<span style={{ color: 'var(--sand)' }}>ê</span>d<TM /><br />in Your Store</>}
        description="Liftêd™ is accepting wholesale applications from retailers who want to carry encouragement-driven apparel. Complete the form below to start the conversation."
      />

      {/* Form */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 20px 80px' }}>
        {status === 'success' ? (
          <div style={{ background: 'var(--off-white)', border: '2px solid var(--burnt-orange)', padding: '40px 32px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--charcoal)', marginBottom: 16, textTransform: 'uppercase' }}>Application Received</div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--muted-olive)', lineHeight: 1.7, marginBottom: 24 }}>
              Thank you for your interest in carrying Liftêd™. We'll review your application and be in touch within 3–5 business days.
            </p>
            <Link to="/" style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--burnt-orange)', textDecoration: 'none' }}>← Return to Liftêd™</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {/* Honeypot */}
            <input type="text" value={honeypot} onChange={e => setHoneypot(e.target.value)} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

            {/* Section: Contact */}
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--burnt-orange)', marginBottom: 16, paddingBottom: 8, borderBottom: '1.5px solid var(--burnt-orange)' }}>Contact Information</div>
            <div style={gridTwo}>
              <div><label style={labelStyle}>First Name *</label><input style={inputStyle} value={form.firstName} onChange={e => set('firstName', e.target.value)} required /></div>
              <div><label style={labelStyle}>Last Name *</label><input style={inputStyle} value={form.lastName} onChange={e => set('lastName', e.target.value)} required /></div>
            </div>
            <div style={gridTwo}>
              <div><label style={labelStyle}>Email Address *</label><input type="email" style={inputStyle} value={form.email} onChange={e => set('email', e.target.value)} required /></div>
              <div><label style={labelStyle}>Phone</label><input type="tel" style={inputStyle} value={form.phone} onChange={e => set('phone', e.target.value)} /></div>
            </div>

            {/* Section: Business */}
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--burnt-orange)', marginBottom: 16, paddingBottom: 8, borderBottom: '1.5px solid var(--burnt-orange)', marginTop: 32 }}>Business Information</div>
            <div style={gridTwo}>
              <div><label style={labelStyle}>Business Name *</label><input style={inputStyle} value={form.businessName} onChange={e => set('businessName', e.target.value)} required /></div>
              <div><label style={labelStyle}>Website</label><input type="url" style={inputStyle} value={form.website} onChange={e => set('website', e.target.value)} placeholder="https://" /></div>
            </div>
            <div style={gridTwo}>
              <div><label style={labelStyle}>City</label><input style={inputStyle} value={form.city} onChange={e => set('city', e.target.value)} /></div>
              <div><label style={labelStyle}>State</label><input style={inputStyle} value={form.state} onChange={e => set('state', e.target.value)} placeholder="e.g. AZ" /></div>
            </div>
            <div style={gridTwo}>
              <div>
                <label style={labelStyle}>Store Type</label>
                {/* contact.store_type — Dropdown (single) */}
                <select style={{ ...inputStyle, appearance: 'none' }} value={form.storeType} onChange={e => set('storeType', e.target.value)}>
                  <option value="">Select one...</option>
                  <option value="Brick & Mortar">Brick &amp; Mortar</option>
                  <option value="Online Store">Online Store</option>
                  <option value="Both">Both</option>
                  <option value="Pop-Up / Events">Pop-Up / Events</option>
                  <option value="Corporate Gifting">Corporate Gifting</option>
                  <option value="Gift Shop">Gift Shop</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Retail Channel</label>
                {/* contact.retail_channel — Dropdown (single) */}
                <select style={{ ...inputStyle, appearance: 'none' }} value={form.retailChannel} onChange={e => set('retailChannel', e.target.value)}>
                  <option value="">Select one...</option>
                  <option value="Independent Boutique">Independent Boutique</option>
                  <option value="Sporting Goods">Sporting Goods</option>
                  <option value="Fitness / Gym">Fitness / Gym</option>
                  <option value="School / University">School / University</option>
                  <option value="Faith Organization">Faith Organization</option>
                  <option value="Corporate">Corporate</option>
                  <option value="E-Commerce">E-Commerce</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div style={gridTwo}>
              <div>
                <label style={labelStyle}>Number of Locations</label>
                {/* contact.number_of_locations — Dropdown (single) */}
                <select style={{ ...inputStyle, appearance: 'none' }} value={form.numberOfLocations} onChange={e => set('numberOfLocations', e.target.value)}>
                  <option value="">Select one...</option>
                  <option value="1">1</option>
                  <option value="2–5">2–5</option>
                  <option value="6–20">6–20</option>
                  <option value="21–50">21–50</option>
                  <option value="50+">50+</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Years in Business</label>
                {/* contact.years_in_business — Number */}
                <input type="number" min="0" style={inputStyle} value={form.yearsInBusiness} onChange={e => set('yearsInBusiness', e.target.value)} placeholder="e.g. 5" />
              </div>
            </div>

            {/* Section: Order Details */}
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--burnt-orange)', marginBottom: 16, paddingBottom: 8, borderBottom: '1.5px solid var(--burnt-orange)', marginTop: 32 }}>Order Details</div>
            <div style={field}>
              <label style={labelStyle}>Existing Apparel Brands You Carry</label>
              {/* contact.existing_apparel_brands — Multi line */}
              <textarea style={{ ...inputStyle, minHeight: 72, resize: 'vertical' }} value={form.existingBrands} onChange={e => set('existingBrands', e.target.value)} placeholder="List any apparel brands you currently carry" />
            </div>
            <div style={gridTwo}>
              <div>
                <label style={labelStyle}>Estimated Opening Order</label>
                {/* contact.estimated_opening_order — Dropdown (single) */}
                <select style={{ ...inputStyle, appearance: 'none' }} value={form.estimatedOpeningOrder} onChange={e => set('estimatedOpeningOrder', e.target.value)}>
                  <option value="">Select one...</option>
                  <option value="Under $500">Under $500</option>
                  <option value="$500 – $1,000">$500 – $1,000</option>
                  <option value="$1,000 – $2,500">$1,000 – $2,500</option>
                  <option value="$2,500 – $5,000">$2,500 – $5,000</option>
                  <option value="$5,000+">$5,000+</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Resale Certificate Status</label>
                {/* contact.resale_certificate_status — Dropdown (single) */}
                <select style={{ ...inputStyle, appearance: 'none' }} value={form.resaleCertStatus} onChange={e => set('resaleCertStatus', e.target.value)}>
                  <option value="">Select one...</option>
                  <option value="Yes — I have one">Yes — I have one</option>
                  <option value="In Progress">In Progress</option>
                  <option value="No — I need to get one">No — I need to get one</option>
                  <option value="Not Applicable">Not Applicable</option>
                </select>
              </div>
            </div>
            <div style={field}>
              <label style={labelStyle}>Liftêd™ Collections of Interest</label>
              {/* contact.liftd_collections_of_interest — Dropdown (multiple) */}
              <select style={{ ...inputStyle, height: 110, appearance: 'none' }} multiple value={form.collectionsOfInterest ? form.collectionsOfInterest.split(',') : []} onChange={e => set('collectionsOfInterest', Array.from(e.target.selectedOptions, o => o.value).join(','))}>
                <option value="Core Collection">Core Collection</option>
                <option value="Pick-Me-Up Collection">Pick-Me-Up Collection</option>
                <option value="Athlete Collection">Athlete Collection</option>
                <option value="Youth Collection">Youth Collection</option>
                <option value="Collaboration Collection">Collaboration Collection</option>
              </select>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--muted-olive)', marginTop: 4 }}>Hold Ctrl/Cmd to select multiple</div>
            </div>

            {/* Section: Additional */}
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--burnt-orange)', marginBottom: 16, paddingBottom: 8, borderBottom: '1.5px solid var(--burnt-orange)', marginTop: 32 }}>Additional Information</div>
            <div style={field}>
              <label style={labelStyle}>How Did You Hear About Liftêd™?</label>
              {/* contact.how_did_you_hear_about_liftd — Dropdown (single) */}
              <select style={{ ...inputStyle, appearance: 'none' }} value={form.howHeard} onChange={e => set('howHeard', e.target.value)}>
                <option value="">Select one...</option>
                <option value="Personal Referral">Personal Referral</option>
                <option value="Social Media">Social Media</option>
                <option value="QR Code">QR Code</option>
                <option value="Trade Show or Event">Trade Show or Event</option>
                <option value="Online Search">Online Search</option>
                <option value="Email">Email</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div style={field}>
              <label style={labelStyle}>Additional Notes</label>
              {/* contact.additional_notes — Multi line */}
              <textarea style={{ ...inputStyle, minHeight: 88, resize: 'vertical' }} value={form.additionalNotes} onChange={e => set('additionalNotes', e.target.value)} placeholder="Anything else you'd like us to know?" />
            </div>

            {/* Consent */}
            <div style={{ marginBottom: 12, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <input type="checkbox" id="consentEmail" checked={form.consentEmail} onChange={e => set('consentEmail', e.target.checked)} style={{ marginTop: 2, flexShrink: 0 }} />
              <label htmlFor="consentEmail" style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--charcoal)', lineHeight: 1.6, cursor: 'pointer' }}>
                I consent to receive email follow-up from Liftêd™ regarding my wholesale application.
              </label>
            </div>
            <div style={{ marginBottom: 28, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <input type="checkbox" id="consentSms" checked={form.consentSms} onChange={e => set('consentSms', e.target.checked)} style={{ marginTop: 2, flexShrink: 0 }} />
              <label htmlFor="consentSms" style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--charcoal)', lineHeight: 1.6, cursor: 'pointer' }}>
                I consent to receive SMS follow-up from Liftêd™. Message and data rates may apply.
              </label>
            </div>

            {status === 'error' && (
              <div style={{ background: '#FEE2E2', border: '1px solid #EF4444', padding: '12px 16px', marginBottom: 16, fontFamily: 'var(--font-body)', fontSize: 13, color: '#B91C1C', borderRadius: 'var(--radius)' }}>
                {errorMsg}
              </div>
            )}
            <button type="submit" disabled={status === 'submitting'} style={{ width: '100%', padding: '16px', background: status === 'submitting' ? 'var(--muted-olive)' : 'var(--burnt-orange)', color: 'var(--off-white)', border: 'none', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: status === 'submitting' ? 'wait' : 'pointer', transition: 'background 0.15s' }}>
              {status === 'submitting' ? 'Submitting...' : 'Submit Wholesale Application'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
