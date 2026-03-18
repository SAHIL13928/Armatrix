"use client";

import { motion } from "motion/react";
import type { TeamMember } from "@/lib/api";

function avatarFallback(name: string) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1a1a2e&color=e4e4e7&size=200&bold=true`;
}

export default function TeamCard({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  const number = `/${String(index + 1).padStart(3, "0")}`;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/25 hover:bg-surface-hover hover:shadow-[0_0_30px_rgba(59,130,246,0.08)]"
    >
      <span className="font-mono text-xs text-text-muted">{number}</span>

      <div className="mt-4 overflow-hidden rounded-lg">
        <img
          src={
            member.photo_url && member.photo_url.startsWith("https://")
              ? member.photo_url
              : avatarFallback(member.name)
          }
          alt={member.name}
          className="aspect-square w-full object-cover"
        />
      </div>

      <div className="mt-4 space-y-2">
        <h3 className="text-xl font-semibold text-text">{member.name}</h3>
        <p className="text-sm font-medium uppercase tracking-wider text-accent">
          {member.role}
        </p>
        <p className="line-clamp-2 text-sm leading-relaxed text-text-muted">
          {member.bio}
        </p>
      </div>

      {member.linkedin_url && (
        <a
          href={member.linkedin_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className="mt-4 inline-flex items-center gap-1.5 text-xs text-text-muted transition-colors group-hover:text-accent"
        >
          <svg
            className="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </a>
      )}
    </motion.div>
  );
}
