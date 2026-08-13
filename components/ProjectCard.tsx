"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";
import { blurDataUrl, EASE } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  index: number;
  accent?: string;
  featured?: boolean;
};

const subscribe = () => () => {};

export default function ProjectCard({
  project,
  index,
  accent = "var(--accent-gold)",
  featured = false,
}: ProjectCardProps) {
  const enabled = useSyncExternalStore(subscribe, () => true, () => false);

  const inner = (
    <Link
      href={`/projects/${project.slug}`}
      className="group block h-full focus-visible:outline-none"
    >
        <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/60 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[var(--accent-gold)]/30 hover:shadow-[0_8px_32px_rgba(212,175,55,0.08)]">
          <div className="relative aspect-[16/9] overflow-hidden bg-muted/30">
            <Image
              src={project.image}
              alt={`${project.title} — ${project.description} interface preview`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL={blurDataUrl}
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="rounded-full border border-white/70 px-4 py-1.5 text-[11px] font-semibold text-white transition-colors duration-300 group-hover:bg-white group-hover:text-black">
                View Case Study
              </span>
            </div>
            {featured ? (
              <span className="absolute left-4 top-4 rounded-full bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-cyan)] px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#04060a] shadow-glow-gold">
                Featured
              </span>
            ) : null}
          </div>

          <div className="flex flex-1 flex-col p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-wide">
                <span style={{ color: accent }}>{project.category}</span>
                <span className="text-muted-foreground/50">
                  {project.year}
                </span>
              </p>
              <span className="flex size-6 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors duration-300 group-hover:border-[var(--accent-gold)]/40 group-hover:text-[var(--accent-gold)]">
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </span>
            </div>

            <h3 className="mt-2.5 font-display text-base font-bold tracking-tight">
              {project.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border px-2 py-0.5 text-[9px] font-medium text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 ? (
                <span className="rounded-full border border-border px-2 py-0.5 text-[9px] font-medium text-muted-foreground">
                  +{project.technologies.length - 3}
                </span>
              ) : null}
            </div>
          </div>
        </article>
      </Link>
  );

  if (!enabled) {
    return <div>{inner}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
    >
      {inner}
    </motion.div>
  );
}
