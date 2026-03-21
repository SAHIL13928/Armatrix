"use client";

import { useState } from "react";

export default function AddMemberModal({ onAdd }: any) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    role: "",
    bio: "",
  });

  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${API}/team`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const newMember = await res.json();
    onAdd(newMember);

    setForm({ name: "", role: "", bio: "" });
    setOpen(false);
  };

  return (
    <>
      {/* 🔥 Button */}
      <button
        onClick={() => setOpen(true)}
        className="mb-10 border border-accent px-4 py-2 text-sm text-accent hover:bg-accent/10 transition"
      >
        + Add Member
      </button>

      {/* 🔥 Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl bg-surface p-6 border border-border">
            
            <h2 className="text-lg font-semibold mb-4">Add Team Member</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-border p-2 bg-transparent"
                required
              />

              <input
                placeholder="Role"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full border border-border p-2 bg-transparent"
                required
              />

              <textarea
                placeholder="Bio"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                className="w-full border border-border p-2 bg-transparent"
                required
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-sm text-text-muted"
                >
                  Cancel
                </button>

                <button className="bg-accent text-black px-4 py-2 text-sm rounded">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}