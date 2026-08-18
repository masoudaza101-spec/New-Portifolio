import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
import PageShell from "@/components/PageShell";
import Expertise from "@/components/Expertise";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Skills",
  description: `Frontend, mobile and systems — the tools and skills behind ${site.name}.`,
  alternates: {
    canonical: `${site.url}/skills`,
  },
  openGraph: {
    title: `Skills — ${site.name}`,
    description: `Frontend, mobile and systems — the tools and skills behind ${site.name}.`,
    url: `${site.url}/skills`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Skills — ${site.name}`,
    description: `Frontend, mobile and systems — the tools and skills behind ${site.name}.`,
    images: ["/opengraph-image"],
  },
};

export default function SkillsPage() {
  return (
    <PageTransition>
      <PageShell>
        <Expertise />
      </PageShell>
    </PageTransition>
  );
}
