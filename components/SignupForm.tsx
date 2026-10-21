"use client";
import { useState } from "react";
import { track } from "@/lib/track";

/** Email collection only — nothing is sent yet, and the copy says so. */
export default function SignupForm({ source, compact = false }: { source: string; compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const id = `signup-${source}`;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("busy");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, website }),
      });
      const data = (await res.json()) as { ok: boolean; message: string };
      setMessage(data.message);
      setStatus(data.ok ? "done" : "error");
      if (data.ok) {
        track("subscribed", { source });
        setEmail("");
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "done") return <p className="toast">{message}</p>;

  return (
    <form onSubmit={onSubmit} className={compact ? "signup compact" : "signup"}>
      <label htmlFor={id}>{compact ? "Get an email when a bill moves" : "Know when it matters"}</label>
      {!compact && (
        <p className="hint">
          We’ll email you when something significant happens and when a bill you can act on moves. No more than a couple of times a month.
        </p>
      )}
      <div className="signup-row">
        <input
          id={id}
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="go" type="submit" disabled={status === "busy"}>
          {status === "busy" ? "…" : "Sign up"}
        </button>
      </div>
      {/* Hidden from people; bots fill it in. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hp"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />
      {status === "error" && <p className="err">{message}</p>}
    </form>
  );
}
