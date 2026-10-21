import { NextResponse } from "next/server";
import { addSubscriber } from "@/lib/subscribers";

export async function POST(req: Request) {
  let body: { email?: string; source?: string; website?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Bad request." }, { status: 400 });
  }

  // Honeypot: a field hidden from people but filled in by most bots. Pretend it worked.
  if (body.website) return NextResponse.json({ ok: true, message: "Thanks — you’re on the list." });

  const result = await addSubscriber(body.email ?? "", body.source ?? "unknown");

  if (result.ok) {
    return NextResponse.json({
      ok: true,
      message: result.already ? "You’re already on the list." : "Thanks — you’re on the list.",
    });
  }
  if (result.reason === "invalid") {
    return NextResponse.json({ ok: false, message: "That doesn’t look like a valid email address." }, { status: 400 });
  }
  return NextResponse.json(
    { ok: false, message: "Sign-ups aren’t working right now. Try again later, or email aifailsafeorg@gmail.com." },
    { status: 503 },
  );
}
