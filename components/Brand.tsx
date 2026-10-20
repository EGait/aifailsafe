import Link from "next/link";

export function Mark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={(size * 3) / 4} viewBox="0 0 64 48" fill="none" aria-hidden="true">
      <path d="M20 6H8v36h12" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M44 6h12v36H44" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points="32,15 39.8,19.5 39.8,28.5 32,33 24.2,28.5 24.2,19.5" fill="var(--accent)" stroke="var(--accent)" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="32" cy="24" r="3.2" fill="#fff" />
      <circle cx="32" cy="24" r="1.4" fill="var(--bg)" />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="site-head">
      <div className="head-in">
        <Link href="/" className="brand">
          <Mark />
          <span>
            AIFail<b>Safe</b>
          </span>
        </Link>
        <nav aria-label="Main">
          <Link href="/asks">The asks</Link>
          <Link href="/incidents">Incidents</Link>
          <Link href="/bills/ai-kill-switch-act">Bills</Link>
          <Link href="/act" className="nav-cta">
            Take action
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-foot">
      <div className="foot-in">
        <p>
          <strong>AIFailSafe</strong> is independent and nonpartisan. Every incident links to its source, every bill shows both sides, and corrections are public.
        </p>
        <p className="hint">
          Rep data: the public-domain <a href="https://github.com/unitedstates/congress-legislators">congress-legislators</a> dataset and the{" "}
          <a href="https://github.com/OpenSourceActivismTech/us-zipcodes-congress">ZIP-to-district crosswalk</a> from Open Source Activism Tech, reflecting the 119th Congress as of October 2026.
        </p>
      </div>
    </footer>
  );
}
