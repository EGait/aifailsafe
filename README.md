# AIFailSafe

Find your senators and House member by ZIP, write a message about AI guardrails, and send it in about 30 seconds.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build
```

Deploy on Vercel: import the repo, no settings needed.

## How it works

- `lib/reps.ts` looks up a ZIP in `public/data/*.json` **in the browser**, so a visitor's ZIP never reaches your server.
- `lib/letters.ts` holds the message templates (support/oppose, three tones). Re-verify any incident claim before editing it.
- `components/` has the ZIP form, the message composer, and the rep cards.

## Refresh the data

```bash
npm run update-data
```

Rebuilds `public/data/reps.json` and `zips.json` from the congress-legislators dataset and the Open Source Activism Tech ZIP crosswalk. Run it when members change, and again after the new Congress is sworn in (January 2027). Two House seats (FL-20, TX-23) were vacant as of October 2026; the app handles vacancies automatically.

## Known limits

- About 22% of ZIPs span more than one district. The app shows each and links to house.gov to confirm by address. A paid geocoder (for example Geocodio) would fix this, but it needs a server route and changes the "ZIP stays on your device" promise.
- Most House offices have no public email or direct form, so the button copies the message and opens their site.

## Next

Incident log pages, bill pages (AI Kill Switch Act first), landing page, email signup, and an actions counter.
