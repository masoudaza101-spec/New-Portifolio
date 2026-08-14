import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
import PageShell from "@/components/PageShell";
import Experience from "@/components/Experience";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Experience",
  description: `Roles, work and projects that shaped how ${site.name.split(" ")[0]} builds software.`,
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
