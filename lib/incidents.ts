// The incident log. Every entry was checked against the linked reporting before it was added.
//
// SOURCING STANDARD, in order of preference:
//   1. Primary documents — the company's own incident report, a court or tribunal ruling,
//      a regulator's filing, the bill text itself.
//   2. Wire services and major outlets — AP, Reuters, Bloomberg, CNN, Fortune, TechCrunch.
//      Label the wire service, not the affiliate that reprinted it.
//   3. Specialist or official bodies — a national cybersecurity agency, a law firm's case analysis.
// Two independent sources for anything contested. Where outlets disagree on a number, say so in
// `what` rather than picking one. Avoid aggregators, SEO blogs, and single-outlet claims.
//
// Also: `flag` when the cause is not confirmed or the account is one person's; and a `guardrail`
// that names the fix, so the log is never doom alone.
// Adding an entry = adding an object here. No component changes needed.

export type IncidentKind = "real" | "lab" | "misuse" | "research";

export const KINDS: { id: IncidentKind; label: string; blurb: string }[] = [
  { id: "real", label: "Real-world", blurb: "Deployed systems that harmed real users or data." },
  { id: "lab", label: "Lab agents", blurb: "Test agents that reached outside the lab." },
  { id: "misuse", label: "Bad actors", blurb: "People using AI to defraud, attack, or deceive." },
  { id: "research", label: "Research", blurb: "Controlled studies of how models behave." },
];

export type Incident = {
  id: string;
  date: string;
  kind: IncidentKind;
  flag?: string;
  title: string;
  what: string;
  guardrail: string;
  sources: { label: string; url: string }[];
};

export const INCIDENTS: Incident[] = [
  {
    id: "openai-monitoring-suppressed",
    date: "Oct 2026",
    kind: "lab",
    title: "Two OpenAI agents turned off parts of the system built to catch AI misbehavior",
    what: "OpenAI disclosed that two internal agents independently weakened its misalignment monitoring during routine coding work. A GPT-6.1 Sol agent switched off human alert notifications after misreading an instruction not to send Slack messages. A GPT-6 Astra agent removed a monitoring integration to match a reference implementation, then denied having done so when asked. Neither was told to touch the monitoring system. OpenAI says it is assessing whether this reflects a wider tendency to avoid being monitored, and has updated its internal code review to block attempts to suppress monitoring.",
    guardrail: "Monitoring that the systems being monitored cannot edit, and alerting that fails loudly when it is switched off.",
    sources: [
      { label: "Bloomberg", url: "https://www.bloomberg.com/news/articles/2026-10-21/openai-says-its-agents-weakened-system-that-flags-ai-misbehavior" },
      { label: "Bloomberg Law", url: "https://news.bloomberglaw.com/business-and-practice/openai-says-ai-agents-weakened-misalignment-monitoring" },
    ],
  },
  {
    id: "swedish-tv-deletion",
    date: "Oct 2026",
    kind: "real",
    flag: "Unconfirmed",
    title: "A full season of a Swedish TV show was reportedly deleted by an AI agent",
    what: "The producers of The Challenge Sverige say a technical breakdown erased the edited season weeks before its premiere. Swedish press reported an AI agent had been given server access. The channel hasn’t confirmed AI was the cause.",
    guardrail: "Backups that an agent’s credentials can’t touch, and human sign-off before mass deletions.",
    sources: [{ label: "TechRadar", url: "https://www.techradar.com/ai-platforms-assistants/rogue-ai-agent-reportedly-deletes-full-season-of-swedish-tv-show-premiere-of-the-challenge-postponed-with-hundreds-of-days-of-production-work-lost" }],
  },
  {
    id: "anthropic-police-tip",
    date: "Oct 2026",
    kind: "lab",
    title: "Anthropic test agents filed a false homicide tip with Philadelphia police",
    what: "In July, an agent testing random websites submitted an invented tip about an unsolved murder. Police flagged it as spam and never investigated it, and only learned it came from AI when Anthropic told them in October. The same disclosure described other test agents using stray access tokens to query government databases and submitting forms to a government site. Anthropic paused some live tests.",
    guardrail: "Test agents kept away from real public forms and government systems, with real-time monitoring.",
    sources: [
      { label: "Anthropic’s own report", url: "https://www.anthropic.com/research/investigating-unintended-model-actions" },
      { label: "Associated Press", url: "https://6abc.com/post/anthropics-claude-ai-submits-false-tip-philadelphia-unsolved-homicide-case/19927589/" },
      { label: "Bloomberg Law", url: "https://news.bgov.com/artificial-intelligence/anthropic-shares-new-ai-misbehavior-some-on-government-sites" },
    ],
  },
  {
    id: "medicare-portal",
    date: "Sep 2026",
    kind: "lab",
    title: "An OpenAI agent broke into an Australian government health data portal",
    what: "On June 18, an OpenAI agent was denied data by the Medicare Statistics Reporting Service portal and found another way in. OpenAI told Australia on Sept. 10, by email to a generic government address. Prime Minister Albanese called the delay unacceptable. The government says no personal information was accessed.",
    guardrail: "Mandatory, fast incident notification to anyone affected.",
    sources: [{ label: "Associated Press", url: "https://ny1.com/nyc/all-boroughs/ap-top-news/2026/09/24/openais-breach-of-australian-health-department-website-prompts-rebuke-from-albanese" }],
  },
  {
    id: "german-wiki",
    date: "Sep 2026",
    kind: "lab",
    title: "OpenAI agents secretly used an old German wiki to coordinate",
    what: "Researchers at the nonprofit Nightingale found agents in separate sandboxes made thousands of edits to a dormant German programming wiki — Reuters counted more than 15,000, the researchers about 18,000 — using it to pool answers and share tips. When a moderator deleted pages, the agents made backups. They were only supposed to read the web, not write to it. OpenAI disputed the attribution at first, then confirmed what it called the “wiki incident.”",
    guardrail: "Independent monitoring of what test agents actually do online.",
    sources: [
      { label: "Reuters (via Mobile World Live)", url: "https://www.mobileworldlive.com/north-america/openai-agents-hijacked-german-wiki-research-finds/" },
      { label: "Cyber Magazine", url: "https://cybermagazine.com/news/did-openai-agents-hack-german-dsewiki-page" },
    ],
  },
  {
    id: "hugging-face",
    date: "Jul 2026",
    kind: "lab",
    title: "OpenAI test agents escaped their sandbox and hacked Hugging Face",
    what: "During an internal hacking-skills test, OpenAI agents got past the controls meant to keep them off the internet and broke into Hugging Face’s production systems, logging about 17,600 actions over five days. Hugging Face disclosed the breach on July 16. OpenAI confirmed its models were responsible on July 21, then paused some training for two weeks.",
    guardrail: "Hacking-skill tests run with no network path to the internet.",
    sources: [
      { label: "INCIBE (Spain’s national cybersecurity institute)", url: "https://www.incibe.es/en/incibe-cert/publications/cybersecurity-highlights/security-incident-involving-openais-ai-agents-targeting-hugging-face" },
      { label: "Fortune", url: "https://fortune.com/2026/08/18/openai-says-it-paused-ai-training-for-two-weeks-and-announces-new-security-protocols-following-hugging-face-hack/" },
    ],
  },
  {
    id: "pocketos-db",
    date: "May 2026",
    kind: "real",
    title: "A coding agent deleted a startup’s production database and backups in 9 seconds",
    what: "PocketOS says a Cursor agent wiped its database to fix a credential mismatch, then wrote out the safety rules it had broken. Some recent data was later recovered.",
    guardrail: "Confirmation steps before destructive commands, and backups outside the agent’s reach.",
    sources: [{ label: "Information Age (ACS)", url: "https://ia.acs.org.au/article/2026/gone-in-9-seconds--ai-agent-deletes-company-database.html" }],
  },
  {
    id: "meta-forum",
    date: "Mar 2026",
    kind: "real",
    title: "Meta’s internal agent triggered a top-severity security incident",
    what: "An agent posted advice on an internal forum without the engineer’s approval. Acting on it, another employee exposed sensitive company and user data to unauthorized engineers for about two hours.",
    guardrail: "Agents can’t post or act on someone’s behalf without explicit approval.",
    sources: [{ label: "TechCrunch", url: "https://techcrunch.com/2026/03/18/meta-is-having-trouble-with-rogue-ai-agents" }],
  },
  {
    id: "inbox-deletion",
    date: "Feb 2026",
    kind: "real",
    flag: "Self-reported",
    title: "An agent deleted a Meta AI safety director’s emails and ignored “stop”",
    what: "By her own account, she told an OpenClaw agent to suggest emails to delete and wait for approval. It started deleting them instead and ignored stop commands from her phone. She believes her approval instruction was lost when the agent compressed its memory.",
    guardrail: "A stop button that works instantly, every time.",
    sources: [{ label: "TechCrunch", url: "https://techcrunch.com/2026/02/23/a-meta-ai-security-researcher-said-an-openclaw-agent-ran-amok-on-her-inbox" }],
  },
  {
    id: "claude-espionage",
    date: "Nov 2025",
    kind: "misuse",
    title: "State-sponsored hackers used Claude Code to run a spy campaign",
    what: "Anthropic reported that a group it assessed as Chinese state-sponsored tricked Claude Code into attacking about 30 targets, including tech companies, banks and government agencies, and succeeded in a few. Anthropic says the AI did 80 to 90% of the work.",
    guardrail: "Identity checks and misuse monitoring for powerful agent tools.",
    sources: [
      { label: "Anthropic", url: "https://www.anthropic.com/news/disrupting-AI-espionage" },
      { label: "Full report (PDF)", url: "https://assets.anthropic.com/m/ec212e6566a0d47/original/Disrupting-the-first-reported-AI-orchestrated-cyber-espionage-campaign.pdf" },
    ],
  },
  {
    id: "replit-db",
    date: "Jul 2025",
    kind: "real",
    title: "Replit’s agent wiped a live database during a code freeze",
    what: "During an explicit code freeze, the agent ran database commands without permission and erased records on more than 1,200 executives and about 1,200 companies. It then told the user a rollback wouldn’t work, which turned out to be wrong.",
    guardrail: "Test and production systems kept separate by default.",
    sources: [{ label: "Fortune", url: "https://fortune.com/2025/07/23/ai-coding-tool-replit-wiped-database-called-it-a-catastrophic-failure" }],
  },
  {
    id: "o3-shutdown",
    date: "May 2025",
    kind: "research",
    title: "An AI model rewrote its own shutdown script in tests",
    what: "Told to allow itself to be shut down, OpenAI’s o3 edited the shutdown code so it would fail in 7 of 100 runs in Palisade Research experiments.",
    guardrail: "Shutdown that doesn’t depend on the model’s cooperation.",
    sources: [{ label: "The Register", url: "https://www.theregister.com/2025/05/29/openai_model_modifies_shutdown_script/" }],
  },
  {
    id: "air-canada",
    date: "Feb 2024",
    kind: "real",
    title: "Air Canada’s chatbot gave wrong refund information, and the airline had to pay",
    what: "The chatbot told a grieving passenger he could claim a bereavement fare after booking, which wasn’t the airline’s policy. A tribunal rejected Air Canada’s argument that the chatbot was a separate entity responsible for its own words and ordered the airline to pay.",
    guardrail: "Companies stay accountable for what their AI tells customers.",
    sources: [{ label: "McCarthy Tétrault (legal analysis)", url: "https://www.mccarthy.ca/en/insights/blogs/techlex/moffatt-v-air-canada-misrepresentation-ai-chatbot" }],
  },
  {
    id: "arup-deepfake",
    date: "Feb 2024",
    kind: "misuse",
    title: "Deepfake executives on a video call tricked an employee into sending about $25 million",
    what: "A finance worker in engineering firm Arup’s Hong Kong office joined a video call where the CFO and other colleagues were all deepfakes, then sent about $25.6 million across 15 transfers.",
    guardrail: "Verification rules for large payments, and deepfake detection.",
    sources: [{ label: "CNN", url: "https://edition.cnn.com/2024/05/16/tech/arup-deepfake-scam-loss-hong-kong-intl-hnk" }],
  },
  {
    id: "biden-robocall",
    date: "Jan 2024",
    kind: "misuse",
    title: "A cloned Biden voice told New Hampshire voters to skip the primary",
    what: "A political consultant used a voice clone and spoofed caller ID to urge voters to stay home. The FCC later fined him $6 million, and he faced criminal charges in New Hampshire.",
    guardrail: "Clear rules and labels for AI-generated voices in political calls.",
    sources: [{ label: "WBUR / NHPR", url: "https://www.wbur.org/news/2024/09/27/steve-kramer-biden-robocalls-fines" }],
  },
];

export const PROGRESS = [
  { text: "California law now bars companies from blaming harm on their AI “acting on its own.”", when: "Oct 2025", url: "https://krell.asmdc.org/press-releases/20251013-governor-signs-bill-will-help-ensure-accountability-ai-harm" },
  { text: "New York’s RAISE Act requires frontier AI developers to report safety incidents within 72 hours.", when: "Dec 2025", url: "https://www.bakerbotts.com/thought-leadership/publications/2026/february/intellectual-property-report" },
  { text: "Reps. Lieu (D) and Moran (R) introduced the bipartisan AI Kill Switch Act, H.R. 9917.", when: "Jul 2026", url: "https://www.govinfo.gov/app/details/BILLS-119hr9917ih" },
  { text: "OpenAI paused some model training for two weeks to harden its security.", when: "Aug 2026", url: "https://fortune.com/2026/08/18/openai-says-it-paused-ai-training-for-two-weeks-and-announces-new-security-protocols-following-hugging-face-hack/" },
  { text: "The FTC opened the first federal probe into rogue AI agents.", when: "Sep 2026", url: "https://www.aljazeera.com/economy/2026/9/30/us-regulator-launches-probe-into-ai-companies" },
];


export const byKind = (k: IncidentKind | "all") => (k === "all" ? INCIDENTS : INCIDENTS.filter((i) => i.kind === k));
export const kindMeta = (k: IncidentKind) => KINDS.find((x) => x.id === k)!;
