import type { Metadata } from "next";
import ZipLookup from "@/components/ZipLookup";

export const metadata: Metadata = {
  title: "Take action: find your representatives",
  description: "Enter your ZIP to find your senators and House member, write a message about AI guardrails, and send it in about a minute.",
  alternates: { canonical: "/act" },
};

export default async function ActPage({ searchParams }: { searchParams: Promise<{ zip?: string }> }) {
  const { zip } = await searchParams;
  return (
    <>
      <h1>Who represents you?</h1>
      <p className="lead">Enter your ZIP code, write a message in under a minute, and send it to your two senators and your House member. Calling is one tap away too.</p>
      <ZipLookup initialZip={zip ?? ""} />
    </>
  );
}
