"use client";

import { useState } from "react";

type Props = {
  estimatedSavings: number;
  teamSize: number;
};

export function LeadCaptureForm({ estimatedSavings, teamSize }: Props) {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    const response = await fetch("/api/save-lead", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        companyName,
        role,
        teamSize,
        estimatedSavings,
      }),
    });

    setLoading(false);

    if (response.ok) {
      setSuccess(true);

      setEmail("");
      setCompanyName("");
      setRole("");
    } else {
      alert("Something went wrong.");
    }
  }

  if (success) {
    return (
      <div className="rounded-lg border p-6">
        <h3 className="text-xl font-semibold">Audit saved successfully</h3>

        <p className="mt-2 text-sm text-muted-foreground">
          We’ll notify you about future AI cost optimizations.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border p-6">
      <div>
        <label className="mb-2 block text-sm font-medium">Email</label>

        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border p-3"
          placeholder="you@company.com"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Company Name (optional)
        </label>

        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full rounded-md border p-3"
          placeholder="Acme Inc."
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Role (optional)
        </label>

        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full rounded-md border p-3"
          placeholder="Engineering Manager"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-black p-3 text-white"
      >
        {loading ? "Saving..." : "Save My Audit"}
      </button>
    </form>
  );
}
