"use client";

import { useState } from "react";
import type { TeamMember } from "@/lib/api";

export default function EditMemberModal({
  member,
  onClose,
  onEdit,
}: {
  member: TeamMember;
  onClose: () => void;
  onEdit: (member: TeamMember) => void;
}) {
  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const [form, setForm] = useState<TeamMember>(member);

  const handleChange = (key: keyof TeamMember, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const res = await fetch(`${API}/team/${form.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const updated = await res.json();
    onEdit(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl bg-surface p-6 shadow-xl border border-border">
        <h2 className="text-lg font-semibold text-text mb-4">
          Edit Team Member
        </h2>

        <div className="space-y-3">
          <input
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Name"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />

          <input
            value={form.role}
            onChange={(e) => handleChange("role", e.target.value)}
            placeholder="Role"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />

          <textarea
            value={form.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            placeholder="Bio"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />

          <input
            value={form.photo_url}
            onChange={(e) => handleChange("photo_url", e.target.value)}
            placeholder="Photo URL"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />

          <input
            value={form.linkedin_url}
            onChange={(e) => handleChange("linkedin_url", e.target.value)}
            placeholder="LinkedIn URL"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="text-sm text-text-muted hover:text-text"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-md bg-accent px-4 py-2 text-sm text-white hover:opacity-90"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}