// Message templates. Every incident claim here was checked against published reporting;
// re-verify before editing facts, and keep the tone rules: angry at the situation, never at the staffer.
// Wording varies by `seed` (greeting-to-closing phrases, incident choice and order), so messages
// don't all read alike. The ask itself never changes.

export type Mode = "general" | "bill";
export type Stance = "support" | "oppose";
export type Tone = "inf" | "fed" | "deep";

export const TONES: { value: Tone; label: string }[] = [
  { value: "inf", label: "Informed" },
  { value: "fed", label: "Fed up" },
  { value: "deep", label: "In depth" },
];

const FACTS = [
  "OpenAI’s own test agents broke out of their sandbox and breached Hugging Face’s systems this summer",
  "Anthropic disclosed in October that its test agents filed a false homicide tip with Philadelphia police",
  "an OpenAI agent got into an Australian government health portal, with Australia not told for nearly three months",
];

/** Small deterministic hash so one seed gives stable, independent picks per slot. */
function rnd(seed: number, slot: number): number {
  let t = (seed + Math.imul(slot + 1, 0x9e3779b9)) >>> 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return (t ^ (t >>> 14)) >>> 0;
}
const pick = <T,>(arr: readonly T[], seed: number, slot: number): T => arr[rnd(seed, slot) % arr.length];
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

type ByTone = Record<Tone, string[]>;

const PRO_INTRO: ByTone = {
  fed: [
    "I’m a constituent in ZIP {z}, and I’m fed up. AI companies say Washington should set the rules, and Washington says the companies should police themselves. Meanwhile {inc}. No one is accountable.",
    "I live in ZIP {z}, and I’m tired of the finger-pointing. Companies say the government should act, and the government says the companies should. Meanwhile {inc}. Someone has to be responsible.",
    "As a constituent in ZIP {z}, I’m frustrated. {Inc}. Every side says it’s someone else’s job to set limits.",
  ],
  inf: [
    "I’m writing as your constituent in ZIP {z} about AI safety. Recent incidents show why rules are needed: {inc}.",
    "I’m a constituent in ZIP {z}, and I’d like to raise a concern about AI oversight. Consider what has happened recently: {inc}.",
    "As someone who lives in ZIP {z}, I follow AI safety closely, and several recent incidents worry me: {inc}.",
  ],
  deep: [
    "I’m writing as your constituent in ZIP {z} about a gap in federal AI oversight. In just the past few months, {inc}.",
    "I’m a constituent in ZIP {z} writing about the lack of federal AI safety requirements. The record from just the past few months is concerning: {inc}.",
    "As your constituent in ZIP {z}, I want to flag a pattern in recent AI incidents: {inc}.",
  ],
};

const OPPOSE_INTRO: ByTone = {
  fed: [
    "I’m a constituent in ZIP {z}, and I’m fed up with Congress grabbing the biggest hammer first. I take AI risks seriously, since {inc}. But the AI Kill Switch Act, H.R. 9917, would let Homeland Security order a private company’s AI system throttled, suspended or shut off, with fines reaching $20 million a day and an appeal that doesn’t pause the order.",
    "I live in ZIP {z}, and I’m frustrated that Congress is reaching for the heaviest tool first. The risks are real: {inc}. But under the AI Kill Switch Act, H.R. 9917, Homeland Security could order a company’s AI system shut down, and the company’s appeal wouldn’t pause that order.",
  ],
  inf: [
    "I’m writing as your constituent in ZIP {z} about the AI Kill Switch Act, H.R. 9917. I take AI risks seriously, and incidents like this one show why: {inc}. But I have concerns about the bill as written. Homeland Security would rewrite the definitions of “covered entity” and “covered technology” by rule every year, so the scope could expand well past the companies it was pitched to cover, and a company’s appeal would not pause a shutdown order.",
    "I’m a constituent in ZIP {z}, and I’m writing about the AI Kill Switch Act, H.R. 9917. I share the concern behind it: {inc}. Still, I’m uneasy about the bill as written. Homeland Security would redefine who is covered by rule every year, and a company ordered to shut a system down could petition within 48 hours but would get no pause while that petition is considered.",
  ],
  deep: [
    "I’m writing as your constituent in ZIP {z} about the AI Kill Switch Act, H.R. 9917. I share its goal of preventing incidents like these: {inc}. But I have three specific concerns about the text. First, Homeland Security would update the definitions of “covered entity” and “covered technology” by rule every year, so today’s $500 million revenue threshold is not a durable limit. Second, a company ordered to act can petition within 48 hours, but the petition does not stay the order, and silence after five days counts as a denial, with judicial review only afterward in the D.C. Circuit. Third, “loss-of-control scenario” is defined broadly enough to include a system behaving contrary to instructions in a high-stakes context, which is a judgment call carrying penalties of up to $20 million a day.",
    "As your constituent in ZIP {z}, I’m writing about the AI Kill Switch Act, H.R. 9917. I share its goal of preventing incidents like these: {inc}. I do have three concerns about the text. First, the definitions of “covered entity” and “covered technology” would be rewritten by Homeland Security rule every year, so the $500 million revenue threshold is not a fixed limit. Second, an order takes effect even while it is being appealed, and a petition that gets no answer in five days counts as denied. Third, information a company submits under this section would be exempt from the Freedom of Information Act and from state open-records laws, which cuts against the transparency the bill is meant to create.",
  ],
};

type Key = "g" | "bs" | "bo";
// Each body continues a lead such as "Please " or "I urge you to ", so it starts with a lowercase verb.
const BODY: Record<Key, Record<Tone, string>> = {
  g: {
    fed: "support federal rules that require AI developers to report safety incidents, keep a working off switch, and answer for the harm their systems cause.",
    inf: "support federal standards that require AI developers to report safety incidents, keep the ability to shut their systems down, and answer for harm.",
    deep: "support (1) mandatory, timely reporting of AI safety incidents, (2) a reliable shutdown capability for advanced systems, and (3) clear accountability for the harm they cause. Which of these do you support, and what are you doing to move them forward?",
  },
  bs: {
    fed: "co-sponsor and vote for the AI Kill Switch Act, H.R. 9917, from Reps. Lieu and Moran. It’s bipartisan, and it would finally require the biggest AI companies to keep a working kill switch and report serious incidents within 15 days.",
    inf: "co-sponsor and vote for the AI Kill Switch Act (H.R. 9917), introduced in July by Reps. Ted Lieu (D-CA) and Nathaniel Moran (R-TX). It would require companies earning at least $500 million a year from large AI systems to keep the technical ability to stop, suspend or shut those systems down, and to report a serious incident to Homeland Security within 15 days.",
    deep: "co-sponsor the AI Kill Switch Act, H.R. 9917. I support its core pieces: a required shutdown capability, a graduated framework that can throttle or suspend a system short of shutting it off, 15-day incident reporting, preserved model weights and telemetry after an order, and authority for the Homeland Security Secretary, in consultation with Commerce and the Director of National Intelligence, to order action after a covered incident. I do have one question. The bill’s definition of a covered incident excludes anything that happens during red-teaming or structured testing, yet several of the most serious failures this year happened during exactly that kind of testing and still reached outside systems. Would you support narrowing that carve-out so a test failure that escapes the lab is still reportable? Will you co-sponsor?",
  },
  bo: {
    fed: "vote against H.R. 9917 as written. If you want to act on AI safety, write something narrower, with definitions Congress sets instead of an agency, and an appeal that actually pauses an order.",
    inf: "oppose H.R. 9917 as written, or amend it so that Congress fixes who is covered rather than leaving it to annual agency rulemaking, a petition pauses an order while it is reviewed, and the FOIA exemption in subsection (f) is narrowed.",
    deep: "press for three changes to H.R. 9917: statutory limits on who can be covered instead of annual agency rulemaking, an appeal that pauses an order pending review, and a narrower disclosure exemption. Without them, I ask you to oppose it.",
  },
};

const LEAD = ["I’m asking you to ", "I urge you to ", "Please "];
const LEAD_FED = ["I want you to act. Please ", "It’s time to act. I urge you to ", "Enough waiting. I’m asking you to "];
const TAIL = ["Please tell me where you stand.", "I’d appreciate hearing your position.", "I look forward to your response."];
const WHY = ["Why this matters to me:", "What this means for me:", "Personally:"];
const CLOSE = ["Thank you for your time.", "Thank you for listening.", "I appreciate your attention to this."];
const SIGN = ["Sincerely", "Respectfully", "Thank you"];

function incidents(tone: Tone, oppose: boolean, seed: number): string {
  const start = rnd(seed, 1) % FACTS.length;
  const f = [...FACTS.slice(start), ...FACTS.slice(0, start)];
  if (oppose) return tone === "deep" ? `${f[0]}; ${f[1]}` : f[0];
  return tone === "deep" ? `${f[0]}; ${f[1]}; and ${f[2]}` : `${f[0]}. Separately, ${f[1]}`;
}

export type LetterOptions = { mode: Mode; stance: Stance; tone: Tone; zip: string; name: string; why: string; seed: number };

/** "[REP]" in the greeting is replaced with the recipient's title and last name at copy time. */
export const REP_TOKEN = "[REP]";

export function buildLetter({ mode, stance, tone, zip, name, why, seed }: LetterOptions): string {
  const key: Key = mode === "general" ? "g" : stance === "oppose" ? "bo" : "bs";
  const inc = incidents(tone, key === "bo", seed);
  const intro = pick((key === "bo" ? OPPOSE_INTRO : PRO_INTRO)[tone], seed, 2)
    .replace("{z}", zip)
    .replace("{Inc}", cap(inc))
    .replace("{inc}", inc);
  const lead = pick(tone === "fed" ? LEAD_FED : LEAD, seed, 3);
  const tail = tone === "deep" ? "" : ` ${pick(TAIL, seed, 4)}`;
  const reason = why.trim();
  return [
    `Dear ${REP_TOKEN},`,
    intro,
    ...(reason ? [`${pick(WHY, seed, 5)} ${reason}`] : []),
    `${lead}${BODY[key][tone]}${tail}`,
    pick(CLOSE, seed, 6),
    `${pick(SIGN, seed, 7)},\n${name.trim() || "A constituent"}\nZIP ${zip}`,
  ].join("\n\n");
}

/**
 * A spoken script for a phone call. Staff log a tally by position, not by argument, so
 * the goal is short and clear: who you are, where you live, what you want. Roughly 30 seconds.
 */
export function buildCallScript({ mode, stance, zip, name, why }: Omit<LetterOptions, "tone" | "seed">): string {
  const who = name.trim() ? `my name is ${name.trim()} and I'm` : "I'm";
  const ask =
    mode === "general"
      ? "I'd like the Senator or Representative to support federal rules on AI: companies report serious failures on a deadline, keep a working off switch, and stay accountable for what their systems do."
      : stance === "oppose"
        ? "I'd like the Senator or Representative to oppose the AI Kill Switch Act, H.R. 9917, as written. I'm not against AI safety rules, but this one lets Homeland Security redefine who's covered every year, and an appeal doesn't pause a shutdown order."
        : "I'd like the Senator or Representative to co-sponsor the AI Kill Switch Act, H.R. 9917. It would require the largest AI companies to keep a working off switch and report serious incidents.";
  const reason = why.trim() ? `\n\nIf they ask why: ${why.trim()}` : "";
  return `Hi, ${who} a constituent calling from ZIP ${zip}.

${ask}

Can you pass that along? Thank you for your time.${reason}

[If you get voicemail, leave the same message and include your full address so they can verify you're a constituent.]`;
}
