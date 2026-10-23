"use client";
import { useState } from "react";
import { BREAKTHROUGHS, STAGES, byStage, stageMeta, type Stage } from "@/lib/breakthroughs";

export default function BreakthroughList() {
  const [filter, setFilter] = useState<Stage | "all">("all");
  const items = byStage(filter);
  return (
    <section>
      <div className="row-head">
        <h2 className="h-big">
          Breakthroughs <span className="count">{items.length} of {BREAKTHROUGHS.length}</span>
        </h2>
        <div className="chips" role="group" aria-label="Filter breakthroughs">
          <button type="button" className="chip-btn" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
            All
          </button>
          {STAGES.map((s) => (
            <button key={s.id} type="button" className="chip-btn" aria-pressed={filter === s.id} onClick={() => setFilter(s.id)}>
              {s.label}
            </button>
          ))}
        </div>
      </div>
      {filter !== "all" && <p className="hint">{stageMeta(filter).blurb}</p>}
      <div className="stack">
        {items.map((b) => (
          <article key={b.id} id={b.id} className="card incident">
            <div className="meta">
              <span className="row-date">{b.date}</span>
              <span className={`tag stage-${b.stage}`}>{stageMeta(b.stage).label}</span>
              <span className="flag">{b.field}</span>
            </div>
            <div className="body">
              <h3>{b.title}</h3>
              <p>{b.what}</p>
              {b.caveat && (
                <div className="caveat">
                  <p>
                    <strong>Worth knowing:</strong> {b.caveat}
                  </p>
                </div>
              )}
              <p className="sources">
                Sources:{" "}
                {b.sources.map((s, n) => (
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
