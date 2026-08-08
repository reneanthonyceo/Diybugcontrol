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

Palette source: `colors.csv` → E-commerce, "Success green + urgency orange".
Green signals *safe and effective*; orange drives *act now* without the alarm of red,
which stays reserved for genuine errors.

### Light mode

| Token | Hex | Use |
|---|---|---|
| `--color-primary` | `#047857` | Brand, primary buttons, links |
| `--color-primary-hover` | `#065F46` | Hover/active on primary |
| `--color-on-primary` | `#FFFFFF` | Text on primary |
| `--color-accent` | `#C2410C` | Add-to-cart, urgency CTA |
| `--color-accent-hover` | `#9A3412` | Hover/active on accent |
| `--color-on-accent` | `#FFFFFF` | Text on accent |
| `--color-background` | `#ECFDF5` | Page canvas |
| `--color-card` | `#FFFFFF` | Product cards, panels |
| `--color-foreground` | `#064E3B` | Body text |
| `--color-muted-foreground` | `#64748B` | Secondary text, metadata |
| `--color-border` | `#A7F3D0` | Decorative dividers **only** |
| `--color-border-interactive` | `#7C9488` | Input/control borders |
| `--color-destructive` | `#DC2626` | Errors, destructive actions |
| `--color-ring` | `#047857` | Focus ring |

### Dark mode

| Token | Hex | Use |
|---|---|---|
| `--color-primary` | `#34D399` | Brand, links, icons |
| `--color-on-primary` | `#052E1F` | Text on primary |
| `--color-accent` | `#FB923C` | Urgency CTA |
| `--color-on-accent` | `#431407` | Text on accent |
| `--color-background` | `#0B1A14` | Page canvas |
| `--color-card` | `#12241C` | Cards, panels |
| `--color-foreground` | `#E8F5EE` | Body text |
| `--color-muted-foreground` | `#9BB3A5` | Secondary text |
| `--color-border-interactive` | `#4A7A64` | Input/control borders |
| `--color-destructive` | `#F87171` | Errors |

### Verified contrast

| Pair | Ratio | Grade |
|---|---|---|
| Body text on background (light) | 9.23:1 | AAA |
| Body text on card (light) | 9.72:1 | AAA |
| White on primary `#047857` | 5.48:1 | AA |
| White on accent `#C2410C` | 5.18:1 | AA |
| Muted text on card (light) | 4.76:1 | AA |
| Body text on background (dark) | 15.98:1 | AAA |
| Primary on background (dark) | 9.32:1 | AAA |
| Accent on background (dark) | 7.92:1 | AAA |
| Interactive borders vs. surface | ≥3.2:1 | AA (UI) |

**Do not substitute `#059669` or `#EA580C`** (the raw database values). They land at
3.77:1 and 3.56:1 — legal for large text and UI shapes, but failing for
normal-size button labels, which is exactly where they'd be used.

---

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

Standard density (marketing + catalog, not dashboard).

```css
--space-1: 4px;   --space-2: 8px;   --space-3: 12px;  --space-4: 16px;
--space-6: 24px;  --space-8: 32px;  --space-12: 48px; --space-16: 64px;

--radius-sm: 4px;  --radius-md: 8px;  --radius-lg: 12px;  --radius-full: 9999px;

--shadow-card:  0 1px 3px rgb(6 78 59 / 0.08), 0 1px 2px rgb(6 78 59 / 0.06);
--shadow-hover: 0 4px 12px rgb(6 78 59 / 0.12);
```

Section rhythm: `--space-16` between major page sections, `--space-8` within.

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
