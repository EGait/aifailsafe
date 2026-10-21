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

## Pages

- `/` — the five asks, promise vs peril, recent incidents, wins so far
- `/asks` — each ask with its reasoning and where Congress stands
- `/act` — ZIP lookup, message composer, send to each rep
- `/incidents` — the full sourced log, filterable
- `/bills/[slug]` — a bill with both sides and the related incidents

## Next

Email signup for the weekly brief, a public actions counter, more bills, a corrections page.

## Analytics

Google Analytics 4, same pattern as solanafeed and rhoodchain: the measurement ID is a constant
at the top of `app/layout.tsx`.

1. Create a GA4 property and a **Web** data stream for the domain, then copy the ID (`G-XXXXXXXXXX`).
2. Paste it into `const GA_ID = "..."` in `app/layout.tsx`, commit, and push.

While `GA_ID` is empty, no Google scripts load at all.

Custom events fired from `lib/track.ts`:

| Event | When |
| --- | --- |
| `reps_found` | A ZIP matched. Sends the state and whether the ZIP spans districts — never the ZIP. |
| `zip_no_match` | A ZIP didn't match. |
| `message_copied` | Copy button used. Sends message type, tone, and stance. |
| `reword` | "Try different wording" used. |
| `contact_opened` | A rep's contact form opened. |
| `call_started` | A rep's phone number tapped. |
| `script_viewed` | The phone script expanded. |
| `message_sent` | The visitor confirmed they sent it. **This is the number that matters.** |

Mark `message_sent` as a key event in GA (Admin → Events) so conversion rate shows on the default reports.

Never add a parameter that identifies a person: no ZIP codes, names, or message text.

## Sourcing standard

`lib/incidents.ts` documents the rule in full. Short version:

1. **Primary documents first** — the company's own incident report, a ruling, a regulator's filing, the bill text.
2. **Then wire services and major outlets** — AP, Reuters, Bloomberg, CNN, Fortune, TechCrunch. Label the
   wire service, not whichever affiliate reprinted it.
3. **Then specialist or official bodies** — a national cybersecurity agency, a law firm's case analysis.

Two independent sources for anything contested. Where outlets disagree on a number, say so in the entry
instead of picking one. Avoid aggregators, SEO blogs, and single-outlet claims. Anything whose cause isn't
confirmed gets a `flag`.

## Link previews

`app/opengraph-image.png` is the card people see when the site is shared. `metadataBase` in
`app/layout.tsx` makes those URLs absolute:

- On Vercel it uses `VERCEL_PROJECT_PRODUCTION_URL` automatically — nothing to configure.
- Once the real domain is live, set `NEXT_PUBLIC_SITE_URL=aifailsafe.com` in Vercel's env vars,
  or replace the fallback in `layout.tsx`.

Test after deploying with the Facebook Sharing Debugger and X's Post Inspector. Both cache
aggressively, so re-scrape there after changing the image.
