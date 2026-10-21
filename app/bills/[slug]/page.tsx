import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BILLS, getBill } from "@/lib/bills";
import { INCIDENTS, kindMeta } from "@/lib/incidents";

export function generateStaticParams() {
  return BILLS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const bill = getBill((await params).slug);
  if (!bill) return {};
  return {
    title: `${bill.name} (${bill.number})`,
    description: bill.summary,
    alternates: { canonical: `/bills/${bill.slug}` },
  };
}

export default async function BillPage({ params }: { params: Promise<{ slug: string }> }) {
  const bill = getBill((await params).slug);
  if (!bill) notFound();
  const related = INCIDENTS.filter((i) => bill.relatedIncidents.includes(i.id));
  return (
    <>
      <p className="eyebrow">{bill.number}</p>
      <h1>{bill.name}</h1>
      <p className="sub">
        {bill.sponsors} · Introduced {bill.introduced}
      </p>
      <p className="lead">{bill.summary}</p>
      <div className="status">
        <strong>Status:</strong> {bill.status}. <span className="hint">Checked {bill.statusChecked}. <a href={bill.trackUrl}>Track it on Congress.gov</a>.</span>
      </div>

      <div className="acts">
        <Link className="call" href="/act">
          Email your reps about this bill
        </Link>
        <a className="alt" href={bill.textUrl} target="_blank" rel="noopener noreferrer">
          Read the bill text
        </a>
      </div>

      <section>
        <h2 className="h-big">What it would do</h2>
        <ul className="plain">
          {bill.does.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="h-big">Both sides</h2>
        <p className="sub">We don’t take a position on this bill. Here is the strongest version of each case, in that side’s own terms.</p>
        <div className="two">
          <div className="card">
            <span className="tag tag-good">The case for</span>
            <ul className="plain">
              {bill.forCase.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <span className="tag tag-bad">The case against</span>
            <ul className="plain">
              {bill.againstCase.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {bill.gap && (
        <section className="note-box">
          <h2>A gap worth asking about</h2>
          <p>{bill.gap}</p>
        </section>
      )}

      <section>
        <h2 className="h-big">Incidents this bill speaks to</h2>
        <div className="list">
          {related.map((i) => (
            <Link key={i.id} href={`/incidents#${i.id}`} className="row">
              <span className="row-date">{i.date}</span>
              <span className="row-title">{i.title}</span>
              <span className={`tag tag-${i.kind}`}>{kindMeta(i.kind).label}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
