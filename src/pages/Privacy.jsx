import React from 'react'
import { TM } from '../components/TM.jsx'

export default function Privacy() {
  return (
    <div style={{ paddingTop: 68 }}>
      <section style={{ background: 'var(--navy)', padding: '64px 0 48px' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, color: 'white' }}>Privacy Policy</h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', marginTop: 12 }}>Last updated: {new Date().getFullYear()}</p>
        </div>
      </section>
      <section style={{ background: 'var(--cream)', padding: '64px 0' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          {[
            { title: 'Information We Collect', body: 'We collect information you provide directly to us, including your name, email address, phone number, organization, and any messages you send through our forms. We also collect information about how you interact with our website, including pages visited and QR code scan sources.' },
            { title: 'How We Use Your Information', body: 'We use the information we collect to respond to your inquiries, send updates about Liftêd™, manage our founding community pipeline, and improve our website. We use HighLevel CRM to manage contact records and follow-up communications.' },
            { title: 'SMS and Email Communications', body: 'By submitting a form on this website, you consent to receive email and SMS communications from Liftêd™ and ARMS Reach Digital Agency. You may opt out at any time by replying STOP to any SMS or clicking unsubscribe in any email.' },
            { title: 'Data Sharing', body: 'We do not sell your personal information. We may share your information with service providers who assist us in operating our website and CRM systems, including HighLevel (LeadConnector). These providers are contractually obligated to protect your information.' },
            { title: 'Data Retention', body: 'We retain your information for as long as necessary to fulfill the purposes described in this policy, unless a longer retention period is required by law.' },
            { title: 'Your Rights', body: 'You have the right to access, correct, or delete your personal information. To exercise these rights, contact us at the information below.' },
            { title: 'Contact Us', body: 'For privacy-related questions, contact ARMS Reach Digital Agency, PO Box 11181, Chandler, AZ 85248.' },
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
