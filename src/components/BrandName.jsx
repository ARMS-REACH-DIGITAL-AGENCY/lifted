/**
 * BrandName — Liftêd™ typed brand-name component
 * Renders: Lift + gold ê + d + small superscript ™
 *
 * Usage:
 *   <BrandName theme="dark" />   — white letters, gold ê  (for dark backgrounds)
 *   <BrandName theme="light" />  — charcoal letters, gold ê (for light backgrounds)
 *
 * Rules (per brand spec):
 *   - Never all-caps LIFTÊD
 *   - Never capital Ê
 *   - Only the ê is gold — not the whole word
 *   - ™ is small, superscripted, visually secondary
 *   - Font inherits from parent heading
 */
import React from 'react'

export function BrandName({ theme = 'dark', style = {} }) {
  const letterColor = theme === 'light'
    ? 'var(--charcoal, #292A28)'
    : 'inherit'  // inherits white/cream from parent heading

  const goldColor = 'var(--sand, #D9A15B)'

  return (
    <span
      aria-label="Liftêd™"
      style={{ fontFamily: 'inherit', fontWeight: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit', ...style }}
    >
      <span style={{ color: letterColor }}>Lift</span>
      <span style={{ color: goldColor, textTransform: 'none' }}>ê</span>
      <span style={{ color: letterColor }}>d</span>
      <sup
        aria-hidden="true"
        style={{
          fontSize: '0.32em',
          fontWeight: 400,
          verticalAlign: 'super',
          lineHeight: 0,
          letterSpacing: 0,
          opacity: 0.65,
          textTransform: 'none',
          color: letterColor,
        }}
      >™</sup>
    </span>
  )
}

export default BrandName
