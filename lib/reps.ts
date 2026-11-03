// ZIP -> senators + House member(s). Runs in the browser, so a visitor's ZIP never reaches our server.
// Data files are built by `npm run update-data` and served from /public/data.

export const FIND_URL = "https://www.house.gov/representatives/find-your-representative";

/** [name, party letter, phone, website, contact form URL] */
type RawMember = [string, string, string, string, string];
type RepsData = Record<string, { s: RawMember[]; h: Record<string, RawMember[]> }>;
type ZipData = Record<string, string>;

export type Member = {
  name: string;
  party: string;
  phone: string;
  website: string;
  contactForm: string;
  chamber: "senate" | "house";
};

export type District = { code: string; label: string; members: Member[] };
export type Lookup = { state: string; senators: Member[]; districts: District[] };

const PARTY: Record<string, string> = { D: "Democrat", R: "Republican", I: "Independent" };
export const partyName = (p: string) => PARTY[p] ?? p;

const getJson = async <T,>(url: string): Promise<T> => {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${url} -> ${r.status}`);
  return r.json() as Promise<T>;
};

let cache: Promise<[RepsData, ZipData]> | null = null;
function load() {
  // Drop a failed load so the next attempt retries instead of reusing the rejection.
  cache ??= Promise.all([getJson<RepsData>("/data/reps.json"), getJson<ZipData>("/data/zips.json")]).catch((e) => {
    cache = null;
    throw e;
  });
  return cache;
}

/** Member links come from outside data; only ever put http(s) URLs into an href. */
const safeUrl = (u: string) => (/^https?:\/\//i.test(u) ? u : "");

const toMember = (r: RawMember, chamber: Member["chamber"]): Member => ({
  name: r[0],
  party: r[1],
  phone: r[2],
  website: safeUrl(r[3]),
  contactForm: safeUrl(r[4]),
  chamber,
});

export async function lookupZip(zip: string): Promise<Lookup | null> {
  const [reps, zips] = await load();
  const entry = zips[zip];
  if (!entry) return null;
  const codes = entry.split(",");
  const state = codes[0].slice(0, 2);
  const data = reps[state] ?? { s: [], h: {} };
  return {
    state,
    senators: data.s.map((r) => toMember(r, "senate")),
    districts: codes.map((code) => {
      const d = String(parseInt(code.slice(2), 10));
      return {
        code,
        label: d === "0" ? `${state} (at-large)` : `${state}-${d}`,
        members: (data.h[d] ?? []).map((r) => toMember(r, "house")),
      };
    }),
  };
}

export function ordinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function lastName(full: string) {
  const parts = full.replace(/,?\s+(Jr\.?|Sr\.?|II|III|IV)$/i, "").split(" ");
  return parts[parts.length - 1];
}

export const salutation = (m: Member) => `${m.chamber === "senate" ? "Senator" : "Representative"} ${lastName(m.name)}`;
