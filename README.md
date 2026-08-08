# DIY Bug Control

## UI/UX Pro Max skill

This repository vendors the [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
skill bundle (v2.13.0, MIT) under `.claude/skills/`. Claude Code picks the skills
up automatically for any session opened in this repo.

### Installed skills

| Skill | What it covers |
| --- | --- |
| `ui-ux-pro-max` | Core design intelligence: 84 UI styles, 192 color palettes, 74 font pairings, 98 UX guidelines, 25 chart types, 22 tech stacks |
| `design` | Umbrella design skill — brand identity, logos, banners, icons, social images |
| `design-system` | Three-layer design tokens (primitive → semantic → component) and component specs |
| `brand` | Brand voice, visual identity, messaging frameworks, style guides |
| `ui-styling` | shadcn/ui + Tailwind implementation patterns, canvas visuals (bundles OFL fonts) |
| `banner-design` | Social, ad, hero, and print banner art direction |
| `slides` | HTML presentations with Chart.js and design tokens |

### Using it directly

The core skill ships a searchable CSV database driven by a Python 3 script
(standard library only, no dependencies):

```bash
# Search a domain: style, color, chart, landing, product, ux, typography, icons, gsap, react, web, google-fonts
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "pest control service website" -d style

# Stack-specific guidance
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "hero section" -s nextjs

# Generate a complete design system
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "pest control booking site" \
  --design-system --project-name diybugcontrol
```

Run `search.py --help` for the full flag list.

### Updating

Re-copy `.claude/skills/` from a fresh checkout of the upstream repository, or
run the official installer:

```bash
npx ui-ux-pro-max-cli init --ai claude
```

### Licensing

Skill content is MIT-licensed by NextLevelBuilder. Fonts under
`.claude/skills/ui-styling/canvas-fonts/` are SIL Open Font License; each
family's `*-OFL.txt` sits alongside it.
