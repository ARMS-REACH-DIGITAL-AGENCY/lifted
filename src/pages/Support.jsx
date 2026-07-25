/**
 * /support — Help Bring Liftêd™ to Life
 * Three clearly separated pathways — no combined form.
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { TM } from '../components/TM.jsx'

export default function Support() {
  return (
    <div style={{ background: 'var(--warm-cream)', minHeight: '100vh', paddingTop: 80 }}>
      <div style={{ background: 'var(--black)', padding: '64px 0 48px', borderBottom: '3px solid var(--burnt-orange)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 20px' }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--burnt-orange)', marginBottom: 14 }}>Get Involved</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 5vw, 52px)', color: 'var(--off-white)', lineHeight: 1.0, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: 20 }}>
            Help Bring<br />Liftêd™ to Life
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'rgba(247,244,236,0.7)', lineHeight: 1.7, maxWidth: 560 }}>
            There are three distinct ways to support the Liftêd™ launch. Choose the path that fits you best.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '64px 20px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>

          {/* Path 1: Founding Community */}
          <div style={{ background: 'var(--off-white)', border: '1.5px solid var(--charcoal)', boxShadow: '4px 4px 0 var(--charcoal)', padding: '32px 24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--burnt-orange)', opacity: 0.6, lineHeight: 1, marginBottom: 16 }}>01</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--burnt-orange)', marginBottom: 10 }}>Community</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--charcoal)', marginBottom: 14, textTransform: 'uppercase', lineHeight: 1.1 }}>Join the Founding Community</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--muted-olive)', lineHeight: 1.7, flex: 1, marginBottom: 24 }}>
              For updates, design voting, sample reveals, and early access. Be part of the community that brings Liftêd™ to life — before the official launch.
            </p>
            <div style={{ borderTop: '1px solid rgba(41,42,40,0.12)', paddingTop: 16, marginBottom: 20 }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 8 }}>What you get:</div>
              {['Behind-the-scenes updates', 'Design voting access', 'Sample reveal previews', 'Early ordering notification', 'Founding Community recognition'].map(item => (
                <div key={item} style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--muted-olive)', padding: '4px 0', display: 'flex', gap: 8 }}>
                  <span style={{ color: 'var(--burnt-orange)', fontWeight: 700 }}>→</span> {item}
                </div>
              ))}
            </div>
            <Link to="/founding-community" style={{ display: 'block', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'var(--burnt-orange)', color: 'var(--off-white)', textDecoration: 'none', padding: '13px', borderRadius: 'var(--radius)' }}>
              Join the Founding Community
            </Link>
          </div>

          {/* Path 2: Support the Founding Collection */}
          <div style={{ background: 'var(--off-white)', border: '1.5px solid var(--charcoal)', boxShadow: '4px 4px 0 var(--charcoal)', padding: '32px 24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--burnt-orange)', opacity: 0.6, lineHeight: 1, marginBottom: 16 }}>02</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--burnt-orange)', marginBottom: 10 }}>Support</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--charcoal)', marginBottom: 14, textTransform: 'uppercase', lineHeight: 1.1 }}>Support the Founding Collection</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--muted-olive)', lineHeight: 1.7, flex: 1, marginBottom: 24 }}>
              For future preorders, reward-based campaigns, merchandise, or non-investment support. Be among the first to own a Liftêd™ garment when ordering opens.
            </p>
            <div style={{ borderTop: '1px solid rgba(41,42,40,0.12)', paddingTop: 16, marginBottom: 20 }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 8 }}>What this means:</div>
              {['First access to preorders', 'Reward-based campaign participation', 'Merchandise support options', 'No equity or investment required', 'Direct product support'].map(item => (
                <div key={item} style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--muted-olive)', padding: '4px 0', display: 'flex', gap: 8 }}>
                  <span style={{ color: 'var(--burnt-orange)', fontWeight: 700 }}>→</span> {item}
                </div>
              ))}
            </div>
            <Link to="/founding-community?type=supporter" style={{ display: 'block', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'var(--charcoal)', color: 'var(--off-white)', textDecoration: 'none', padding: '13px', borderRadius: 'var(--radius)' }}>
              Support the Founding Collection
            </Link>
          </div>

          {/* Path 3: Investor Information */}
          <div style={{ background: 'var(--off-white)', border: '1.5px solid var(--charcoal)', boxShadow: '4px 4px 0 var(--charcoal)', padding: '32px 24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--burnt-orange)', opacity: 0.6, lineHeight: 1, marginBottom: 16 }}>03</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--burnt-orange)', marginBottom: 10 }}>Private Access</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--charcoal)', marginBottom: 14, textTransform: 'uppercase', lineHeight: 1.1 }}>Request Investor Information</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--muted-olive)', lineHeight: 1.7, flex: 1, marginBottom: 24 }}>
              For qualified individuals seeking private access to the Liftêd™ investor portal. Explore the business opportunity, financial information, and growth strategy in a secure environment.
            </p>
            <div style={{ borderTop: '1px solid rgba(41,42,40,0.12)', paddingTop: 16, marginBottom: 20 }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 8 }}>Access includes:</div>
              {['Business model overview', 'Market opportunity', 'Development status', 'Financial information', 'Document library'].map(item => (
                <div key={item} style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--muted-olive)', padding: '4px 0', display: 'flex', gap: 8 }}>
                  <span style={{ color: 'var(--burnt-orange)', fontWeight: 700 }}>→</span> {item}
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(41,42,40,0.06)', padding: '10px 12px', marginBottom: 16, fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--muted-olive)', lineHeight: 1.6, borderLeft: '3px solid var(--burnt-orange)' }}>
              Access requires approval. Submitting a request does not guarantee access.
            </div>
            <Link to="/investor-access" style={{ display: 'block', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'transparent', color: 'var(--charcoal)', textDecoration: 'none', padding: '12px', borderRadius: 'var(--radius)', border: '2px solid var(--charcoal)' }}>
              Request Private Investor Access
            </Link>
          </div>
        </div>

        <div style={{ marginTop: 48, padding: '20px 24px', background: 'rgba(41,42,40,0.06)', borderLeft: '3px solid var(--burnt-orange)', fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--muted-olive)', lineHeight: 1.7 }}>
          <strong style={{ color: 'var(--charcoal)' }}>Important:</strong> These are three separate and distinct pathways. Do not combine donations, preorders, sponsorships, and investments into one form or CTA. Liftêd™ is a for-profit company. Payments to Liftêd™ are not tax-deductible donations. Liftêd™ does not publicly promise equity, ownership, returns, profit participation, or investment terms.
        </div>
      </div>
    </div>
  )
}

