"use client";
import { useState } from "react";
import { INCIDENTS, KINDS, byKind, kindMeta, type IncidentKind } from "@/lib/incidents";

export default function IncidentList() {
  const [filter, setFilter] = useState<IncidentKind | "all">("all");
  const items = byKind(filter);
  return (
    <section>
      <div className="row-head">
        <h2 className="h-big">
          Incident log <span className="count">{items.length} of {INCIDENTS.length}</span>
        </h2>
        <div className="chips" role="group" aria-label="Filter incidents">
          <button type="button" className="chip-btn" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
            All
          </button>
          {KINDS.map((k) => (
            <button key={k.id} type="button" className="chip-btn" aria-pressed={filter === k.id} onClick={() => setFilter(k.id)}>
              {k.label}
            </button>
          ))}
        </div>
      </div>
      {filter !== "all" && <p className="hint">{kindMeta(filter).blurb}</p>}
      <div className="stack">
        {items.map((i) => (
          <article key={i.id} className="card incident">
            <div className="meta">
              <span className="row-date">{i.date}</span>
              <span className={`tag tag-${i.kind}`}>{kindMeta(i.kind).label}</span>
              {i.flag && <span className="flag">{i.flag}</span>}
            </div>
            <div className="body">
              <h3>{i.title}</h3>
              <p>{i.what}</p>
              <div className="guard">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p>
                  <strong>Guardrail that would have helped:</strong> {i.guardrail}
                </p>
              </div>
              <p className="sources">
                Sources:{" "}
                {i.sources.map((s, n) => (
                  <span key={s.url}>
                    {n > 0 && " · "}
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  </span>
                ))}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
