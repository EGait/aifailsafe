// Rebuilds public/data/reps.json and public/data/zips.json from two public sources:
//  - unitedstates/congress-legislators (current members, phones, sites, contact forms)
//  - OpenSourceActivismTech/us-zipcodes-congress (ZIP -> congressional district)
// Run: npm run update-data   (do this when members change, and again after Jan 2027)
import { writeFile, mkdir } from "node:fs/promises";
import { parse } from "yaml";

const LEG = "https://raw.githubusercontent.com/unitedstates/congress-legislators/main/legislators-current.yaml";
const ZCCD = "https://raw.githubusercontent.com/OpenSourceActivismTech/us-zipcodes-congress/master/zccd.csv";
const PARTY = { Democrat: "D", Republican: "R", Independent: "I" };

const get = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.text();
};

const people = parse(await get(LEG));
const reps = {};
for (const p of people) {
  const t = p.terms.at(-1);
  const name = p.name.official_full || `${p.name.first} ${p.name.last}`;
  const rec = [name, PARTY[t.party] ?? (t.party ?? "?").slice(0, 1), t.phone ?? "", t.url ?? "", t.contact_form ?? ""];
  const st = (reps[t.state] ??= { s: [], h: {} });
  if (t.type === "sen") st.s.push(rec);
  else (st.h[String(t.district ?? 0)] ??= []).push(rec);
}

const zips = {};
const rows = (await get(ZCCD)).trim().split(/\r?\n/).slice(1);
for (const row of rows) {
  const [, state, zcta, cd] = row.split(",");
  const key = `${state}${parseInt(cd, 10)}`;
  const list = (zips[zcta] ??= []);
  if (!list.includes(key)) list.push(key);
}
for (const z of Object.keys(zips)) zips[z] = zips[z].join(",");

await mkdir("public/data", { recursive: true });
await writeFile("public/data/reps.json", JSON.stringify(reps));
await writeFile("public/data/zips.json", JSON.stringify(zips));
console.log(`${people.length} members, ${Object.keys(zips).length} ZIPs written to public/data`);
