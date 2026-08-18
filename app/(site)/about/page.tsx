import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
import PageShell from "@/components/PageShell";
import About from "@/components/About";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: `Story, values, and how ${site.name} works.`,
  alternates: {
    canonical: `${site.url}/about`,
  },
  openGraph: {
    title: `About — ${site.name}`,
    description: `Story, values, and how ${site.name} works.`,
    url: `${site.url}/about`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `About — ${site.name}`,
    description: `Story, values, and how ${site.name} works.`,
    images: ["/opengraph-image"],
  },
};

export default function AboutPage() {
  return (
    <PageTransition>
      <PageShell>
        <About />
      </PageShell>
    </PageTransition>
  );
}
