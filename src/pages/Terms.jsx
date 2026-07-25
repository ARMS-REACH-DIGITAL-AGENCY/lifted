import React from 'react'
import { TM } from '../components/TM.jsx'

export default function Terms() {
  return (
    <div style={{ paddingTop: 68 }}>
      <section style={{ background: 'var(--navy)', padding: '64px 0 48px' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, color: 'white' }}>Terms of Use</h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', marginTop: 12 }}>Last updated: {new Date().getFullYear()}</p>
        </div>
      </section>
      <section style={{ background: 'var(--cream)', padding: '64px 0' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          {[
            { title: 'Acceptance of Terms', body: 'By accessing WearLiftedToday.com, you agree to these Terms of Use. If you do not agree, please do not use this website.' },
            { title: 'Pre-Revenue Status', body: 'Liftêd™ is a pre-revenue brand currently in product development. Product images, designs, and descriptions shown on this website may be concept mockups. Final products will be confirmed after sample validation.' },
            { title: 'Investment Disclaimer', body: 'Nothing on this website constitutes an offer to sell or a solicitation of an offer to buy any securities. Any investment-related information is provided for informational purposes only. Consult your financial advisor before making any investment decisions.' },
            { title: 'Intellectual Property', body: 'Liftêd™, the Liftêd™ logo, and all associated brand elements are trademarks of ARMS Reach Digital Agency. All content on this website is protected by copyright. You may not reproduce, distribute, or create derivative works without written permission.' },
            { title: 'No Warranties', body: 'This website is provided "as is" without warranties of any kind. We do not warrant that the website will be error-free or uninterrupted.' },
            { title: 'Limitation of Liability', body: 'ARMS Reach Digital Agency and Liftêd™ shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website.' },
            { title: 'Contact', body: 'For questions about these terms, contact ARMS Reach Digital Agency, PO Box 11181, Chandler, AZ 85248.' },
          ].map(s => (
            <div key={s.title} style={{ marginBottom: 36 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>{s.title}</h2>
              <p style={{ fontSize: 16, color: 'var(--mid-gray)', lineHeight: 1.75 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
