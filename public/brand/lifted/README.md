# Liftêd™ Brand Assets

## Critical Rules — Read Before Editing

**NEVER:**
- Recreate the Liftêd™ logo with text, HTML headings, or CSS typography
- Alter the circumflex (ê) character or approximate it
- Move or resize the trademark symbol (™)
- Distort the aspect ratio of any logo file
- Place navigation text inside the logo clear-space area
- Generate a replacement logo with AI
- Use a generic "L" box unless that exact symbol is approved
- Crop, stretch, squeeze, recolor, or redraw supplied files

**ALWAYS:**
- Use white wordmark (`lifted-wordmark-white.png`) on dark navy backgrounds
- Use navy wordmark (`lifted-wordmark-navy.png`) on cream or white backgrounds
- Use gold only where contrast is sufficient
- Prefer SVG for website display when available
- Use transparent PNG only where SVG is unsupported
- Preserve intrinsic aspect ratio with `object-fit: contain`
- Use the `<LiftedLogo>` component — never raw `<img>` tags with ad-hoc sizing

## File Inventory

| File | Use |
|---|---|
| `lifted-wordmark-primary.png` | Original approved asset (brown/slate) |
| `lifted-wordmark-white.png` | White version — nav, footer, hero (dark bg) |
| `lifted-wordmark-navy.png` | Navy version — light backgrounds |
| `lifted-wordmark-gold.png` | Gold version — use sparingly |
| `lifted-icon-primary.png` | L icon only — original colors |
| `lifted-icon-white.png` | L icon only — white version |
| `lifted-favicon.png` | Browser tab favicon |

## Files Still Needed from Owner

- `lifted-wordmark-white.svg` — true vector white wordmark (replaces PNG)
- `lifted-wordmark-navy.svg` — true vector navy wordmark
- `lifted-icon-e-navy.svg` — stylized ê compact mark
- `lifted-icon-e-white.svg` — stylized ê compact mark (white)
- `lifted-social-card.png` — 1200×630 OG/social sharing image
- `lifted-brand-guidelines.pdf` — full brand standards document

## Component Usage

```jsx
import { LiftedLogo, LiftedIcon } from '@/components/LiftedLogo'

// In nav (dark background)
<LiftedLogo variant="white" height={36} />

// In footer (dark background)
<LiftedLogo variant="white" height={28} />

// On light background
<LiftedLogo variant="navy" height={36} />

// Icon only
<LiftedIcon variant="primary" size={40} />
```

