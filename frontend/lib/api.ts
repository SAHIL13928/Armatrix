export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo_url: string;
  linkedin_url: string;
  department: string;
  order: number;
}

const API_URL = process.env.API_URL || "http://localhost:8000";

export async function getTeamMembers(): Promise<TeamMember[]> {
  const res = await fetch(`${API_URL}/team`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch team members");
  return res.json();
}
