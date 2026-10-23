import Link from "next/link";
import { INCIDENTS, PROGRESS, kindMeta } from "@/lib/incidents";
import { BREAKTHROUGHS } from "@/lib/breakthroughs";
import { ASKS } from "@/lib/asks";
import { BILLS } from "@/lib/bills";
import ZipJump from "@/components/ZipJump";

export default function Home() {
  const recent = INCIDENTS.slice(0, 4);
  return (
    <>
      <section className="hero">
        <p className="eyebrow">AI’s promise and peril, in plain English</p>
        <h1>
          You’re the <span className="accent">failsafe.</span>
        </h1>
        <p className="lead">
          AI could speed up medicine and science. It can also go badly off script. The companies say Washington should set the rules. Washington says the companies should police themselves. Nobody is going to do this for us.
        </p>
        <ZipJump />
      </section>

      <section className="band">
        <h2 className="h-big">Find the path between the promise and the peril</h2>
        <p className="sub">Not hype, not doom. Both are real, and the rules we write now decide which one wins out.</p>
        <div className="two">
          <div className="card">
            <span className="tag tag-good">The promise</span>
            <p>AlphaFold predicted the structures of nearly all known proteins, and its creators shared the 2024 Nobel Prize in Chemistry.</p>
            <p>In a Swedish trial of more than 100,000 women, AI-supported mammogram screening found 29% more cancers without adding false alarms.</p>
            <p>
              <Link href="/breakthroughs">All {BREAKTHROUGHS.length} breakthroughs</Link>
            </p>
          </div>
          <div className="card">
            <span className="tag tag-bad">The peril</span>
            <p>
              Deepfake executives on a video call convinced an employee to wire <Link href="/incidents#arup-deepfake">about $25 million</Link>.
            </p>
            <p>
              AI agents with real-world access have <Link href="/incidents#pocketos-db">deleted live databases and broken into government systems</Link>.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="h-big">What we’re asking for</h2>
        <p className="sub">
          Five things, in plain English. They don’t depend on any one bill, and they’re what the messages on this site ask your representatives to deliver.
        </p>
        <ol className="asks">
          {ASKS.map((a, n) => (
            <li key={a.id}>
              <span className="num">{String(n + 1).padStart(2, "0")}</span>
              <div>
                <h3>{a.title}</h3>
                <p>{a.plain}</p>
                <p className="ask-status">{a.status}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="acts">
          <Link className="call" href="/act">
            Tell your reps
          </Link>
          <Link className="alt" href="/asks">
            Why each one
          </Link>
        </div>
      </section>

      <section>
        <div className="row-head">
          <h2 className="h-big">Why we’re asking</h2>
          <Link href="/incidents">See all {INCIDENTS.length} incidents →</Link>
        </div>
        <div className="list">
          {recent.map((i) => (
            <Link key={i.id} href={`/incidents#${i.id}`} className="row">
              <span className="row-date">{i.date}</span>
              <span className="row-title">{i.title}</span>
              <span className={`tag tag-${i.kind}`}>{kindMeta(i.kind).label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="dark">
        <h2 className="h-big light">It works when people push</h2>
        <p className="sub light">Every one of these came after public pressure, reporting, or both. None of it happened on its own.</p>
        <ul className="wins">
          {PROGRESS.map((p) => (
            <li key={p.url}>
              {p.text} <a href={p.url}>({p.when})</a>
            </li>
          ))}
        </ul>
        <p className="lead light" style={{ marginTop: 24 }}>
          Congress is moving slowly, and what’s on the table is incomplete.{" "}
          <Link href={`/bills/${BILLS[0].slug}`}>See what’s actually in the bills</Link>, then tell your representatives what’s missing.
        </p>
      </section>

      <section>
        <h2 className="h-big">How we keep it honest</h2>
        <div className="three">
          <div>
            <h3>Every claim is sourced</h3>
            <p>Each incident and bill summary links to the primary source: the report, the bill text, the company’s own post.</p>
          </div>
          <div>
            <h3>Both sides, every bill</h3>
            <p>We show the strongest case for and against, and we’ll draft a message either way. We take positions on the asks, not on anyone’s party.</p>
          </div>
          <div>
            <h3>Labels you can check</h3>
            <p>A lab test is not the same as a real-world failure. We say which is which, and flag anything unconfirmed.</p>
          </div>
        </div>
      </section>
    </>
  );
}
