import { Briefcase } from "lucide-react";
import Reveal from "@/components/Reveal";
import { getExperience } from "@/lib/portfolio";

function formatPeriod(entry: {
  startDate: string;
  endDate: string | null;
  current: boolean;
}) {
  const start = new Date(entry.startDate).getFullYear();
  const end = entry.current
    ? "Present"
    : entry.endDate
      ? String(new Date(entry.endDate).getFullYear())
      : "Present";
  return `${start} — ${end}`;
}

export default async function Experience() {
  const experience = await getExperience();

  return (
    <section
      id="experience"
      className="scroll-mt-24 border-y border-border/50 bg-muted/10 px-4 py-20 md:px-6"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-2 font-mono text-xs tracking-wide text-muted-foreground">
            {"// experience"}
          </p>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              Experience
            </h2>
            <p className="max-w-md text-sm text-muted-foreground">
              Roles, work and projects that shaped how I build software.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5">
          {experience.map((entry, i) => (
            <Reveal key={entry.id} delay={0.05 * i}>
              <div className="group flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-[#0a0d14] p-6 transition-colors duration-300 hover:border-[var(--accent-gold)]/30 md:flex-row md:items-start md:gap-8 md:p-7">
                <div className="flex items-center gap-3 md:w-44 md:shrink-0">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] ring-1 ring-[var(--accent-gold)]/20">
                    <Briefcase className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {formatPeriod(entry)}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight">
                    {entry.title}
                  </h3>
                  {entry.organization ? (
                    <p className="mt-1 font-mono text-xs uppercase tracking-wide text-[var(--accent-gold)]">
                      {entry.organization}
                    </p>
                  ) : null}
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {entry.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
