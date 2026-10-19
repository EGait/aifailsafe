import type { Metadata } from "next";
import Link from "next/link";
import { INCIDENTS, PROGRESS } from "@/lib/incidents";
import IncidentList from "@/components/IncidentList";

export const metadata: Metadata = {
  title: "The record: when AI goes off script — AIFailSafe",
  description: `A sourced log of ${INCIDENTS.length} incidents involving AI agents and misuse, each labeled and paired with the guardrail that would have helped.`,
};

export default function IncidentsPage() {
  return (
    <>
      <p className="eyebrow">The record</p>
      <h1>
        When AI goes <span className="accent">off script</span>
      </h1>
      <p className="lead">
        A sourced log of AI agents acting without permission and people misusing AI. It’s not here to scare you. Every entry ends with the guardrail that would have prevented it.
      </p>

      <section className="blame">
        <div className="two">
          <div>
            <h2>Everyone’s pointing fingers. The guardrails are still missing.</h2>
            <p>Companies point to Washington for rules. Washington points back at the companies. Meanwhile, most incidents below were disclosed voluntarily, on the companies’ own timelines, sometimes months later.</p>
            <p className="strong">That’s why it’s up to us.</p>
          </div>
          <div>
            <h3>Guardrails starting to take shape</h3>
            <ul>
              {PROGRESS.map((p) => (
                <li key={p.url}>
                  {p.text} <a href={p.url}>({p.when})</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <IncidentList />

      <section className="cta">
        <div className="two">
          <div>
            <h2 className="h-big">AI can build a better future. Guardrails make sure it does.</h2>
            <p>These are steps, not a system. Tell your representatives what you want next. It takes about a minute.</p>
          </div>
          <Link className="call" href="/act">
            Find my reps
          </Link>
        </div>
      </section>
    </>
  );
}
