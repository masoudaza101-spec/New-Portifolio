import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
import PageShell from "@/components/PageShell";
import About from "@/components/About";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: `Story, values, and how ${site.name} works.`,
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
