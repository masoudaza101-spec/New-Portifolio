import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
import PageShell from "@/components/PageShell";
import Projects from "@/components/Projects";
import StatsSection from "@/components/StatsSection";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Work",
  description: `Selected projects and case studies — by ${site.name}.`,
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
