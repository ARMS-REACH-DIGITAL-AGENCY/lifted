/**
 * /investor-login — Secure login page for approved investors and retailers.
 * noindex — must not appear in search results.
 */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { safeSignIn, safeSendPasswordReset } from '../lib/firebase.js'

export default function InvestorLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [resetSent, setResetSent] = useState(false)
  const [showReset, setShowReset] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')
    try {
      const cred = await safeSignIn(email, password)
      const idToken = await cred.user.getIdToken()
      // Exchange for server session cookie
      await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
        credentials: 'include',
      })
      // Check claims to determine where to redirect
      const tokenResult = await cred.user.getIdTokenResult()
      if (tokenResult.claims.retailer) {
        navigate('/retailer-portal')
      } else {
        navigate('/investor-portal')
      }
    } catch (err) {
      const msg = err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password'
        ? 'Invalid email or password.'
        : err.code === 'auth/user-disabled'
        ? 'This account has been disabled. Please contact support.'
        : err.message
      setErrorMsg(msg)
      setStatus('error')
    }
  }

  const handleReset = async (e) => {
    e.preventDefault()
    try {
      await safeSendPasswordReset(email)
      setResetSent(true)
    } catch (err) {
      setErrorMsg(err.message)
    }
  }

  const inputStyle = {
    width: '100%', padding: '13px 14px', background: 'rgba(247,244,236,0.08)',
    border: '1.5px solid rgba(247,244,236,0.2)', borderRadius: 'var(--radius)',
    fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--off-white)',
    outline: 'none', boxSizing: 'border-box',
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 20px 40px' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--burnt-orange)', marginBottom: 12 }}>Private Access</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--off-white)', lineHeight: 1.0, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: 10 }}>Investor Portal</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(247,244,236,0.5)' }}>Sign in with your approved account</p>
        </div>

        <div style={{ background: 'rgba(247,244,236,0.04)', border: '1.5px solid rgba(247,244,236,0.1)', padding: '32px 28px' }}>
          {!showReset ? (
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,244,236,0.5)', marginBottom: 7 }}>Email</label>
                <input type="email" style={inputStyle} value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,244,236,0.5)', marginBottom: 7 }}>Password</label>
                <input type="password" style={inputStyle} value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
              </div>
              {errorMsg && <div style={{ background: 'rgba(199,106,50,0.15)', border: '1px solid var(--burnt-orange)', padding: '10px 14px', marginBottom: 16, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--sand)' }}>{errorMsg}</div>}
              <button type="submit" disabled={status === 'submitting'} style={{ width: '100%', padding: '14px', background: 'var(--burnt-orange)', color: 'var(--off-white)', border: 'none', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: status === 'submitting' ? 'wait' : 'pointer', marginBottom: 16 }}>
                {status === 'submitting' ? 'Signing In...' : 'Sign In'}
              </button>
              <button type="button" onClick={() => setShowReset(true)} style={{ width: '100%', background: 'none', border: 'none', fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(247,244,236,0.4)', cursor: 'pointer', padding: '8px 0' }}>
                Forgot password or need to set your password?
              </button>
            </form>
          ) : (
            <form onSubmit={handleReset}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(247,244,236,0.65)', lineHeight: 1.6, marginBottom: 20 }}>Enter your email address and we'll send you a link to set or reset your password.</p>
              <div style={{ marginBottom: 20 }}>
                <input type="email" style={inputStyle} value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" required />
              </div>
              {resetSent ? (
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--sand)', textAlign: 'center', padding: '12px 0' }}>Password reset email sent. Check your inbox.</div>
              ) : (
                <button type="submit" style={{ width: '100%', padding: '14px', background: 'var(--burnt-orange)', color: 'var(--off-white)', border: 'none', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', marginBottom: 12 }}>Send Reset Link</button>
              )}
              <button type="button" onClick={() => setShowReset(false)} style={{ width: '100%', background: 'none', border: 'none', fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(247,244,236,0.4)', cursor: 'pointer', padding: '8px 0' }}>← Back to Sign In</button>
            </form>
          )}
        </div>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(247,244,236,0.3)', lineHeight: 1.6 }}>
            Don't have access yet?{' '}
            <Link to="/investor-access" style={{ color: 'var(--burnt-orange)', fontWeight: 700 }}>Request Access →</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
