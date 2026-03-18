# Design System — Armatrix Team Page

## Brand Inspiration
Armatrix.in is a robotics/deep-tech company. Their site uses:
- Dark backgrounds with white/light text
- Minimal, engineering-focused aesthetic
- Numbered sequences ("/001 INSPECTION", "/002 PAINTING")
- Clean typography, generous whitespace
- Professional, not playful

We match this vibe while adding our own touch for the team page.

## Color Palette
```
Background:       #0a0a0f  (near-black with slight blue tint)
Surface (cards):  #12121a  (elevated dark surface)
Surface hover:    #1a1a2e  (subtle lift on interaction)
Border:           #2a2a3e  (very subtle borders)
Text primary:     #e4e4e7  (off-white, easy on eyes)
Text secondary:   #71717a  (muted gray for supporting text)
Accent:           #3b82f6  (blue — for links, highlights)
Accent subtle:    #3b82f620 (blue at 12% opacity — for glows)
```

## Typography
- **Font**: Inter (via Google Fonts or next/font)
- **Headings**: font-semibold or font-bold, tracking-tight
- **Body**: font-normal, leading-relaxed
- **Numbering**: font-mono for "/001" style labels

### Scale
- Page title: text-4xl md:text-5xl
- Section subtitle: text-lg md:text-xl, text-muted
- Card name: text-xl font-semibold
- Card role: text-sm uppercase tracking-wider text-accent
- Card bio: text-sm text-muted leading-relaxed
- Number label: text-xs font-mono text-muted

## Card Design
```
┌──────────────────────────┐
│  /001                    │  ← mono, muted, top-left
│                          │
│  ┌────────────────────┐  │
│  │                    │  │  ← photo area (aspect-square,
│  │    PHOTO/AVATAR    │  │     rounded, object-cover)
│  │                    │  │
│  └────────────────────┘  │
│                          │
│  Rahul Sharma            │  ← name, white, semibold
│  CO-FOUNDER & CEO        │  ← role, accent blue, uppercase, tracking-wider
│                          │
│  Building the future of  │  ← bio, muted, 2 lines max
│  industrial robotics...  │
│                          │
│  [in]                    │  ← LinkedIn icon, subtle
└──────────────────────────┘

Border: 1px solid #2a2a3e
Border on hover: 1px solid #3b82f640
Background: #12121a
Hover: #1a1a2e + subtle blue glow
Border radius: rounded-xl (12px)
Padding: p-6
```

## Layout
```
┌─────────────────────────────────────────────────┐
│  NAVBAR: [ARMATRIX logo]          [Team] [Blog] │
├─────────────────────────────────────────────────┤
│                                                 │
│           MEET THE TEAM                         │  ← large heading
│      The people behind the machine              │  ← subtitle, muted
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │ Card 1  │  │ Card 2  │  │ Card 3  │        │  ← 3-col grid
│  └─────────┘  └─────────┘  └─────────┘        │
│                                                 │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │ Card 4  │  │ Card 5  │  │ Card 6  │        │
│  └─────────┘  └─────────┘  └─────────┘        │
│                                                 │
├─────────────────────────────────────────────────┤
│  FOOTER: © 2026 Armatrix · Built with ❤        │
└─────────────────────────────────────────────────┘
```

## Animations
| Element | Trigger | Animation |
|---------|---------|-----------|
| Page title | Page load | Fade in + slide up (0.6s) |
| Subtitle | Page load | Fade in + slide up (0.8s) |
| Team cards | Viewport enter | Stagger fade in from bottom (0.1s between each) |
| Card hover | Mouse enter | scale(1.02) + border-color transition + subtle blue shadow |
| LinkedIn icon | Mouse enter on card | Fade in / increase opacity |

## Spacing
- Page padding: px-6 md:px-12 lg:px-24
- Section spacing: py-16 md:py-24
- Card gap: gap-6 md:gap-8
- Max container: max-w-7xl mx-auto

## Photo Strategy
Since we're using fake team members, use one of:
- **Initials avatar**: Colored circle with initials (simple, no external deps)
- **UI Avatars API**: `https://ui-avatars.com/api/?name=Rahul+Sharma&background=1a1a2e&color=e4e4e7&size=200`
- **Abstract geometric**: CSS-generated patterns per person

Recommendation: **UI Avatars API** — looks clean, zero effort, consistent style.
