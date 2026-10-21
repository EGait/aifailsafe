import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

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
          <Link href="/analysis">Analysis</Link>
          <Link href="/bills/ai-kill-switch-act">Bills</Link>
          <Link href="/act" className="nav-cta">
            Take action
          </Link>
          <ThemeToggle />
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
        <p className="foot-links">
          <a href="https://x.com/aifail_safe" rel="me noopener noreferrer" target="_blank">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.9 2H22l-7.2 8.3L23.3 22h-6.6l-5.2-6.8L5.6 22H2.5l7.7-8.8L1.1 2h6.8l4.7 6.2L18.9 2Zm-1.1 18h1.7L7.3 3.8H5.5L17.8 20Z" />
            </svg>
            @aifail_safe
          </a>
          <a href="mailto:aifailsafeorg@gmail.com">aifailsafeorg@gmail.com</a>
          <span>Spotted an error? Email us and we’ll correct it in public.</span>
        </p>
        <p className="hint">
          Rep data: the public-domain <a href="https://github.com/unitedstates/congress-legislators">congress-legislators</a> dataset and the{" "}
          <a href="https://github.com/OpenSourceActivismTech/us-zipcodes-congress">ZIP-to-district crosswalk</a> from Open Source Activism Tech, reflecting the 119th Congress as of October 2026.
        </p>
      </div>
    </footer>
  );
}
