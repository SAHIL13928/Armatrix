import { getTeamMembers, type TeamMember } from "@/lib/api";
import TeamGrid from "@/components/TeamGrid";
import TextPressure from "@/components/TextPressure"; 

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
        
        {/* 🔥 Animated Heading */}
       <div className="relative flex items-center justify-center h-[180px] md:h-[220px] max-w-4xl mx-auto">
  <TextPressure text="Meet the Team" />
</div>

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