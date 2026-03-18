# Frontend Specification

## Stack
- Next.js 16.1.x (App Router, Turbopack)
- React 19
- TypeScript
- Tailwind CSS v4 (CSS-based config, no tailwind.config.js)
- motion (formerly framer-motion) — for component animations

## Setup
```bash
npx create-next-app@latest frontend --yes
cd frontend && npm install motion
```

Default `--yes` gives: TypeScript, Tailwind v4, ESLint, App Router, Turbopack, src/ directory, @/* alias.

## Pages

### `/` — Home (minimal)
- Simple landing with nav + redirect to /team
- Or just make /team the main page

### `/team` — The Main Page
- Hero section: "Meet the Team" with subtle animated text
- Team grid: responsive card layout
- Each card: photo/avatar, name, role, bio, LinkedIn icon
- Numbered labels ("/001", "/002") matching Armatrix style

## Component Architecture
```
src/
├── app/
│   ├── layout.tsx          # Root layout (dark theme, nav, fonts)
│   ├── page.tsx            # Home → redirects or links to /team
│   ├── globals.css         # Tailwind v4 @theme + custom styles
│   └── team/
│       └── page.tsx        # Server Component — fetches team data
├── components/
│   ├── Navbar.tsx          # Top nav bar (client — has mobile menu)
│   ├── TeamGrid.tsx        # Client component — animated grid
│   ├── TeamCard.tsx        # Client component — individual card with hover
│   └── Footer.tsx          # Simple footer
└── lib/
    └── api.ts              # API helper functions
```

## Data Fetching Strategy
- **`/team` page.tsx** is a Server Component
- Fetches `GET {API_URL}/team` server-side (no loading spinner)
- Passes data as props to `<TeamGrid>` (Client Component for animations)
- `API_URL` is server-only env var (not exposed to browser)
- For CRUD operations: `NEXT_PUBLIC_API_URL` used in client components

## Environment Variables
```env
# .env.local (local dev)
API_URL=http://localhost:8000
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Tailwind v4 Config (in globals.css)
```css
@import "tailwindcss";

@theme {
  --color-bg: #0a0a0f;
  --color-surface: #12121a;
  --color-surface-hover: #1a1a2e;
  --color-border: #2a2a3e;
  --color-text: #e4e4e7;
  --color-text-muted: #71717a;
  --color-accent: #3b82f6;
  --font-sans: "Inter", system-ui, sans-serif;
}
```

## Animation Plan (motion library)
- **Page load**: Cards stagger fade-in from bottom (0.1s delay between each)
- **Card hover**: Subtle scale(1.02) + border glow
- **Scroll**: Cards animate in when they enter viewport
- All animations are subtle — professional, not playful

## Responsive Breakpoints
- Mobile (<640px): 1 column, full-width cards
- Tablet (640-1024px): 2 columns
- Desktop (>1024px): 3 columns
- Max width container: 1280px, centered

## Deployment — Vercel
- Connect GitHub repo
- Set root directory to `frontend`
- Add env var: `API_URL` = Render backend URL
- Add env var: `NEXT_PUBLIC_API_URL` = Render backend URL
- Auto-deploys on push to main
