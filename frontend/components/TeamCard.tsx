"use client";

import type { TeamMember } from "@/lib/api";
import { useState } from "react";
import EditMemberModal from "./EditMemberModal";
import ProfileCard from "./ProfileCard"; // ✅ NEW

function avatarFallback(name: string) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=1a1a2e&color=e4e4e7&size=200&bold=true`;
}

export default function TeamCard({
  member,
  index,
  onDelete,
  onEdit,
}: {
  member: TeamMember;
  index: number;
  onDelete?: (id: string) => void;
  onEdit?: (member: TeamMember) => void;
}) {
  const number = `/${String(index + 1).padStart(3, "0")}`;
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div className="relative group">
        
        {/* 🔢 Number */}
        <span className="absolute left-3 top-3 font-mono text-xs text-text-muted z-10">
          {number}
        </span>

        {/* ❌ Delete */}
        {onDelete && (
          <button
            onClick={() => onDelete(member.id)}
            className="absolute right-3 top-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 text-red-400 hover:text-red-500 text-xs"
          >
            ✕
          </button>
        )}

        {/* ✏️ Edit */}
        {onEdit && (
          <button
            onClick={() => setIsEditing(true)}
            className="absolute right-10 top-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 text-blue-400 hover:text-blue-500 text-xs"
          >
            ✎
          </button>
        )}

        {/* 🔥 Profile Card */}
        <ProfileCard
          name={member.name}
          title={member.role}
          handle={member.department || "Team"}
          status="Active"
          contactText="View"
          avatarUrl={
            member.photo_url && member.photo_url.startsWith("https://")
              ? member.photo_url
              : avatarFallback(member.name)
          }
          enableTilt={true}
          enableMobileTilt={false}
          behindGlowColor="rgba(59,130,246,0.4)"
          behindGlowEnabled
          innerGradient="linear-gradient(145deg,#1a1a2e 0%,#3b82f633 100%)"
        />

      </div>

      {/* ✅ Edit Modal */}
      {isEditing && (
        <EditMemberModal
          member={member}
          onClose={() => setIsEditing(false)}
          onEdit={(updated) => {
            onEdit?.(updated);
            setIsEditing(false);
          }}
        />
      )}
    </>
  );
}