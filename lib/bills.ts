// Bill pages. Everything here was read off the bill text itself (linked as `textUrl`), not a summary.
// `forCase` and `againstCase` are the strongest version of each side, in that side's own terms.
// Status goes stale — re-check before each deploy.

export type Bill = {
  slug: string;
  number: string;
  name: string;
  sponsors: string;
  introduced: string;
  status: string;
  statusChecked: string;
  summary: string;
  does: string[];
  forCase: string[];
  againstCase: string[];
  gap?: string;
  relatedIncidents: string[];
  textUrl: string;
  trackUrl: string;
};

export const BILLS: Bill[] = [
  {
    slug: "ai-kill-switch-act",
    number: "H.R. 9917",
    name: "AI Kill Switch Act",
    sponsors: "Rep. Ted Lieu (D-CA) and Rep. Nathaniel Moran (R-TX)",
    introduced: "July 23, 2026",
    status: "In the House Homeland Security Committee, referred to the Subcommittee on Cybersecurity and Infrastructure Protection",
    statusChecked: "October 2026",
    summary:
      "Companies that make at least $500 million a year from very large AI systems would have to keep the technical ability to throttle, suspend or shut those systems down, and report a serious incident to Homeland Security within 15 days.",
    does: [
      "Covers companies earning $500M+ a year from AI systems that cost more than $100M of computing power to build. Personal, academic and non-commercial use is exempt.",
      "Requires the ability to stop a system’s output, cut off a user, suspend risky accounts, and shut the system down.",
      "Requires a report to Homeland Security within 15 days of a covered incident.",
      "After a covered incident, lets the Homeland Security Secretary (through the CISA Director, consulting Commerce and the DNI) order action proportionate to it.",
      "Requires preserving model weights and telemetry after an order, notifying users, and a report to Congress.",
      "Sets penalties up to $2 million a day, or $20 million a day for violating an emergency order.",
      "Defines a covered incident as: sabotaging a shutdown instruction, unintended behavior causing 10+ deaths or $100M+ in damage, hiding a capability from monitoring, or a loss-of-control scenario.",
    ],
    forCase: [
      "No federal rule requires an off switch today, and the past year shows systems acting outside their instructions.",
      "It is bipartisan, and the scope is capped at the largest developers rather than every startup.",
      "The graduated framework can throttle or suspend a system instead of only shutting it off.",
      "Preserved model weights and telemetry mean the public can eventually learn what went wrong.",
    ],
    againstCase: [
      "Homeland Security would rewrite the definitions of “covered entity” and “covered technology” by rule every year, so the $500M threshold is not a durable limit.",
      "A company can petition within 48 hours, but the petition doesn’t pause the order, and silence after five days counts as a denial.",
      "“Loss-of-control scenario” includes a system behaving contrary to instructions in a high-stakes context, which is a judgment call carrying penalties up to $20M a day.",
      "Information companies submit would be exempt from the Freedom of Information Act and state open-records laws.",
    ],
    gap: "A covered incident explicitly excludes anything that happens during red-teaming or other structured testing. Several of this year’s most serious failures happened during exactly that kind of testing and still reached outside systems, so this bill may not cover them.",
    relatedIncidents: ["hugging-face", "medicare-portal", "german-wiki", "o3-shutdown"],
    textUrl: "https://www.govinfo.gov/content/pkg/BILLS-119hr9917ih/html/BILLS-119hr9917ih.htm",
    trackUrl: "https://www.congress.gov/bill/119th-congress/house-bill/9917",
  },
];

export const getBill = (slug: string) => BILLS.find((b) => b.slug === slug);
