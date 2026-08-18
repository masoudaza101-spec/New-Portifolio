import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
import PageShell from "@/components/PageShell";
import Experience from "@/components/Experience";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Experience",
  description: `Roles, work and projects that shaped how ${site.name.split(" ")[0]} builds software.`,
  alternates: {
    canonical: `${site.url}/experience`,
  },
  openGraph: {
    title: `Experience — ${site.name}`,
    description: `Roles, work and projects that shaped how ${site.name.split(" ")[0]} builds software.`,
    url: `${site.url}/experience`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Experience — ${site.name}`,
    description: `Roles, work and projects that shaped how ${site.name.split(" ")[0]} builds software.`,
    images: ["/opengraph-image"],
  },
};

export default function ExperiencePage() {
  return (
    <PageTransition>
      <PageShell>
        <Experience />
      </PageShell>
    </PageTransition>
  );
}
