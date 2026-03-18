import { getTeamMembers, type TeamMember } from "@/lib/api";
import TeamGrid from "@/components/TeamGrid";

export default async function TeamPage() {
  let members: TeamMember[];
  try {
    members = await getTeamMembers();
  } catch {
    members = [];
  }

  return (
    <div>
      <section className="px-6 py-16 text-center md:py-24">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Meet the Team
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-text-muted md:text-xl">
          The people behind the machine
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 md:pb-24">
        {members.length > 0 ? (
          <TeamGrid members={members} />
        ) : (
          <p className="text-center text-text-muted">
            Unable to load team members. Please try again later.
          </p>
        )}
      </section>
    </div>
  );
}
