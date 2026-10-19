import { Suspense } from "react";
import type { Metadata } from "next";
import ZipLookup from "@/components/ZipLookup";

export const metadata: Metadata = {
  title: "Take action — AIFailSafe",
  description: "Find your senators and House member, write a message about AI guardrails, and send it in about a minute.",
};

export default function ActPage() {
  return (
    <>
      <h1>Who represents you?</h1>
      <p className="lead">Enter your ZIP code, write a message in under a minute, and send it to your two senators and your House member. Calling is one tap away too.</p>
      <Suspense fallback={null}>
        <ZipLookup />
      </Suspense>
    </>
  );
}
