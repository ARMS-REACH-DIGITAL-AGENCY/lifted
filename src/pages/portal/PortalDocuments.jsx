import React, { useState, useEffect } from 'react'
import { auth, isConfigured } from '../../lib/firebase.js'

const PLACEHOLDER_DOCS = [
  { id: 'p1', name: 'Investor Pitch Deck', description: 'Full investor presentation', version: 'v1.0', status: 'pending' },
  { id: 'p2', name: 'Executive Summary', description: 'One-page brand and business overview', version: 'v1.0', status: 'pending' },
  { id: 'p3', name: 'Business Plan', description: 'Comprehensive business plan', version: 'v1.0', status: 'pending' },
  { id: 'p4', name: 'Market Research', description: 'Industry and audience analysis', version: 'v1.0', status: 'pending' },
  { id: 'p5', name: 'Financial Model', description: 'Revenue projections and assumptions', version: 'v1.0', status: 'pending' },
  { id: 'p6', name: 'Use of Funds Summary', description: 'Detailed funding allocation', version: 'v1.0', status: 'pending' },
  { id: 'p7', name: 'Founder Biography', description: 'Founder background and credentials', version: 'v1.0', status: 'pending' },
  { id: 'p8', name: 'Media Kit', description: 'Brand assets and press materials', version: 'v1.0', status: 'pending' },
  { id: 'p9', name: 'Product & Sample Updates', description: 'Latest sample production updates', version: 'v1.0', status: 'pending' },
]

export default function PortalDocuments() {
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDocs() {
      try {
        const user = isConfigured && auth ? auth.currentUser : null
        if (!user) return
        const idToken = await user.getIdToken()
        const res = await fetch('/api/documents/investor', {
          headers: { Authorization: `Bearer ${idToken}` },
          credentials: 'include',
        })
        if (res.ok) {
          const data = await res.json()
          setDocs(data.documents || [])
        } else {
          setDocs([])
        }
      } catch {
        setDocs([])
      } finally {
        setLoading(false)
      }
    }
    fetchDocs()
  }, [])

  const handleView = async (docId) => {
    try {
      const user = auth.currentUser
      const idToken = await user.getIdToken()
      const res = await fetch(`/api/documents/investor/${docId}/url`, {
        headers: { Authorization: `Bearer ${idToken}` },
        credentials: 'include',
      })
      if (res.ok) {
        const { url } = await res.json()
        window.open(url, '_blank', 'noopener,noreferrer')
      }
    } catch (err) {
      console.error('Document view error:', err)
    }
  }

  const displayDocs = docs.length > 0 ? docs : PLACEHOLDER_DOCS

  return (
    <div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--burnt-orange)', marginBottom: 12 }}>Document Library</div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 36px)', color: 'var(--off-white)', textTransform: 'uppercase', lineHeight: 1.05, marginBottom: 24 }}>Investor Documents</h1>
      {docs.length === 0 && !loading && (
        <div style={{ background: 'rgba(199,106,50,0.08)', border: '1px solid rgba(199,106,50,0.2)', padding: '14px 18px', marginBottom: 28, borderLeft: '3px solid var(--burnt-orange)' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(247,244,236,0.55)', margin: 0 }}>Documents are being prepared and will be available here shortly. You will be notified when new documents are added.</p>
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {displayDocs.map(doc => (
          <div key={doc.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'rgba(247,244,236,0.04)', border: '1px solid rgba(247,244,236,0.08)', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: 'var(--off-white)', marginBottom: 4 }}>{doc.name}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(247,244,236,0.45)' }}>{doc.description} {doc.version && `· ${doc.version}`}</div>
            </div>
            {doc.status === 'pending' ? (
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(247,244,236,0.3)', fontStyle: 'italic', flexShrink: 0 }}>Coming soon</span>
            ) : (
              <button onClick={() => handleView(doc.id)} style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'var(--burnt-orange)', color: 'var(--off-white)', border: 'none', padding: '8px 16px', cursor: 'pointer', borderRadius: 'var(--radius)', flexShrink: 0 }}>View</button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
