import type { Metadata } from "next";
import Link from "next/link";
import { ASKS } from "@/lib/asks";
import { BILLS } from "@/lib/bills";

export const metadata: Metadata = {
  title: "What we’re asking for",
  description: "Five plain-English asks for AI guardrails, why each one exists, and where Congress stands on it.",
  alternates: { canonical: "/asks" },
};

export default function AsksPage() {
  return (
    <>
      <p className="eyebrow">The asks</p>
      <h1>What we’re asking for</h1>
      <p className="lead">
        These don’t depend on any one bill or any one party. They’re the minimum we think the public should expect from anyone running a powerful AI system, and they’re what the messages on this site ask for.
      </p>

      <div className="stack">
        {ASKS.map((a, n) => (
          <article key={a.id} className="card ask-card" id={a.id}>
            <span className="num big">{String(n + 1).padStart(2, "0")}</span>
            <div>
              <h2>{a.title}</h2>
              <p className="plainline">{a.plain}</p>
              <p>
                <strong>Why:</strong> {a.why}
              </p>
              <p className="ask-status">
                <strong>Where it stands:</strong> {a.status}
              </p>
            </div>
          </article>
        ))}
      </div>

      <section className="cta">
        <div className="two">
          <div>
            <h2 className="h-big">Nobody is going to do this for us.</h2>
            <p>Send these asks to your senators and House member. It takes about a minute, and you choose the wording.</p>
          </div>
          <Link className="call" href="/act">
            Tell your reps
          </Link>
        </div>
      </section>

      <p className="hint">
        Tracking the bills: <Link href={`/bills/${BILLS[0].slug}`}>{BILLS[0].name} ({BILLS[0].number})</Link>. We show both sides of each one and never ask you to support a bill just because it’s on the topic.
      </p>
    </>
  );
}
