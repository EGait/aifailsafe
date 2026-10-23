import type { Metadata } from "next";
import Link from "next/link";
import { BREAKTHROUGHS } from "@/lib/breakthroughs";
import BreakthroughList from "@/components/BreakthroughList";

export const metadata: Metadata = {
  title: "Breakthroughs: what AI has actually delivered",
  description: `${BREAKTHROUGHS.length} sourced examples of AI producing real results in medicine, biology and forecasting, each labeled by how far along it really is.`,
  alternates: { canonical: "/breakthroughs" },
};

export default function BreakthroughsPage() {
  return (
    <>
      <p className="eyebrow">The record</p>
      <h1>
        What AI has <span className="accent">actually delivered</span>
      </h1>
      <p className="lead">
        The case for guardrails only makes sense if there is something worth protecting. These are results that held up, with the same sourcing rules we use for incidents, and an honest label on how far along each one is. Saving lives, reading lost books, finding drugs nobody was looking for.
      </p>

      <section className="note-box">
        <h2>Why the labels matter</h2>
        <p>
          Press releases about AI breakthroughs vastly outnumber the ones that survive scrutiny. A drug that improved lung function in 71 patients is not the same as a screening programme running nationally. We say which is which, so you can weigh it yourself.
        </p>
      </section>

      <BreakthroughList />

      <section className="cta">
        <div className="two">
          <div>
            <h2 className="h-big">Guardrails are how we keep this</h2>
            <p>Rules that catch failures early are what let the good uses keep going. Tell your representatives what you want.</p>
          </div>
          <Link className="call" href="/act">
            Find my reps
          </Link>
        </div>
      </section>

      <p className="hint">
        The other half of the record: <Link href="/incidents">when AI goes off script</Link>.
      </p>
    </>
  );
}
