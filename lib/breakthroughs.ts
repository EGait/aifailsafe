// What AI has actually delivered. Same sourcing bar as the incident log: primary sources
// first, major outlets second, and an honest label on how far along each one really is.
//
// The hype problem is worse here than on the incident side, so `stage` is doing real work.
// "Deployed" means it is in use. "Trial" means measured in people or production, but not
// yet routine. "Research" means a published result that has not been applied at scale.

import { newestFirst } from "./dates";

export type Stage = "deployed" | "trial" | "research";

export const STAGES: { id: Stage; label: string; blurb: string }[] = [
  { id: "deployed", label: "In use", blurb: "Running today, at scale, outside a study." },
  { id: "trial", label: "Tested in people", blurb: "Measured in a real trial. Promising, not yet routine." },
  { id: "research", label: "Research result", blurb: "Published and verified, not yet applied at scale." },
];

export type Breakthrough = {
  id: string;
  date: string;
  stage: Stage;
  field: string;
  title: string;
  what: string;
  caveat?: string;
  sources: { label: string; url: string }[];
};

export const BREAKTHROUGHS: Breakthrough[] = newestFirst([
  {
    id: "alphafold",
    date: "2024",
    stage: "deployed",
    field: "Biology",
    title: "AI predicted the shape of nearly every known protein",
    what: "AlphaFold solved a problem biologists had worked on for fifty years, predicting protein structures from their sequences. The database is free and has been used by millions of researchers. Demis Hassabis and John Jumper shared the 2024 Nobel Prize in Chemistry for it.",
    sources: [
      { label: "Nobel Prize", url: "https://www.nobelprize.org/prizes/chemistry/2024/summary/" },
    ],
  },
  {
    id: "masai-mammography",
    date: "2025",
    stage: "trial",
    field: "Medicine",
    title: "AI-supported breast screening found 29% more cancers",
    what: "In a randomized trial of more than 100,000 Swedish women, adding AI to mammogram screening detected 29% more cancers than standard double reading, without increasing false alarms, and cut radiologist workload substantially.",
    caveat: "One national screening programme. Results still need to hold up elsewhere, and longer follow-up is needed to show it saves lives.",
    sources: [
      { label: "The Lancet Digital Health (via PubMed)", url: "https://pubmed.ncbi.nlm.nih.gov/39904652/" },
    ],
  },
  {
    id: "graphcast",
    date: "2023",
    stage: "deployed",
    field: "Weather",
    title: "An AI weather model beat the best forecasting system in the world",
    what: "GraphCast produced more accurate ten-day forecasts than the European Centre's gold-standard system on about 90% of the variables tested, and it runs in under a minute on a single machine instead of hours on a supercomputer. It also spotted severe weather earlier, despite never being trained to look for it. The model is open source.",
    sources: [
      { label: "Science (via DeepMind)", url: "https://deepmind.google/blog/graphcast-ai-model-for-faster-and-more-accurate-global-weather-forecasting/" },
    ],
  },
  {
    id: "rentosertib",
    date: "2025",
    stage: "trial",
    field: "Medicine",
    title: "A drug designed by AI improved lung function in patients",
    what: "Rentosertib is the first known therapy where AI picked the biological target and generated the molecule. In a placebo-controlled Phase 2a trial of 71 patients with idiopathic pulmonary fibrosis, published in Nature Medicine, it met its safety endpoint and improved lung function by 98.4 mL over placebo.",
    caveat: "Phase 2a is early. In July 2026 it entered a Phase 3 trial of about 320 patients in China, which will run for a year. No AI-discovered drug has yet cleared Phase 3, and most candidates fail at roughly the same rate as conventionally discovered ones.",
    sources: [
      { label: "Insilico Medicine (Phase 3 start)", url: "https://insilico.com/news/xmjsn4l091-insilico-initiates-phase-iii-clinical-tr" },
      { label: "Nature Medicine (via Drug Discovery & Development)", url: "https://www.drugdiscoverytrends.com/insilicos-ai-designed-rentosertib-shows-promise-in-first-phase-2a-trial-results/" },
      { label: "AJMC", url: "https://www.ajmc.com/view/ai-derived-therapy-for-ipf-shows-potential-in-phase-2a-trial" },
    ],
  },
  {
    id: "flood-forecasting",
    date: "2024",
    stage: "deployed",
    field: "Disaster response",
    title: "AI flood warnings now reach 700 million people in 100 countries",
    what: "Google's flood model predicts river flooding up to seven days ahead and runs in places with few or no physical river gauges, which is where most of the world's flood-exposed population lives. Warnings appear in Search, Maps and Flood Hub. The underlying work was published in Nature.",
    caveat: "A warning only helps if it reaches people and they can act on it. Coverage is not the same as lives saved.",
    sources: [
      { label: "Google Crisis Response", url: "https://crisisresponse.google/floods" },
      { label: "Android Authority", url: "https://www.androidauthority.com/google-flood-detection-3498988/" },
    ],
  },
  {
    id: "abaucin",
    date: "2023",
    stage: "research",
    field: "Medicine",
    title: "AI found a new antibiotic for one of the world's most dangerous superbugs",
    what: "Researchers at McMaster and MIT used a machine learning model to screen chemical space for molecules that could kill Acinetobacter baumannii, which the World Health Organization lists among the most dangerous antibiotic-resistant bacteria. The result, abaucin, cleared infections in mice and killed samples taken from patients. It is narrow spectrum, so it spares the gut microbiome.",
    caveat: "Mice and lab samples, not people. An earlier AI-found antibiotic, halicin, has not reached human trials either.",
    sources: [
      { label: "Nature Chemical Biology (via McMaster)", url: "https://news.mcmaster.ca/artificial-intelligence-new-antibiotic-drug-resistant-pathogen-acinetobacter-baumannii/" },
    ],
  },
  {
    id: "vesuvius-scrolls",
    date: "2024",
    stage: "research",
    field: "History",
    title: "AI read a scroll that was buried by Mount Vesuvius in 79 AD",
    what: "About 1,800 scrolls from a villa in Herculaneum were carbonized by the eruption and were too fragile to unroll. The Vesuvius Challenge trained models to detect ink in 3D X-ray scans, letting researchers read the scrolls without touching them. Luke Farritor, then a computer science student at the University of Nebraska, recovered the first word. A team later decoded hundreds of words of previously unknown text and shared a $700,000 prize.",
    caveat: "A fraction of one scroll so far. Hundreds remain unread.",
    sources: [
      { label: "National Endowment for the Humanities", url: "https://www.neh.gov/news/words-mysterious-scroll-buried-mount-vesuvius-eruption-deciphered-first-time-after-2000-years" },
      { label: "Euronews", url: "https://www.euronews.com/culture/2024/02/07/ai-helps-decode-scrolls-destroyed-during-the-vesuvius-eruption" },
    ],
  },
  {
    id: "unit-distance",
    date: "2026",
    stage: "research",
    field: "Mathematics",
    title: "AI disproved a famous math conjecture that had stood since 1946",
    what: "Paul Erdős asked how many pairs of points on a flat plane can sit exactly one unit apart, and conjectured that the number grows only slightly faster than the number of points. Mathematicians spent nearly 80 years unable to prove it. In May 2026 a general-purpose OpenAI reasoning model produced a construction showing Erdős was wrong: points can be arranged to create far more equal distances than he predicted. Noga Alon, Melanie Wood and Thomas Bloom, who runs the Erdős Problems website, published remarks backing the result.",
    caveat: "The proof is on arXiv and has not yet been through journal peer review. People reviewed and rewrote the model's work. And in 2025 OpenAI had to retract a claim that its model solved ten Erdős problems, when the answers turned out to be already published.",
    sources: [
      { label: "Phys.org", url: "https://phys.org/news/2026-05-ai-major-breakthrough-math-problem.html" },
      { label: "TechCrunch", url: "https://techcrunch.com/2026/05/20/openai-claims-it-solved-an-80-year-old-math-problem-for-real-this-time/" },
    ],
  },
  {
    id: "hurricane-tracks",
    date: "2025",
    stage: "deployed",
    field: "Weather",
    title: "Hurricane forecasters now lean on an AI model that rivals their own track forecasts",
    what: "The U.S. National Hurricane Center has been using Google DeepMind's AI weather model alongside traditional physics-based models. In NHC's official review of the 2025 Atlantic season, it was the only model that beat the center's own track forecasts, doing slightly better from 12 to 72 hours out. On storm strength, which is harder to predict, NHC rated it the best model, roughly matching the official forecast.",
    caveat: "The margin was slight and only at shorter lead times, and the model was not running early in the season. NHC's forecasters still beat or matched it overall, using it as one input among many.",
    sources: [
      { label: "NHC 2025 Verification Report", url: "https://www.nhc.noaa.gov/verification/pdfs/Verification_2025.pdf" },
    ],
  },
  {
    id: "big-sleep",
    date: "2025",
    stage: "deployed",
    field: "Cybersecurity",
    title: "An AI agent found a hole in software on billions of devices before attackers could use it",
    what: "SQLite is a database built into nearly every phone, browser and operating system. In 2024, Big Sleep, an agent built by Google DeepMind and Project Zero, found an exploitable memory bug in it before the code shipped, the first public case of an AI finding a flaw like that in widely used software. In July 2025 it found another SQLite flaw that Google says was known only to attackers and at risk of being exploited. It was patched in version 3.50.2 before anyone was hit.",
    caveat: "The claim that attackers were about to use the bug comes from Google, which has not released the threat details, and independent reporters could not confirm it.",
    sources: [
      { label: "Google Project Zero", url: "https://projectzero.google/2024/10/from-naptime-to-big-sleep.html" },
      { label: "Google", url: "https://blog.google/innovation-and-ai/technology/safety-security/cybersecurity-updates-summer-2025/" },
      { label: "SecurityWeek", url: "https://www.securityweek.com/google-says-ai-agent-thwarted-exploitation-of-critical-vulnerability/" },
    ],
  },
  {
    id: "oss-fuzz-openssl",
    date: "2024",
    stage: "deployed",
    field: "Cybersecurity",
    title: "AI found a bug that had hidden in the internet's encryption library for about 20 years",
    what: "OpenSSL secures a large share of web traffic and is one of the most heavily tested pieces of code in the world. Google's OSS-Fuzz project used an AI model to write new automated tests, and those tests turned up 26 new vulnerabilities across open source projects, including CVE-2024-9143 in OpenSSL, which had likely been there for two decades. Human-written tests had run for hundreds of thousands of hours without catching it.",
    caveat: "The OpenSSL bug was rated low to moderate severity. The win is that AI reached code humans had not got around to testing, not that it found a catastrophic flaw.",
    sources: [
      { label: "Google Security Blog", url: "https://security.googleblog.com/2024/11/leveling-up-fuzzing-finding-more.html" },
      { label: "The Hacker News", url: "https://thehackernews.com/2024/11/googles-ai-powered-oss-fuzz-tool-finds.html" },
    ],
  },
  {
    id: "aixcc",
    date: "2025",
    stage: "trial",
    field: "Cybersecurity",
    title: "AI systems found and fixed security holes in real code on their own, for about $152 a task",
    what: "In DARPA's two-year AI Cyber Challenge, teams built systems that hunt for and patch vulnerabilities in open source software with no human help. At the final round at DEF CON in 2025, they found 54 of 63 planted vulnerabilities and patched 43. They also found 18 real, previously unknown bugs that nobody had planted. Team Atlanta won $4 million, and all seven finalist systems are being released as open source.",
    caveat: "A competition is a controlled setting. Of the 18 real bugs, only 11 got working patches, and none of the six found in C code were patched.",
    sources: [
      { label: "DARPA", url: "https://www.darpa.mil/news/2025/aixcc-results" },
      { label: "Infosecurity Magazine", url: "https://www.infosecurity-magazine.com/news/defcon-ai-cyber-challenge-winners/" },
    ],
  },
  {
    id: "ai-bug-hunters",
    date: "2025",
    stage: "deployed",
    field: "Cybersecurity",
    title: "Security researchers using AI are finding bugs the old tools missed",
    what: "Researcher Sean Heelan gave an AI model about 12,000 lines of the Linux kernel's file-sharing code and it found CVE-2025-37899, a previously unknown flaw that could let a remote attacker take over a machine. Separately, Joshua Rogers used AI scanning tools on curl, the program that moves data for billions of devices, and about 50 of his bug reports were fixed. curl's lead developer, Daniel Stenberg, called them \"actually truly awesome findings\" and said the tools catch problems that established tools do not.",
    caveat: "The same curl project has spent two years buried in fake, AI-generated bug reports. The difference is a skilled person checking the output before sending it. Most of the curl bugs were small.",
    sources: [
      { label: "Sean Heelan", url: "https://sean.heelan.io/2025/05/22/how-i-used-o3-to-find-cve-2025-37899-a-remote-zeroday-vulnerability-in-the-linux-kernels-smb-implementation/" },
      { label: "The Register", url: "https://www.theregister.com/2025/10/02/curl_project_swamped_with_ai/" },
    ],
  },
]);

export const byStage = (s: Stage | "all") => (s === "all" ? BREAKTHROUGHS : BREAKTHROUGHS.filter((b) => b.stage === s));
export const stageMeta = (s: Stage) => STAGES.find((x) => x.id === s)!;
