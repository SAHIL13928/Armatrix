import json
import os
import uuid
from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from pydantic import BaseModel, Field

# ✅ Ensure correct file path (important)
DATA_FILE = os.path.join(os.path.dirname(__file__), "data.json")


# --- Data Helpers ---
def load_data():
    if not os.path.exists(DATA_FILE):
        return []

    with open(DATA_FILE, "r") as f:
        return json.load(f)


def save_data(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)


# --- App Setup ---
app = FastAPI(title="Armatrix Team API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
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


# --- Load Data ---
team_members: list[dict] = load_data()


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
    save_data(team_members)  # ✅ persist

    return new


@app.put("/team/{member_id}", response_model=TeamMember)
def update_member(member_id: str, updates: TeamMemberUpdate):
    for m in team_members:
        if m["id"] == member_id:
            for key, val in updates.model_dump(exclude_none=True).items():
                m[key] = val

            save_data(team_members)  # ✅ persist
            return m

    raise HTTPException(status_code=404, detail="Member not found")


@app.delete("/team/{member_id}", status_code=204)
def delete_member(member_id: str):
    for i, m in enumerate(team_members):
        if m["id"] == member_id:
            team_members.pop(i)
            save_data(team_members)  # ✅ persist
            return Response(status_code=204)

    raise HTTPException(status_code=404, detail="Member not found")