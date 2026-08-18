import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
import PageShell from "@/components/PageShell";
import Projects from "@/components/Projects";
import StatsSection from "@/components/StatsSection";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Work",
  description: `Selected projects and case studies — by ${site.name}.`,
  alternates: {
    canonical: `${site.url}/work`,
  },
  openGraph: {
    title: `Work — ${site.name}`,
    description: `Selected projects and case studies — by ${site.name}.`,
    url: `${site.url}/work`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Work — ${site.name}`,
    description: `Selected projects and case studies — by ${site.name}.`,
    images: ["/opengraph-image"],
  },
};

export default function WorkPage() {
  return (
    <PageTransition>
      <PageShell>
        <Projects />
        <StatsSection />
      </PageShell>
    </PageTransition>
  );
}
