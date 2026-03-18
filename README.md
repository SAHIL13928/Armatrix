# Armatrix Team Page

Full-stack team page — FastAPI backend + Next.js 16 frontend.

## Local Development

**Prerequisites:** Python 3.12+, Node.js 18+

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API runs at `http://localhost:8000`. Check `http://localhost:8000/docs` for Swagger UI.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:3000/team`.

The frontend reads `API_URL` from `frontend/.env.local` (defaults to `http://localhost:8000`).

## Deployment

### Backend → Render

1. Push repo to GitHub.
2. Go to [Render](https://render.com), create a new **Web Service**.
3. Connect the repo, set **Root Directory** to `backend`.
4. Render auto-detects `render.yaml` — build and start commands are preconfigured.
5. Note the deployed URL (e.g. `https://armatrix-team-api.onrender.com`).

### Frontend → Vercel

1. Go to [Vercel](https://vercel.com), import the same repo.
2. Set **Root Directory** to `frontend`.
3. Add environment variable:
   - `API_URL` = your Render backend URL (e.g. `https://armatrix-team-api.onrender.com`)
4. Deploy. Vercel auto-detects Next.js.

### Environment Variables

| Variable | Where | Purpose |
|----------|-------|---------|
| `API_URL` | Vercel (server-side) | Backend URL for SSR data fetching |
| `NEXT_PUBLIC_API_URL` | Vercel (client-side) | Backend URL for browser CRUD requests |
| `PORT` | Render | Set automatically by Render |
