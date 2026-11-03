// Entries carry human dates like "Oct 2026" or just "2025". Sort newest first; a year-only
// date sorts after the months of that year it can't be placed against. Stable, so entries
// with the same date keep their order in the source file.

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const dateKey = (d: string) => {
  const [a, b] = d.trim().split(/\s+/);
  if (b === undefined) return Number(a) * 13;
  return Number(b) * 13 + MONTHS.indexOf(a) + 1;
};

export const newestFirst = <T extends { date: string }>(items: T[]): T[] =>
  [...items].sort((x, y) => dateKey(y.date) - dateKey(x.date));
