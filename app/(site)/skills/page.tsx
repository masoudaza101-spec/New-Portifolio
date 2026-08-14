import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
import PageShell from "@/components/PageShell";
import Expertise from "@/components/Expertise";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Skills",
  description: `Frontend, mobile and systems — the tools and skills behind ${site.name}.`,
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
