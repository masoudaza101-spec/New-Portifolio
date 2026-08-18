import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ExternalLink,
  Terminal,
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { GithubIcon } from "@/components/BrandIcons";
import { site } from "@/data/site";
import { blurDataUrl } from "@/lib/utils";
import {
  getProjectBySlug,
  getProjects,
  getProjectSlugs,
} from "@/lib/portfolio";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `${site.url}/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — ${site.name}`,
      description: project.description,
      url: `${site.url}/projects/${project.slug}`,
      type: "article",
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: `${project.title} — ${project.description}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${site.name}`,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projects = await getProjects();
  const index = projects.findIndex((project) => project.slug === slug);

  if (index === -1) {
    notFound();
  }

  const project = projects[index];
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  const sections = [
    { id: "problem", title: "The Problem", body: project.problem },
    { id: "solution", title: "The Solution", body: project.solution },
    { id: "challenges", title: "Challenges", body: project.challenges },
    { id: "result", title: "Result", body: project.result },
  ];

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `${site.url}/projects/${project.slug}`,
    image: project.image,
    author: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
    techStack: project.technologies,
    dateCreated: project.year,
    genre: project.category,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: site.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Work",
        item: `${site.url}/work`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${site.url}/projects/${project.slug}`,
      },
    ],
  };

  return (
    <PageTransition>
      <JsonLd data={projectSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main className="relative overflow-hidden pb-24 pt-12 md:pt-16">
        <div
          aria-hidden="true"
          className="animate-orb-1 absolute -right-32 top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.1),transparent_70%)] blur-[100px]"
        />
        <div
          aria-hidden="true"
          className="animate-orb-2 absolute -left-32 bottom-40 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.14),transparent_70%)] blur-[100px]"
        />

        <div className="relative mx-auto w-full max-w-[1440px] px-4 md:px-6">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-card px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors duration-300 hover:border-[var(--accent-gold)]/40 hover:text-[var(--accent-gold)]"
          >
            Back to work
          </Link>

          <header className="mt-12">
            <Reveal>
              <p className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span className="rounded-md border border-[var(--accent-gold)]/30 bg-[var(--accent-gold)]/10 px-2 py-1 font-semibold text-[var(--accent-gold)]">
                  {project.category}
                </span>
                <span aria-hidden="true">·</span>
                <span>{project.year}</span>
                <span aria-hidden="true">·</span>
                <span>{project.role}</span>
              </p>
              <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
                {project.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {project.description}
              </p>

              <dl className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                {[
                  ["Role", project.role],
                  ["Year", project.year],
                  ["Category", project.category],
                  ["Stack", project.technologies.join(", ")],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/[0.07] bg-card p-5"
                  >
                    <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {label}
                    </dt>
                    <dd className="mt-2 text-sm font-semibold text-foreground">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </header>

          <Reveal delay={0.05}>
            <div className="relative mt-14 aspect-[16/9] w-full">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[var(--accent-gold)]/20 via-[var(--accent-cyan)]/20 to-[var(--accent-violet)]/20 blur-2xl"
              />
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/[0.08] bg-card shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                <Image
                  src={project.image}
                  alt={`${project.title} — ${project.description}`}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-top"
                  placeholder="blur"
                  blurDataURL={blurDataUrl}
                />
              </div>
            </div>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
            <aside className="hidden md:col-span-3 md:block">
              <nav
                aria-label="Case study sections"
                className="sticky top-28 flex flex-col gap-3"
              >
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Contents
                </p>
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="rounded-xl border border-white/[0.06] bg-card px-4 py-3 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:border-[var(--accent-gold)]/40 hover:text-[var(--accent-gold)]"
                  >
                    {section.title}
                  </a>
                ))}
                <a
                  href="#features"
                  className="rounded-xl border border-white/[0.06] bg-card px-4 py-3 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:border-[var(--accent-cyan)]/40 hover:text-[var(--accent-cyan)]"
                >
                  Key features
                </a>
                <a
                  href="#process"
                  className="rounded-xl border border-white/[0.06] bg-card px-4 py-3 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:border-[var(--accent-violet)]/40 hover:text-[var(--accent-violet)]"
                >
                  Process
                </a>
              </nav>
            </aside>

            <div
              data-track="PROJECT_VIEW"
              data-project={project.slug}
              className="flex flex-col gap-16 md:col-span-9"
            >
              {sections.map((section) => (
                <CaseSection key={section.id} id={section.id} title={section.title}>
                  <p className="max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
                    {section.body}
                  </p>
                </CaseSection>
              ))}

              <CaseSection id="features" title="Key Features">
                <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {project.features.map((feature, i) => (
                    <li
                      key={feature}
                      className="flex items-start gap-4 rounded-2xl border border-white/[0.07] bg-card p-6"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-gold)]/10 font-mono text-[10px] font-semibold text-[var(--accent-gold)] ring-1 ring-[var(--accent-gold)]/20">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="pt-1 text-sm font-medium leading-relaxed">
                        {feature}
                      </p>
                    </li>
                  ))}
                </ul>
              </CaseSection>

              <CaseSection id="process" title="Development Process">
                <ol className="flex flex-col gap-3">
                  {project.process.map((step, i) => (
                    <li
                      key={step}
                      className="flex items-center gap-4 rounded-xl border border-white/[0.06] bg-[#0a0d14] px-5 py-4"
                    >
                      <Terminal
                        className="h-4 w-4 shrink-0 text-[var(--accent-cyan)]"
                        aria-hidden="true"
                      />
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </CaseSection>

              <CaseSection id="screenshots" title="Project Screenshots">
                <div className="relative aspect-[16/10] w-full">
                  <div
                    aria-hidden="true"
                    className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[var(--accent-violet)]/20 via-[var(--accent-cyan)]/20 to-[var(--accent-gold)]/20 blur-2xl"
                  />
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/[0.08] bg-card shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                    <Image
                      src={project.image}
                      alt={`${project.title} interface screenshot`}
                      fill
                      sizes="(max-width: 768px) 100vw, 60vw"
                      placeholder="blur"
                      blurDataURL={blurDataUrl}
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </CaseSection>
            </div>
          </div>

          <Reveal delay={0.05}>
            <div className="mt-16 flex flex-wrap items-center gap-4">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track="LIVE_DEMO_CLICK"
                data-project={project.slug}
                className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-gold-2)] px-7 py-3.5 text-sm font-semibold text-[#0b0e14] shadow-glow-gold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(0,212,255,0.35)]"
              >
                Live demo
                <ExternalLink
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track="GITHUB_CLICK"
                data-project={project.slug}
                className="group inline-flex items-center gap-3 rounded-xl border border-white/[0.12] bg-card px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-cyan)]/40 hover:text-[var(--accent-cyan)]"
              >
                <GithubIcon className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </Reveal>

          <nav
            aria-label="More projects"
            className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
          >
            <Link
              href={`/projects/${previous.slug}`}
              className="group flex flex-col gap-3 rounded-2xl border border-white/[0.07] bg-card p-7 transition-colors duration-300 hover:border-white/[0.14]"
            >
              <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Previous project
              </span>
              <span className="font-display text-xl font-bold tracking-tight">
                {previous.title}
              </span>
            </Link>
            <Link
              href={`/projects/${next.slug}`}
              className="group flex flex-col gap-3 rounded-2xl border border-white/[0.07] bg-card p-7 text-right transition-colors duration-300 hover:border-white/[0.14]"
            >
              <span className="flex items-center justify-end gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Next project
              </span>
              <span className="font-display text-xl font-bold tracking-tight">
                {next.title}
              </span>
            </Link>
          </nav>
        </div>
      </main>
    </PageTransition>
  );
}

type CaseSectionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
};

function CaseSection({ id, title, children }: CaseSectionProps) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="mb-8 flex items-center gap-4 font-display text-2xl font-bold tracking-tight md:text-3xl">
        <span
          className="h-px w-10 bg-[var(--accent-gold)]"
          aria-hidden="true"
        />
        {title}
      </h2>
      {children}
    </section>
  );
}
