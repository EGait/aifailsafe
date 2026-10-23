// What AI has actually delivered. Same sourcing bar as the incident log: primary sources
// first, major outlets second, and an honest label on how far along each one really is.
//
// The hype problem is worse here than on the incident side, so `stage` is doing real work.
// "Deployed" means it is in use. "Trial" means measured in people or production, but not
// yet routine. "Research" means a published result that has not been applied at scale.

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

export const BREAKTHROUGHS: Breakthrough[] = [
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
    caveat: "Phase 2a is early. No AI-discovered drug has yet cleared Phase 3, and most candidates fail at roughly the same rate as conventionally discovered ones.",
    sources: [
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
];

export const byStage = (s: Stage | "all") => (s === "all" ? BREAKTHROUGHS : BREAKTHROUGHS.filter((b) => b.stage === s));
export const stageMeta = (s: Stage) => STAGES.find((x) => x.id === s)!;
