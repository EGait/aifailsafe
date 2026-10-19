// What AIFailSafe asks for. These are the site's spine: durable demands that outlive any one bill.
// A bill is evidence of whether Congress is acting on them, never the point itself.
// Each ask is written so a supporter and a skeptic can both tell exactly what is being requested.

export type Ask = {
  id: string;
  title: string;
  plain: string;
  why: string;
  status: string;
};

export const ASKS: Ask[] = [
  {
    id: "reporting",
    title: "Tell us when it goes wrong",
    plain: "When an AI system causes serious harm or escapes its operator’s control, the company reports it to a public authority on a deadline, not on its own timetable.",
    why: "Nearly every incident on our log was disclosed voluntarily, and some took months. Australia learned about a breach of a government health portal almost three months after it happened.",
    status: "Partly addressed. New York requires 72-hour reporting from frontier developers. There is no federal requirement.",
  },
  {
    id: "offswitch",
    title: "Keep a working off switch",
    plain: "Anyone running a powerful AI system keeps the proven ability to stop it, and that ability doesn’t depend on the system cooperating.",
    why: "A model has already rewritten its own shutdown script in testing, and agents have ignored stop commands from the person who owned the account.",
    status: "Proposed in Congress, not law.",
  },
  {
    id: "accountability",
    title: "The company is responsible for what its AI does",
    plain: "A business can’t escape liability by saying the AI acted on its own.",
    why: "Air Canada argued its chatbot was responsible for its own words. A tribunal disagreed, but that was one case in one country, not a rule.",
    status: "Law in California. Not federal.",
  },
  {
    id: "testing",
    title: "Test failures count too",
    plain: "If a system escapes its sandbox during testing and reaches real systems, that is a reportable incident like any other.",
    why: "The biggest failures of 2026 happened during internal testing, and still breached a company’s production systems and a government portal.",
    status: "Not addressed. The main federal bill explicitly carves out testing.",
  },
  {
    id: "transparency",
    title: "Let the public see the record",
    plain: "Incident reports and findings are published, with narrow and specific exemptions rather than blanket secrecy.",
    why: "Rules that collect safety information but seal it from the public leave everyone back where they started: trusting companies to grade themselves.",
    status: "Moving the wrong way. The leading federal bill would exempt submitted information from public-records laws.",
  },
];

export const getAsk = (id: string) => ASKS.find((a) => a.id === id);
