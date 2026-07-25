/**
 * LiftedLogo — Reusable brand identity component
 *
 * NEVER recreate the Liftêd™ logo with text, CSS, or AI.
 * Always use the approved asset files from /public/brand/lifted/
 *
 * Usage:
 *   <LiftedLogo variant="light" />  — cream/gold metallic wordmark — for dark backgrounds
 *   <LiftedLogo variant="dark" />   — charcoal wordmark — for light/white backgrounds
 */
import React from 'react'

const WORDMARK_SRCS = {
  light:   '/brand/lifted/lifted-wordmark-light.png',   // cream/gold metallic — dark bg
  dark:    '/brand/lifted/lifted-wordmark-dark.png',    // charcoal — light/white bg
  // Legacy aliases
  white:   '/brand/lifted/lifted-wordmark-light.png',
  primary: '/brand/lifted/lifted-wordmark-dark.png',
  navy:    '/brand/lifted/lifted-wordmark-dark.png',
  gold:    '/brand/lifted/lifted-wordmark-light.png',
}

export function LiftedLogo({
  variant = 'light',
  height = 40,
  style = {},
  className = '',
}) {
  const src = WORDMARK_SRCS[variant] || WORDMARK_SRCS.light
  return (
    <img
      src={src}
      alt="Liftêd™"
      height={height}
      style={{
        height,
        width: 'auto',
        objectFit: 'contain',
        display: 'block',
        flexShrink: 0,
        ...style,
      }}
      className={className}
    />
  )
}

export default LiftedLogo
