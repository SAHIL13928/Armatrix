# Architecture Overview

## System Diagram
```
┌─────────────────┐         ┌─────────────────┐
│   Next.js 16    │  HTTP   │   FastAPI        │
│   (Vercel)      │────────▶│   (Render)       │
│                 │  JSON   │                  │
│  Server Comps   │◀────────│  In-Memory Store │
│  Client Comps   │         │  CORS Enabled    │
└─────────────────┘         └─────────────────┘
     Port 3000                   Port 8000
```

## Data Flow

### Read (Display Team)
1. User visits `/team`
2. Next.js Server Component fetches `GET {API_URL}/team`
3. Backend returns JSON array of team members
4. Server Component renders HTML with data → sent to browser
5. Client Components hydrate for animations only

### Write (Add/Edit/Delete — backend complexity demo)
1. Client Component sends `POST/PUT/DELETE` to `{NEXT_PUBLIC_API_URL}/team`
2. Backend validates with Pydantic, updates in-memory store
3. Returns updated member / success response
4. Frontend revalidates or refetches

## Why This Architecture
- **Server Components for reads**: No client-side loading spinners, data is in the HTML
- **Client Components for writes**: Need interactivity (forms, buttons, optimistic UI)
- **In-memory store**: Zero config, zero dependencies, perfect for a demo
- **Single-file backend**: Easy to review, easy to understand, shows clean code
- **Monorepo**: One repo to clone, one README, simple for reviewers
