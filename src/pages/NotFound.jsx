import React from 'react'
import { Link } from 'react-router-dom'
import { TM } from '../components/TM.jsx'

export default function NotFound() {
  return (
    <div style={{ paddingTop: 68, minHeight: '80vh', display: 'flex', alignItems: 'center', background: 'var(--cream)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 120, fontWeight: 900, color: 'var(--gold)', opacity: 0.3, lineHeight: 1 }}>↑</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: 'var(--navy)', marginBottom: 16 }}>Page Not Found</h1>
        <p style={{ fontSize: 17, color: 'var(--mid-gray)', marginBottom: 32 }}>The page you're looking for doesn't exist — but Liftêd™ does.</p>
        <Link to="/" className="btn btn-gold btn-lg">Return Home</Link>
      </div>
    </div>
  )
}

