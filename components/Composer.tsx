"use client";
import { useEffect, useMemo, useState } from "react";
import { buildLetter, TONES, type Mode, type Stance, type Tone } from "@/lib/letters";
import { copyText } from "@/lib/clipboard";

function Chips<T extends string>({ options, value, onChange, label }: { options: { value: T; label: string }[]; value: T; onChange: (v: T) => void; label: string }) {
  return (
    <div className="chips" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.value} type="button" className="chip-btn" aria-pressed={o.value === value} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function Composer({ zip, onChange }: { zip: string; onChange: (text: string) => void }) {
  const [mode, setMode] = useState<Mode>("general");
  const [stance, setStance] = useState<Stance>("support");
  const [tone, setTone] = useState<Tone>("inf");
  const [name, setName] = useState("");
  const [why, setWhy] = useState("");
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 2 ** 31));
  const generated = useMemo(() => buildLetter({ mode, stance, tone, zip, name, why, seed }), [mode, stance, tone, zip, name, why, seed]);
  const [text, setText] = useState(generated);
  const [copied, setCopied] = useState<boolean | null>(null);

  // Changing any option rewrites the draft; manual edits are kept until then.
  useEffect(() => setText(generated), [generated]);
  useEffect(() => onChange(text), [text, onChange]);

  return (
    <div className="card">
      <span className="lbl">What do you want to say?</span>
      <p className="hint" style={{ margin: "0 0 10px" }}>Most people send the asks. Pick a bill only if you want to weigh in on that specific text.</p>
      <Chips
        label="Message type"
        value={mode}
        onChange={setMode}
        options={[
          { value: "general", label: "The five asks" },
          { value: "bill", label: "A specific bill" },
        ]}
      />
      {mode === "bill" && (
        <>
          <p className="hint" style={{ margin: "12px 0 0" }}>AI Kill Switch Act (H.R. 9917) — the only federal bill we track so far.</p>
          <span className="lbl">Your position on it</span>
          <Chips
            label="Position"
            value={stance}
            onChange={setStance}
            options={[
              { value: "support", label: "Support" },
              { value: "oppose", label: "Oppose" },
            ]}
          />
        </>
      )}
      <span className="lbl">Tone</span>
      <Chips label="Tone" value={tone} onChange={setTone} options={TONES} />
      <label className="lbl" htmlFor="name">Your name</label>
      <input id="name" className="plain" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name (optional)" autoComplete="name" />
      <label className="lbl" htmlFor="why">Why it matters to you</label>
      <textarea id="why" rows={2} value={why} onChange={(e) => setWhy(e.target.value)} placeholder="One sentence on why this matters to you (optional, but it makes your message count)" />
      <label className="lbl" htmlFor="draft">Your message</label>
      <textarea id="draft" rows={16} value={text} onChange={(e) => setText(e.target.value)} />
      <div className="acts" style={{ marginTop: 12 }}>
        <button type="button" className="go" onClick={async () => setCopied(await copyText(text.split("[REP]").join("Member of Congress")))}>
          Copy message
        </button>
        <button type="button" className="alt" onClick={() => setSeed(Math.floor(Math.random() * 2 ** 31))}>
          Try different wording
        </button>
      </div>
      {copied !== null && <p className="hint">{copied ? "Copied." : "Couldn’t copy automatically. Select the message and copy it."}</p>}
      <p className="hint">The greeting fills in automatically for each member. Messages in your own words count most, so add a sentence about why this matters to you. Edit last: changing the options or the wording rewrites the draft.</p>
    </div>
  );
}
