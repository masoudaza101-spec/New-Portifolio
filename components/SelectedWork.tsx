import Link from "next/link";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import { categoryColor } from "@/components/Projects";
import { getProjects } from "@/lib/portfolio";

export default async function SelectedWork() {
  const projects = await getProjects();
  const featured = projects.slice(0, 3);

  return (
    <section className="px-4 py-20 md:px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                Featured{" "}
                <span className="text-gradient-luxury">projects</span>
              </h2>
            </div>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent-gold)] transition-colors duration-300 hover:text-[var(--accent-gold-2)]"
            >
              View all work
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              accent={categoryColor(project.category)}
              featured={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
