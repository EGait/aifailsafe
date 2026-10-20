/**
 * Fire a GA4 event. Safe to call anywhere: if analytics isn't loaded (no ID set,
 * ad blocker, server render) it quietly does nothing.
 *
 * Never pass anything that identifies a person. No ZIP codes, no names, no message text.
 */
type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

export function track(event: string, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  (window as GtagWindow).gtag?.("event", event, params);
}
