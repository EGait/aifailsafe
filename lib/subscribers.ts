// Email collection. We store addresses and send nothing yet — no provider, no cost.
// When it's time to send, export with:  SELECT email FROM subscribers WHERE unsubscribed_at IS NULL;
//
// Schema (run once in the Neon SQL editor):
//   CREATE TABLE IF NOT EXISTS subscribers (
//     id            SERIAL PRIMARY KEY,
//     email         TEXT UNIQUE NOT NULL,
//     source        TEXT,
//     created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
//     unsubscribed_at TIMESTAMPTZ
//   );

import { neon } from "@neondatabase/serverless";

export type SubscribeResult = { ok: true; already: boolean } | { ok: false; reason: "invalid" | "unavailable" | "error" };

// Deliberately permissive: the goal is to reject typos and junk, not to police valid addresses.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeEmail(raw: string): string | null {
  const email = raw.trim().toLowerCase();
  if (email.length > 254 || !EMAIL.test(email)) return null;
  return email;
}

export async function addSubscriber(rawEmail: string, source: string): Promise<SubscribeResult> {
  const email = normalizeEmail(rawEmail);
  if (!email) return { ok: false, reason: "invalid" };

  const url = process.env.DATABASE_URL;
  if (!url) return { ok: false, reason: "unavailable" };

  try {
    const sql = neon(url);
    // ON CONFLICT means a repeat signup is a no-op rather than an error the visitor sees.
    const rows = await sql`
      INSERT INTO subscribers (email, source)
      VALUES (${email}, ${source.slice(0, 60)})
      ON CONFLICT (email) DO NOTHING
      RETURNING id
    `;
    return { ok: true, already: rows.length === 0 };
  } catch (err) {
    console.error("subscribe failed", err);
    return { ok: false, reason: "error" };
  }
}
