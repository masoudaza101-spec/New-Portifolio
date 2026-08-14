import Link from "next/link";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/lib/portfolio";

export function categoryColor(category: string): string {
  const key = category.toLowerCase();
  if (key.includes("web")) return "var(--accent-cyan)";
  if (key.includes("mobile")) return "var(--accent-violet)";
  return "var(--accent-gold)";
}

export default async function Projects() {
  const projects = await getProjects();

  return (
    <section
      id="work"
      className="scroll-mt-24 px-4 py-20 md:px-6"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                Featured{" "}
                <span className="text-gradient-luxury">projects</span>
              </h2>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                A collection of web and mobile products built for everyday
                needs.
              </p>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full border border-[var(--accent-gold)]/40 bg-[var(--accent-gold)]/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--accent-gold)] transition-colors duration-300 hover:bg-[var(--accent-gold)]/20 hover:shadow-glow-gold"
            >
              Build yours
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              accent={categoryColor(project.category)}
            />
          ))}
        </div>

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-gold)]/40 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--accent-gold)] transition-colors duration-300 hover:bg-[var(--accent-gold)]/10"
          >
            Start your project
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
