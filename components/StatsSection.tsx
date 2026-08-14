import { Clock, FolderOpen, Users, LayoutGrid } from "lucide-react";
import Reveal from "@/components/Reveal";
import { getProjects } from "@/lib/portfolio";

const icons = {
  Clock,
  FolderOpen,
  Users,
  LayoutGrid,
} as const;

export default async function StatsSection() {
  const projects = await getProjects();

  const stats = [
    {
      index: "01",
      icon: "Clock" as const,
      accent: "var(--accent-gold)",
      value: "1+",
      label: "Years Experience",
      description: "Building real products since 2026.",
    },
    {
      index: "02",
      icon: "FolderOpen" as const,
      accent: "var(--accent-cyan)",
      value: String(projects.length),
      label: "Shipped Products",
      description: "Web and mobile platforms shipped.",
    },
    {
      index: "03",
      icon: "Users" as const,
      accent: "var(--accent-violet)",
      value: "5+",
      label: "Industries Served",
      description: "Business, health and community needs.",
    },
    {
      index: "04",
      icon: "LayoutGrid" as const,
      accent: "var(--accent-green)",
      value: "2",
      label: "Platform Focus",
      description: "Web development and mobile apps.",
    },
  ];

  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] bg-muted/10">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <Reveal>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              Impact at a glance
            </h2>
            <p className="max-w-md text-sm text-muted-foreground">
              Real results from digital products built across
              Tanzania and East Africa.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const StatIcon = icons[stat.icon];
            return (
              <Reveal key={stat.index} delay={0.08 * i}>
                <div className="group relative h-full rounded-2xl border border-white/[0.07] bg-[#0a0d14] p-7 transition-colors duration-300 hover:border-white/[0.13]">
                  <span
                    className="flex size-12 items-center justify-center rounded-xl"
                    style={{
                      color: stat.accent,
                      backgroundColor: `${stat.accent}1a`,
                      boxShadow: `0 0 0 1px ${stat.accent}33`,
                    }}
                  >
                    <StatIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="mt-5 font-display text-5xl font-bold leading-none tracking-tight">
                    <span style={{ color: stat.accent }}>{stat.value}</span>
                  </p>
                  <p className="mt-3 text-sm font-semibold text-foreground">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                  <span className="absolute right-5 top-5 font-mono text-xs text-muted-foreground/40">
                    {stat.index}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
