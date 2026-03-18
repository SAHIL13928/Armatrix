"use client";

import { motion } from "motion/react";
import type { TeamMember } from "@/lib/api";
import TeamCard from "./TeamCard";

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
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3"
    >
      {members.map((member, i) => (
        <motion.div key={member.id} variants={item}>
          <TeamCard member={member} index={i} />
        </motion.div>
      ))}
    </motion.div>
  );
}
