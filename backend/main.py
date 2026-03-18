import uuid
from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from pydantic import BaseModel, Field

app = FastAPI(title="Armatrix Team API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_origin_regex=r"https://armatrix[a-z0-9-]*\.vercel\.app",
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Models ---


class TeamMemberBase(BaseModel):
    name: str = Field(min_length=1)
    role: str = Field(min_length=1)
    bio: str = Field(min_length=1)
    photo_url: str = ""
    linkedin_url: str = ""
    department: str = ""
    order: int = 0


class TeamMemberCreate(TeamMemberBase):
    pass


class TeamMemberUpdate(BaseModel):
    name: Optional[str] = Field(default=None, min_length=1)
    role: Optional[str] = Field(default=None, min_length=1)
    bio: Optional[str] = Field(default=None, min_length=1)
    photo_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    department: Optional[str] = None
    order: Optional[int] = None


class TeamMember(TeamMemberBase):
    id: str


# --- Seed Data ---


def avatar(name: str) -> str:
    return f"https://ui-avatars.com/api/?name={name.replace(' ', '+')}&background=1a1a2e&color=e4e4e7&size=200&bold=true"


team_members: list[dict] = [
    {
        "id": str(uuid.uuid4()),
        "name": "Aarav Mehta",
        "role": "Co-Founder & CEO",
        "bio": "Former McKinsey consultant turned robotics obsessive. Dropped everything to build machines that think.",
        "photo_url": avatar("Aarav Mehta"),
        "linkedin_url": "",
        "department": "Leadership",
        "order": 1,
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Priya Sharma",
        "role": "Co-Founder & CTO",
        "bio": "PhD in robotic manipulation from IIT Bombay. 12 patents in actuator design. Writes firmware for fun.",
        "photo_url": avatar("Priya Sharma"),
        "linkedin_url": "",
        "department": "Leadership",
        "order": 2,
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Rohan Kapoor",
        "role": "Head of Engineering",
        "bio": "Ex-ISRO systems architect. Obsessed with reliability — if it can break in production, he's already tested it.",
        "photo_url": avatar("Rohan Kapoor"),
        "linkedin_url": "",
        "department": "Engineering",
        "order": 3,
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Ananya Reddy",
        "role": "Senior Robotics Engineer",
        "bio": "Builds the snake-arm prototypes. Thinks in CAD, dreams in G-code. Competitive rock climber.",
        "photo_url": avatar("Ananya Reddy"),
        "linkedin_url": "",
        "department": "Engineering",
        "order": 4,
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Vikram Das",
        "role": "ML Engineer",
        "bio": "Teaching robots to see and navigate autonomously. Previously built perception systems at a self-driving startup.",
        "photo_url": avatar("Vikram Das"),
        "linkedin_url": "",
        "department": "Engineering",
        "order": 5,
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Neha Iyer",
        "role": "Product Designer",
        "bio": "Designs interfaces for humans who operate robots. Believes great UX can make complex machinery feel intuitive.",
        "photo_url": avatar("Neha Iyer"),
        "linkedin_url": "",
        "department": "Design",
        "order": 6,
    },
]


# --- Endpoints ---


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.get("/team", response_model=list[TeamMember])
def list_team():
    return sorted(team_members, key=lambda m: m["order"])


@app.get("/team/{member_id}", response_model=TeamMember)
def get_member(member_id: str):
    for m in team_members:
        if m["id"] == member_id:
            return m
    raise HTTPException(status_code=404, detail="Member not found")


@app.post("/team", response_model=TeamMember, status_code=201)
def create_member(member: TeamMemberCreate):
    new = member.model_dump()
    new["id"] = str(uuid.uuid4())
    team_members.append(new)
    return new


@app.put("/team/{member_id}", response_model=TeamMember)
def update_member(member_id: str, updates: TeamMemberUpdate):
    for m in team_members:
        if m["id"] == member_id:
            for key, val in updates.model_dump(exclude_none=True).items():
                m[key] = val
            return m
    raise HTTPException(status_code=404, detail="Member not found")


@app.delete("/team/{member_id}", status_code=204)
def delete_member(member_id: str):
    for i, m in enumerate(team_members):
        if m["id"] == member_id:
            team_members.pop(i)
            return Response(status_code=204)
    raise HTTPException(status_code=404, detail="Member not found")
