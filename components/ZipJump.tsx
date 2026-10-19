"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

/** Landing-page ZIP box. Hands the ZIP to /act, which does the real lookup in the browser. */
export default function ZipJump() {
  const router = useRouter();
  const [zip, setZip] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/act${/^\d{5}$/.test(zip) ? `?zip=${zip}` : ""}`);
      }}
    >
      <label htmlFor="zip-jump">Start here: who represents you?</label>
      <input id="zip-jump" inputMode="numeric" autoComplete="postal-code" maxLength={5} placeholder="ZIP code" value={zip} onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))} />
      <button className="go" type="submit">
        Find my reps
      </button>
      <p className="privacy">Your ZIP never leaves your device. The lookup runs in your browser, and nothing is stored.</p>
    </form>
  );
}
