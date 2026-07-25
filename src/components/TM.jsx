/**
 * TM — Liftêd™ Trademark Superscript Component
 * Renders ™ as a small, light, elegant superscript.
 * Use in all display headlines and prominent brand mentions.
 * In body copy, the plain ™ character is acceptable.
 */
import React from 'react'

export function TM({ color }) {
  return (
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
        fontFamily: 'inherit',
        ...(color ? { color } : {}),
      }}
    >™</sup>
  )
}

export default TM
