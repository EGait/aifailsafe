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
];

export const byStage = (s: Stage | "all") => (s === "all" ? BREAKTHROUGHS : BREAKTHROUGHS.filter((b) => b.stage === s));
export const stageMeta = (s: Stage) => STAGES.find((x) => x.id === s)!;
