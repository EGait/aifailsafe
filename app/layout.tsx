import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/Brand";

// Google Analytics measurement ID. Create the GA4 property, then paste the ID here.
// Leave as "" until then — nothing loads while it's empty.
const GA_ID = "G-S5SDPS7C7W";

// Absolute base for social-card URLs. Vercel sets VERCEL_PROJECT_PRODUCTION_URL for you;
// once the real domain is live, replace the fallback with "https://aifailsafe.com".
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
  ? `https://${process.env.NEXT_PUBLIC_SITE_URL.replace(/^https?:\/\//, "")}`
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AIFailSafe — AI incidents, AI bills, and your representatives",
    template: "%s — AIFailSafe",
  },
  description:
    "A sourced log of what AI systems have actually done, plain-English summaries of the bills in Congress, and a one-minute way to tell your representatives what you want.",
  alternates: { canonical: "/" },
  keywords: ["AI safety", "AI regulation", "AI incidents", "AI policy", "contact Congress", "AI accountability", "AI Kill Switch Act"],
  // Next serves app/icon.svg, app/apple-icon.png and app/opengraph-image.png automatically.
  openGraph: {
    title: "AIFailSafe",
    description: "You’re the failsafe. Find your reps and tell them what you want on AI.",
    siteName: "AIFailSafe",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIFailSafe",
    description: "You’re the failsafe. Find your reps and tell them what you want on AI.",
    site: "@aifail_safe",
    creator: "@aifail_safe",
  },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light")document.documentElement.setAttribute("data-theme",t)}catch(e){}`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@800&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap"
          rel="stylesheet"
        />
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
            </Script>
          </>
        )}
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "AIFailSafe",
              url: SITE_URL,
              logo: `${SITE_URL}/icon.svg`,
              description:
                "Independent, nonpartisan tracking of AI incidents and AI legislation, with tools for the public to contact Congress.",
              email: "aifailsafeorg@gmail.com",
              sameAs: ["https://x.com/aifail_safe"],
            }),
          }}
        />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
