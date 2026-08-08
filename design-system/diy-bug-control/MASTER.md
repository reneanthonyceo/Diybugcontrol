# DIY Bug Control — Design System (MASTER)

> Global source of truth. Page-specific overrides live in `./pages/<page>.md` and
> take precedence over anything here. If no override exists, these rules apply.

Generated with the `ui-ux-pro-max` skill (v2.13.0), then hand-corrected — see
[Deviations from generator output](#deviations-from-generator-output). Every
color pair below was verified with a WCAG contrast calculation, not eyeballed.

---

## 1. Product framing

| | |
|---|---|
| **Product type** | E-commerce (consumer retail) |
| **Audience** | Homeowners and renters solving a pest problem themselves |
| **Mindset** | Problem-first and often urgent — "I have roaches, what do I buy and will it work?" |
| **Job to be done** | Diagnose the pest → find the right product → trust it works → buy it |
| **Tone** | Practical, competent, reassuring. Not playful, not luxury, not clinical. |

The buyer is mid-problem, not browsing for pleasure. Every design decision below
serves **fast diagnosis and earned trust** over visual novelty.

---

## 2. Style

**Primary: Conversion-Optimized** — WCAG AA, Excellent performance, Tailwind 10/10.

Keywords: single CTA focus, high contrast, trust signals, social proof, clear value.

**Secondary layer: Social Proof-Focused** — reviews and ratings carry
disproportionate weight here, because a DIY buyer's real question is "did this
work for someone with my exact problem?"

Apply the secondary layer on product detail and category pages; keep the primary
layer's discipline everywhere (one dominant CTA per view).

---

## 3. Color tokens

**Revised for the catalog direction.** The original green/orange palette was
built for an editorial, conversion-focused layout. The store is now modelled on
the big-box DIY retail convention — dense grids, sidebar categories, a utility
bar — and that register calls for the blue/red retail scheme those stores share.
Blue carries structure and links; red marks actions and wayfinding. The previous
palette is recorded in §11 for reference.

Colour is not the brand here. The name, glyph, and voice are. A blue/red retail
palette is generic to this category — deliberately so, since adopting a specific
competitor's brand marks is a different thing entirely and is not done.

### Light mode

| Token | Hex | Use |
|---|---|---|
| `--color-primary` | `#0F4C91` | Links, nav, primary buttons, brand chrome |
| `--color-primary-hover` | `#0B3B72` | Hover/active on primary |
| `--color-accent` | `#C8102E` | Add-to-cart, sidebar headings, active view toggle |
| `--color-accent-hover` | `#A00D25` | Hover/active on accent |
| `--color-background` | `#FFFFFF` | Page canvas |
| `--color-surface-alt` | `#F4F5F7` | Breadcrumb band, hero band, select fields |
| `--color-foreground` | `#333333` | Body text |
| `--color-heading` | `#222222` | Headings |
| `--color-muted-foreground` | `#5A6470` | Secondary text, counts |
| `--color-hairline` | `#DDE1E6` | Structural rules, card borders |
| `--color-border-interactive` | `#818C99` | Input and control borders |
| `--color-star` | `#D97706` | Rating stars |

### Dark mode

| Token | Hex | Use |
|---|---|---|
| `--color-primary` | `#7FB3F0` | Links, nav |
| `--color-on-primary` | `#08213F` | Text on primary |
| `--color-accent` | `#FF7A85` | Actions |
| `--color-on-accent` | `#3D0009` | Text on accent |
| `--color-background` | `#12181F` | Page canvas |
| `--color-card` | `#1A222C` | Cards, panels |
| `--color-foreground` | `#E8EDF3` | Body text |
| `--color-muted-foreground` | `#A3B0BE` | Secondary text |
| `--color-border-interactive` | `#63788E` | Input and control borders |

### Verified contrast

| Pair | Ratio | Grade |
|---|---|---|
| Primary on white / white on primary | 8.53:1 | AAA |
| Accent on white / white on accent | 5.88:1 | AA |
| Body text `#333` on white | 12.63:1 | AAA |
| Muted `#5A6470` on white | 6.01:1 | AA |
| Muted `#5A6470` on band `#F4F5F7` | 5.66:1 | AA |
| Interactive border on white | 3.42:1 | AA (UI) |
| Body text on dark ground | 15.17:1 | AAA |
| Primary on dark ground | 8.17:1 | AAA |
| Accent on dark ground | 7.12:1 | AAA |
| Dark text on accent button | 6.97:1 | AA |
| Interactive border on dark card | 3.52:1 | AA (UI) |

`#6B7280` was rejected as the muted tone: it measures 4.43:1 on the `#F4F5F7`
band and fails AA there, even though it passes on white. `#9AA4B0` and `#55697E`
were rejected as interactive borders at 2.53:1 and 2.83:1 — both below the 3:1
UI-component threshold.

## 4. Typography

Pairing: **Rubik** (headings) / **Nunito Sans** (body) — matched to e-commerce,
retail, and conversion. Rubik's slightly rounded terminals read as approachable
and sturdy rather than corporate; Nunito Sans stays legible at long-form
instruction lengths, which matters because application directions are safety
content.

```css
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;500;600;700&family=Rubik:wght@300;400;500;600;700&display=swap');
```

| Token | Size | Line height | Weight | Font |
|---|---|---|---|---|
| `--text-display` | clamp(2.25rem, 5vw, 3.5rem) | 1.1 | 700 | Rubik |
| `--text-h1` | clamp(1.875rem, 4vw, 2.5rem) | 1.2 | 700 | Rubik |
| `--text-h2` | 1.5rem | 1.3 | 600 | Rubik |
| `--text-h3` | 1.25rem | 1.4 | 600 | Rubik |
| `--text-body` | 1rem (16px floor) | 1.5 | 400 | Nunito Sans |
| `--text-small` | 0.875rem | 1.5 | 400 | Nunito Sans |
| `--text-price` | 1.5rem | 1.2 | 700 | Rubik |

Never set body text below 16px. Application instructions and safety warnings use
`--text-body` minimum, regardless of layout pressure.

---

## 5. Spacing, radius, elevation

**Catalog density.** Container widened to 1400px, section rhythm halved, grid
gaps tightened, radii reduced to 3/5/8px, and the product grid minimum dropped
from 240px to 190px so more of the catalog is visible per screen. An editorial
64px section gap wastes a screen that exists to show products.

```css
--space-1: 4px;   --space-2: 8px;   --space-3: 12px;  --space-4: 16px;
--space-5: 20px;  --space-6: 24px;  --space-8: 32px;
--space-12: 48px; --space-16: 64px;

--radius-sm: 3px;  --radius-md: 5px;  --radius-lg: 8px;  --radius-full: 9999px;

--container: 1400px;   /* was 1180px */
--sidebar: 232px;      /* category rail on collection pages */
```

Section rhythm: `--space-8` between sections, `--space-6` within. Use
`.section-loose` for the few editorial sections that still want air.

---

## 6. Motion

Subtle tier. Motion confirms actions; it never performs.

| Interaction | Duration | Easing |
|---|---|---|
| Hover / color shift | 150ms | ease-out |
| Button press | 100ms | ease-out |
| Card hover lift | 200ms | ease-out |
| Scroll reveal | 300–400ms | power1.out |
| Modal / drawer | 250ms in, 200ms out | ease-out |

Exit is always faster than enter. Animate `transform` and `opacity` only — never
`width`, `height`, or `top`.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 7. Page patterns

### Home
1. Hero — pest-problem entry point, not a generic brand statement
2. **Pest finder** (diagnose by pest type) — the primary navigation affordance
3. Best sellers / product grid
4. Trust band — reviews aggregate, guarantee, safety credentials
5. How-it-works (3 steps)
6. CTA

### Category / pest landing
1. Hero with pest identification aid (photo + signs)
2. Recommended product set, ranked
3. Comparison table
4. Reviews filtered to this pest
5. Application guidance

### Product detail
Pattern: *Product Review/Ratings Focused*.
1. Product + aggregate rating above fold
2. Buy box — price, quantity, add-to-cart (accent), stock state
3. What it kills / where to use / safety
4. Rating breakdown, then individual reviews (verified badge in primary green)
5. Related products

Star ratings render gold `#D97706`; verified-purchase badges use primary green.

### Checkout
Single dominant CTA per step, visible progress indicator, 3–5 fields per step,
guest checkout available, order summary persistent.

---

## 8. Component rules

**Buttons** — min 44×44px touch target, 8px+ spacing between adjacent targets.
Primary = `--color-primary`. Add-to-cart = `--color-accent`. One accent button
per viewport; competing urgency reads as noise.

**Product card** — image (reserved aspect ratio, no CLS), name, star rating +
count, price, stock state. Entire card clickable, `cursor: pointer`, hover lift.

**Forms** — visible labels always, never placeholder-as-label. Validate on blur,
not submit-only. Errors sit adjacent to their field and carry `role="alert"` so
they're announced. Submit shows loading → success/error; never a dead click.

**Inputs** — 48px height, `--color-border-interactive`, 3px focus ring in
`--color-ring`. Never remove focus outlines.

**Icons** — SVG only, Heroicons or Lucide. **No emoji as icons.** Icon-only
buttons require `aria-label`.

**Images** — WebP/AVIF, lazy-load below fold, explicit dimensions to hold CLS
under 0.1. Product photography on white; pest reference photos may be
photographic but should never be gratuitously graphic.

---

## 9. Accessibility contract

Non-negotiable, in priority order:

1. Text contrast ≥4.5:1 (normal), ≥3:1 (large ≥24px or ≥19px bold)
2. UI component and interactive-border contrast ≥3:1
3. Touch targets ≥44×44px with ≥8px separation
4. Every interactive element keyboard-reachable with a visible focus state
5. All images carry meaningful `alt`; decorative images `alt=""`
6. Errors announced via `role="alert"` / `aria-live`, never color-only
7. `prefers-reduced-motion` respected
8. No horizontal scroll and no zoom-disabling at any breakpoint

Breakpoints to verify: **375, 768, 1024, 1440**.

---

## 10. Anti-patterns

- Emoji standing in for icons
- Placeholder text as the only label
- Gray-on-gray secondary text below 4.5:1
- Raw hex values in components — use the tokens
- More than one accent-colored CTA competing in a viewport
- Fake urgency (countdowns unattached to a real offer, invented stock scarcity)
- Decorative-only animation
- Fixed-px container widths
- Burying safety and application information below marketing copy

---

## 11. Deviations from generator output

The `--design-system` generator was overridden in three places. Recording them so
they don't get silently reverted:

**Superseded palette.** §3 originally specified a green/orange scheme
(`#047857` / `#C2410C` on a `#ECFDF5` ground) chosen for an editorial layout.
It is retained here only as history — the tokens in `assets/base.css` are the
live values.

| Generator said | Used instead | Why |
|---|---|---|
| Style: *Vibrant & Block-based* | *Conversion-Optimized* + *Social Proof-Focused* | The generator's own metadata lists it as best for "gaming, social media, youth-focused." Wrong register for a homeowner mid-infestation. A second run returned *Exaggerated Minimalism* (best for "fashion, luxury, editorial") — also wrong, so the pick was made from a direct `--domain style` query. |
| Palette: dark navy `#0F172A` | Light green e-commerce palette | Both generator runs returned a dark-tech palette regardless of keywords. A dark default is wrong for a daytime retail catalog with heavy instructional text. |
| Accent `#EA580C`, primary `#059669` | `#C2410C`, `#047857` | Database targets 3:1; measured 3.56:1 and 3.77:1 fail AA for normal-size button text. |

Typography and the motion tier came through the generator unchanged and are used as returned.

---

## 12. Open decision: stack

No stack is detectable — the repository has no `package.json`, `pubspec.yaml`, or
equivalent. Tokens above are stack-agnostic. Once a stack is chosen, pull
implementation guidance with:

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<topic>" --stack <stack>
```

For an e-commerce build, `nextjs` or `astro` are the natural candidates — Astro if
the catalog is largely static and SEO-driven (likely here, since pest-specific
landing pages are the acquisition channel), Next.js if cart and account state
need to be richer.
