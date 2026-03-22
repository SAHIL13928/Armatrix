"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import type { TeamMember } from "@/lib/api";
import TeamCard from "./TeamCard";
import AddMemberModal from "./AddMemberModal";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function TeamGrid({ members }: { members: TeamMember[] }) {
  const [team, setTeam] = useState<TeamMember[]>([]);

  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    setTeam(members);
  }, [members]);

  const handleDelete = async (id: string) => {
    await fetch(`${API}/team/${id}`, {
      method: "DELETE",
    });

    setTeam((prev) => prev.filter((m) => m.id !== id));
  };

  // ✅ NEW: edit handler
  const handleEdit = async (updatedMember: TeamMember) => {
    await fetch(`${API}/team/${updatedMember.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMember),
    });

    setTeam((prev) =>
      prev.map((m) => (m.id === updatedMember.id ? updatedMember : m))
    );
  };

  const handleAdd = (newMember: TeamMember) => {
    setTeam((prev) => [...prev, newMember]);
  };

  return (
    <>
      <AddMemberModal onAdd={handleAdd} />

      {team.length === 0 ? (
        <p className="text-center text-text-muted mt-10">
          No team members yet. Add your first one 🚀
        </p>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3"
        >
          {team.map((member, i) => (
            <motion.div key={member.id} variants={item}>
              <TeamCard
                member={member}
                index={i}
                onDelete={handleDelete}
                onEdit={handleEdit} 
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
}