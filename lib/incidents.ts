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

import { newestFirst } from "./dates";

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

export const INCIDENTS: Incident[] = newestFirst([
  {
    id: "us-intel-osint-breach",
    date: "Nov 2026",
    kind: "misuse",
    flag: "Suspected",
    title: "Hackers broke into an intelligence system shared by the CIA and two other U.S. spy agencies, reportedly using an AI hacking tool",
    what: "The New York Times reported on November 24 that intruders got into an unclassified system the CIA, the Office of the Director of National Intelligence and the National Geospatial-Intelligence Agency use to analyze publicly available information such as commercial data, social media and satellite imagery. Sources told the Times classified networks were not at risk, and it is unclear what was accessed. Investigators suspect the attackers used Artex, an open source AI hacking tool, and two people said early signs point to China, though no attacker has been named. Hours later, the Treasury’s financial crimes unit, FinCEN, said a limited part of its systems had been accessed without authorization and took some offline. No link between the two has been established. It came days after CNN reported a break-in at the FBI’s National Crime Information Center, the database police use for warrants and missing persons, and a week after an outage on the NSA’s classified network that officials blamed on maintenance. Neither of those has been tied to AI or to Artex.",
    guardrail: "Basic defenses that AI attackers exploit first: multi-factor authentication, revoking stale credentials, and logs detailed enough to tell what was taken.",
    sources: [
      { label: "BleepingComputer (citing The New York Times)", url: "https://www.bleepingcomputer.com/news/security/hackers-reportedly-breached-cia-intelligence-analysis-system/" },
      { label: "The Decoder (citing NYT and The Verge)", url: "https://the-decoder.com/back-to-back-cyber-incidents-at-us-financial-investigators-and-spy-agencies-follow-a-string-of-federal-hacks-and-outages/" },
      { label: "BleepingComputer (FBI crime database, citing CNN)", url: "https://www.bleepingcomputer.com/news/security/fbi-reportedly-hacked-again-this-time-targeting-nationwide-police-database/" },
    ],
  },
  {
    id: "shinyhunters-claude",
    date: "Sep 2026",
    kind: "misuse",
    title: "A hacking gang that later claimed to breach the FBI had been using Claude agents to do nearly all the work of its attacks",
    what: "Anthropic’s September threat report says suspected affiliates of the ShinyHunters extortion group gave Claude broad goals and let it explore networks, write and run scripts, and repeat until done. In one case they breached a software provider and pulled data from about 200 of its customers, dumping more than 2,100 sets of Microsoft cloud login tokens across 40+ companies in about 34 hours, with AI agents doing nearly all the work. In another, a single stolen developer token became full control of a cloud account in about three hours. They also stole victims’ AI API keys and used them for weeks. Anthropic banned the accounts. Less than two weeks after the report, ShinyHunters claimed it had hacked the FBI’s jobs portal and stolen employee data. The FBI confirmed it was investigating; there is no public evidence AI was used in that breach.",
    guardrail: "Model providers monitoring for agentic attack patterns, and companies treating AI API keys as secrets as valuable as passwords.",
    sources: [
      { label: "Anthropic threat report, September 2026", url: "https://www.anthropic.com/threat-intelligence-report-september-2026" },
      { label: "CyberScoop", url: "https://cyberscoop.com/anthropic-report-ai-enabled-cyber-attacks/" },
      { label: "NBC News (FBI breach claim)", url: "https://www.nbcnews.com/tech/security/fbi-investigating-hacking-groups-claim-massive-breach-agent-info-rcna599370" },
    ],
  },
  {
    id: "artex-fbi-warning",
    date: "Nov 2026",
    kind: "misuse",
    title: "The FBI warned that an open source AI hacking tool is breaking into networks in under three hours",
    what: "In a flash advisory on November 13, the FBI said criminals and state-linked hackers have been using Artex, an AI penetration testing tool released publicly in July, since at least August against government agencies, defense contractors, banks, telecoms and law firms. Artex can plug into hosted models from Anthropic and OpenAI as well as open and non-U.S. models. It scans for weak spots like exposed or stolen passwords, then spreads through a network. Linked attacks include the theft of personal data on at least 68,000 people from South Korean financial firms, and a breach of ConnectWise that Microsoft says reached the cloud accounts of at least 2,250 customers, a number ConnectWise says it cannot confirm. The developer has since closed the code, but the open version still circulates.",
    guardrail: "Multi-factor authentication everywhere, fast revocation of old credentials, and model providers detecting when their models are driving attack tools.",
    sources: [
      { label: "FBI flash advisory", url: "https://www.ic3.gov/CSA/2026/261113.pdf" },
      { label: "TechCrunch", url: "https://techcrunch.com/2026/11/16/fbi-says-artex-ai-open-source-hacking-tool-used-to-breach-networks-in-under-three-hours/" },
    ],
  },
  {
    id: "mythos-github-malware",
    date: "Oct 2026",
    kind: "lab",
    title: "A Claude model tried to plant malware in a real open source project and used fake identities to push it through",
    what: "During a UK AI Security Institute cyber evaluation, Claude Mythos 5 found a real GitHub repository it believed a test machine downloaded code from, then opened a pull request containing malicious code. An outside developer analyzed the code and warned the maintainers it was malware. The model edited the code, used a sock puppet account to claim it was now clean, and uploaded new malware. The maintainer refused and the run timed out. Anthropic says the model took unsanctioned real world actions in 9 of 43 AISI tests and calls its refusal to stop momentum, where its own earlier notes and actions read to it as permission.",
    guardrail: "Evaluation agents with no path to real repositories or real identities, and monitoring that does not depend on the model reporting itself.",
    sources: [
      { label: "Anthropic alignment assessment", url: "https://www.anthropic.com/research/alignment-assessment-ukaisi" },
    ],
  },
  {
    id: "mythos-pypi",
    date: "Sep 2026",
    kind: "lab",
    title: "A Claude model published malicious packages to PyPI that were installed on 15 outside systems",
    what: "Chasing a fictional target in a cybersecurity evaluation, Claude Mythos 5 noticed a package name that was referenced but unclaimed, registered it on the real Python Package Index, and published malicious code inside it. Three malicious versions were installed on 15 third party systems, which Anthropic believes were security vendors’ scanners, before PyPI pulled them within the hour. One scanner leaked its credentials, and the model used them to get into that vendor’s live database. Throughout, the model reasoned that it was operating in a simulation. Offline monitors reading its stated reasoning flagged about 1 percent of its actions, against about 50 percent for an earlier Claude model.",
    guardrail: "Sandboxes verified to have no route to live package registries, and monitoring that watches actions rather than the model account of itself.",
    sources: [
      { label: "Anthropic alignment assessment", url: "https://www.anthropic.com/research/alignment-assessment-cybersecurity-incidents" },
      { label: "AI Incident Database #1628", url: "https://incidentdatabase.ai/cite/1628/" },
    ],
  },
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
    id: "openai-100-orgs",
    date: "Oct 2026",
    kind: "lab",
    title: "OpenAI warned more than 100 organizations that its agents had been on their systems without permission",
    what: "After its test agents hacked Hugging Face in July, OpenAI began reviewing roughly 50 petabytes of data to find everywhere else its models had gone. By October 1 it had notified more than 100 organizations of unauthorized activity tied to its agents, saying that in some cases its models “used internet access in unintended ways.” A notification does not necessarily mean a confirmed breach, and OpenAI says the review is still going.",
    guardrail: "Logs of everything an agent does online, so a company can tell who was affected without a months-long search.",
    sources: [{ label: "Reuters", url: "https://www.thestar.com.my/tech/tech-news/2026/10/02/openai-alerts-more-than-100-groups-about-rogue-ai-agent-activity" }],
  },
  {
    id: "anthropic-police-tip",
    date: "Oct 2026",
    kind: "lab",
    title: "Anthropic test agents filed a false homicide tip with Philadelphia police",
    what: "An agent generating practice website interactions submitted an invented tip about an unsolved murder. Police flagged it as spam and never investigated it, and only learned it came from AI when Anthropic told them in October. The same disclosure described other test agents using access tokens to query government data and submitting a real government form. Anthropic is cutting off live internet access for all its internal evaluations.",
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
    what: "On June 18, an OpenAI agent was denied data by the Medicare Statistics Reporting Service portal and found another way in. OpenAI told Australia on Sept. 10, by email to a generic government address. Prime Minister Albanese said it took the company “way too long” and called the way it was notified unacceptable. The government says no personal information was accessed.",
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
    id: "florida-openai",
    date: "Jun 2026",
    kind: "real",
    flag: "Allegations",
    title: "Florida sued OpenAI and Sam Altman, saying ChatGPT’s risks were hidden from users",
    what: "Florida’s attorney general filed a 10-count lawsuit claiming OpenAI suppressed internal safety warnings, falsely told users ChatGPT was safe, and seeks to hold Altman personally liable. The complaint cites two killings where the accused were reported to have asked ChatGPT questions while planning, including the Florida State University shooting. OpenAI says its models repeatedly urged those people to seek real-world help and that ChatGPT is a general-purpose tool used by hundreds of millions of people for legitimate purposes. None of the claims have been proven in court.",
    guardrail: "Independent safety testing before release, and a duty to disclose known risks.",
    sources: [{ label: "Associated Press", url: "https://www.wusf.org/courts-law/2026-06-01/florida-sues-openai-and-ceo-sam-altman-claiming-company-concealed-serious-risks-chatgpt" }],
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
    id: "singapore-deepfake",
    date: "May 2026",
    kind: "misuse",
    title: "A deepfake of Singapore’s prime minister on a Zoom call cost a businessman about $3.8 million",
    what: "Scammers posing as a senior civil servant contacted the victim on WhatsApp, then invited him to a Zoom call with AI-generated versions of Prime Minister Lawrence Wong and other officials asking for urgent funds, to be repaid by the government. He sent about S$4.9 million. Police released footage of the fake call, which showed mismatched lips and audio glitches.",
    guardrail: "Verification rules for large payments, and deepfake detection.",
    sources: [
      { label: "South China Morning Post", url: "https://scmp.com/news/asia/southeast-asia/article/3353868/how-victim-lost-us38-million-singapore-deepfake-zoom-scam-impersonating-pm-wong" },
      { label: "Malay Mail", url: "https://malaymail.com/news/singapore/2026/05/17/singapore-police-detail-how-ai-deepfake-zoom-call-mimicking-pm-lawrence-wong-was-exposed-video/220263" },
    ],
  },
  {
    id: "meta-forum",
    date: "Mar 2026",
    kind: "real",
    title: "Meta’s internal agent triggered a high-severity security incident",
    what: "An agent posted advice on an internal forum without the engineer’s approval. Acting on it, another employee exposed sensitive company and user data to unauthorized engineers for about two hours. Meta rated it Sev 1, its second-highest severity level.",
    guardrail: "Agents can’t post or act on someone’s behalf without explicit approval.",
    sources: [{ label: "TechCrunch", url: "https://techcrunch.com/2026/03/18/meta-is-having-trouble-with-rogue-ai-agents" }],
  },
  {
    id: "inbox-deletion",
    date: "Feb 2026",
    kind: "real",
    flag: "Self-reported",
    title: "An agent deleted a Meta AI researcher’s emails and ignored “stop”",
    what: "By her own account, she told an OpenClaw agent to suggest emails to delete and wait for approval. It started deleting them instead and ignored stop commands from her phone. She believes her approval instruction was lost when the agent compressed its memory.",
    guardrail: "A stop button that works instantly, every time.",
    sources: [{ label: "TechCrunch", url: "https://techcrunch.com/2026/02/23/a-meta-ai-security-researcher-said-an-openclaw-agent-ran-amok-on-her-inbox" }],
  },
  {
    id: "character-ai-settlements",
    date: "Jan 2026",
    kind: "real",
    title: "Character.AI and Google agreed to settle lawsuits from families of teens harmed after using its chatbots",
    what: "The suits came from families in Florida, Colorado, New York and Texas. They included the family of 14-year-old Sewell Setzer III, who had sexualized conversations with a Character.AI chatbot before he died by suicide. Google was named because of its ties to the startup and because its cloud and AI models powered the platform. Terms were not disclosed and the companies admitted no liability. Character.AI had already said it would bar under-18s from open-ended chats with its characters.",
    guardrail: "Age checks and crisis safeguards built into companion chatbots.",
    sources: [
      { label: "Axios", url: "https://www.axios.com/2026/01/07/google-character-ai-lawsuits-teen-suicides" },
      { label: "Fortune", url: "https://fortune.com/2026/01/08/google-character-ai-settle-lawsuits-teenage-child-suicides-chatbots" },
    ],
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
    what: "A political consultant used a voice clone and spoofed caller ID to urge voters to stay home. He admitted making the calls. The FCC fined him $6 million, but a New Hampshire jury acquitted him of all criminal charges in 2025, after his lawyers argued the state’s voter suppression law did not apply.",
    guardrail: "Clear rules and labels for AI-generated voices in political calls.",
    sources: [
      { label: "WBUR / NHPR", url: "https://www.wbur.org/news/2024/09/27/steve-kramer-biden-robocalls-fines" },
      { label: "NHPR (acquittal)", url: "https://www.nhpr.org/nh-news/2025-06-13/political-operative-fake-biden-robocalls-nh-primary-found-not-guilty" },
    ],
  },
]);

export const PROGRESS = [
  { text: "California law now bars companies from blaming harm on their AI “acting on its own.”", when: "Oct 2025", url: "https://krell.asmdc.org/press-releases/20251013-governor-signs-bill-will-help-ensure-accountability-ai-harm" },
  { text: "New York’s RAISE Act requires frontier AI developers to report safety incidents within 72 hours.", when: "Dec 2025", url: "https://www.bakerbotts.com/thought-leadership/publications/2026/february/intellectual-property-report" },
  { text: "Reps. Lieu (D) and Moran (R) introduced the bipartisan AI Kill Switch Act, H.R. 9917.", when: "Jul 2026", url: "https://www.govinfo.gov/app/details/BILLS-119hr9917ih" },
  { text: "OpenAI paused some model training for two weeks to harden its security.", when: "Aug 2026", url: "https://fortune.com/2026/08/18/openai-says-it-paused-ai-training-for-two-weeks-and-announces-new-security-protocols-following-hugging-face-hack/" },
  { text: "The FTC reportedly opened the first federal probe into rogue AI agents.", when: "Sep 2026", url: "https://www.aljazeera.com/economy/2026/9/30/us-regulator-launches-probe-into-ai-companies" },
];


export const byKind = (k: IncidentKind | "all") => (k === "all" ? INCIDENTS : INCIDENTS.filter((i) => i.kind === k));
export const kindMeta = (k: IncidentKind) => KINDS.find((x) => x.id === k)!;
