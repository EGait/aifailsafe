import type { MetadataRoute } from "next";
import { BILLS } from "@/lib/bills";
import { ARTICLES } from "@/lib/analysis";

const base = process.env.NEXT_PUBLIC_SITE_URL
  ? `https://${process.env.NEXT_PUBLIC_SITE_URL.replace(/^https?:\/\//, "")}`
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/asks", "/act", "/incidents", "/analysis", ...BILLS.map((b) => `/bills/${b.slug}`), ...ARTICLES.map((a) => `/analysis/${a.slug}`)];
  return pages.map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));
}
