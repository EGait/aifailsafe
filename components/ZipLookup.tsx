"use client";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FIND_URL, lookupZip, ordinal, type Lookup } from "@/lib/reps";
import Composer from "./Composer";
import RepCard from "./RepCard";

export default function ZipLookup() {
  const params = useSearchParams();
  const [zip, setZip] = useState(() => (params.get("zip") ?? "").replace(/\D/g, "").slice(0, 5));
  const [result, setResult] = useState<{ zip: string; lookup: Lookup } | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const onMessage = useCallback((t: string) => setMessage(t), []);
  const [sent, setSent] = useState(0);

  const run = useCallback(async (value: string) => {
    setError("");
    setResult(null);
    setSent(0);
    if (!/^\d{5}$/.test(value)) return setError("Enter a 5-digit ZIP code.");
    setBusy(true);
    try {
      const lookup = await lookupZip(value);
      if (lookup) setResult({ zip: value, lookup });
      else setError("We couldn’t match that ZIP. Try another, or use the House’s lookup.");
    } catch {
      setError("Something went wrong loading the data. Please try again.");
    } finally {
      setBusy(false);
    }
  }, []);

  const auto = useRef(false);
  useEffect(() => {
    const incoming = (params.get("zip") ?? "").replace(/\D/g, "");
    if (!auto.current && /^\d{5}$/.test(incoming)) {
      auto.current = true;
      void run(incoming);
    }
  }, [params, run]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    void run(zip);
  }

  const lookup = result?.lookup;
  const hasHouseMember = !!lookup?.districts.some((d) => d.members.length);
  const total = lookup ? lookup.senators.length + (hasHouseMember ? 1 : 0) : 0;
  const done = total > 0 && sent >= total;

  return (
    <>
      <form onSubmit={onSubmit} noValidate>
        <label htmlFor="zip">ZIP code</label>
        <input id="zip" inputMode="numeric" autoComplete="postal-code" maxLength={5} placeholder="68508" value={zip} onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))} />
        <button className="go" type="submit" disabled={busy}>{busy ? "Looking…" : "Find my reps"}</button>
      </form>
      {error && (
        <p className="err" role="alert">
          {error} {error.startsWith("We couldn’t") && <a href={FIND_URL}>House lookup</a>}
        </p>
      )}
      <p className="privacy">Your ZIP never leaves your device. The lookup runs in your browser, and nothing is stored.</p>

      {result && lookup && (
        <div id="out">
          <h2>1. Write your message</h2>
          <Composer zip={result.zip} onChange={onMessage} />
          <h2>2. Send it (about 30 seconds each)</h2>
          <p className="hint">Tap a button below. We copy your message and open that office’s form. Paste it in, add your address, and hit send.</p>
          <p className="toast" role="status">{done ? "All sent. Thank you!" : sent > 0 ? `${Math.min(sent, total)} of ${total} sent so far.` : ""}</p>
          {lookup.senators.length ? (
            lookup.senators.map((m) => <RepCard key={m.name} member={m} role={`U.S. Senator, ${lookup.state}`} message={message} onSent={() => setSent((n) => n + 1)} />)
          ) : (
            <div className="note">This area has no voting senators. It is represented by a non-voting delegate.</div>
          )}
          <h2>{lookup.districts.length > 1 ? "Your House member (pick your district)" : "Your House member"}</h2>
          {lookup.districts.length > 1 && (
            <div className="note">
              This ZIP code spans {lookup.districts.length} congressional districts, so we can’t be sure which one is yours. Confirm yours with your street address at <a href={FIND_URL}>house.gov</a>, or write to the one you think fits.
            </div>
          )}
          {lookup.districts.map((d) => {
            const n = parseInt(d.code.slice(2), 10);
            const role = n === 0 ? `U.S. Representative, at-large district, ${lookup.state}` : `U.S. Representative, ${ordinal(n)} District, ${lookup.state}`;
            return (
              <Fragment key={d.code}>
                {d.members.length ? (
                  d.members.map((m) => <RepCard key={m.name} member={m} role={role} message={message} onSent={() => setSent((x) => x + 1)} />)
                ) : (
                  <div className="note">{d.label} currently has no sitting representative. The seat is vacant, so write to your senators above, or check back once it is filled.</div>
                )}
              </Fragment>
            );
          })}
          {done && (
            <div className="card">
              <p>You just told Congress what you want on AI. The more people do it, the harder it is to ignore.</p>
              <button type="button" className="call" onClick={() => navigator.share?.({ title: "AIFailSafe", url: location.origin }).catch(() => {})}>Share this page</button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
