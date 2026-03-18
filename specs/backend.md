# Backend Specification

## Stack
- Python 3.12
- FastAPI 0.135.x
- Uvicorn 0.41.x (ASGI server)
- Pydantic v2 (ships with FastAPI — no separate install)

## Dependencies (requirements.txt)
```
fastapi==0.135.1
uvicorn[standard]==0.41.0
```

That's it. Two packages. CORS middleware comes from Starlette (bundled with FastAPI).

## Team Member Schema
```python
class TeamMember(BaseModel):
    id: str                    # UUID, auto-generated
    name: str                  # "Rahul Sharma"
    role: str                  # "Co-Founder & CEO"
    bio: str                   # 1-2 sentence bio
    photo_url: str = ""        # URL to photo (or empty for placeholder)
    linkedin_url: str = ""     # LinkedIn profile URL
    department: str = ""       # "Engineering", "Design", "Leadership"
    order: int = 0             # Display order
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/team` | List all team members (sorted by order) |
| GET | `/team/{id}` | Get single member |
| POST | `/team` | Add new member (returns created member with ID) |
| PUT | `/team/{id}` | Update member |
| DELETE | `/team/{id}` | Delete member |
| GET | `/health` | Health check (for Render) |

## CORS Config
```python
origins = [
    "http://localhost:3000",           # Local dev
    "https://*.vercel.app",            # Vercel preview deploys
    "https://your-domain.vercel.app",  # Production (update after deploy)
]
```

## Seed Data
6 fictional team members for a robotics/deep-tech startup:
1. CEO/Co-Founder
2. CTO/Co-Founder
3. Head of Engineering
4. Senior Robotics Engineer
5. Product Designer
6. ML Engineer

## Deployment — Render
- **Runtime**: Python 3.12
- **Build command**: `pip install -r requirements.txt`
- **Start command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Root directory**: `backend`
- **Free tier note**: Sleeps after 15 min idle, cold start ~1 min. In-memory data resets on sleep. Acceptable for demo.

## File Structure
```
backend/
├── main.py              # Everything in one file
└── requirements.txt     # 2 packages
```
