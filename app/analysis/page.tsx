import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES } from "@/lib/analysis";

export const metadata: Metadata = {
  title: "Analysis",
  description: "Longer pieces on what the AI incident record shows and what Congress is doing about it. Every claim sourced.",
  alternates: { canonical: "/analysis" },
};

export default function AnalysisPage() {
  return (
    <>
      <p className="eyebrow">Analysis</p>
      <h1>Reading the record</h1>
      <p className="lead">
        The incident log says what happened. These pieces say what it adds up to — and where the bills in Congress would and wouldn’t reach. Same rule as the log: every claim traces to a source.
      </p>
      <div className="stack">
        {ARTICLES.map((a) => (
          <Link key={a.slug} href={`/analysis/${a.slug}`} className="card article-row">
            <span className="row-date">{a.date}</span>
            <span>
              <span className="name">{a.title}</span>
              <span className="role">{a.dek}</span>
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
