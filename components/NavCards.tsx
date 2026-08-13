import Link from "next/link";
import { ArrowRight, User, FolderOpen, Briefcase, Code2, Play, Mail } from "lucide-react";
import Reveal from "@/components/Reveal";

const cards = [
  {
    href: "/#about",
    icon: User,
    title: "About",
    description: "Story, values, and how I work.",
  },
  {
    href: "/#work",
    icon: FolderOpen,
    title: "Work",
    description: "Featured projects and case studies.",
  },
  {
    href: "/#experience",
    icon: Briefcase,
    title: "Experience",
    description: "Roles and what I've been building.",
  },
  {
    href: "/#skills",
    icon: Code2,
    title: "Skills",
    description: "Frontend, mobile, and systems.",
  },
  {
    href: "/#reel",
    icon: Play,
    title: "Reel",
    description: "A look at the work in motion.",
  },
  {
    href: "/#contact",
    icon: Mail,
    title: "Contact",
    description: "Email, chat, and ways to connect.",
  },
];

export default function NavCards() {
  return (
    <section className="relative overflow-hidden px-4 py-20 md:px-6">
      <div aria-hidden="true" className="mesh-gradient-bg absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-2 font-mono text-xs tracking-wide text-muted-foreground">
            {"// explore"}
          </p>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Explore the work
            </h2>
            <p className="max-w-md text-sm text-muted-foreground">
              Everything you need: projects, experience, skills, and ways to
              connect.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={0.05 * i}>
              <Link
                href={card.href}
                className="group card-top-hairline relative block h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0a0d14] p-6 transition-transform duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-gold)]/25 hover:shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
                style={{
                  boxShadow:
                    "0 0 0 1px rgba(255,255,255,0.035), inset 0 1px 0 0 rgba(255,255,255,0.04)",
                }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(500px circle at 50% 50%, rgba(212,175,55,0.055), transparent 40%)",
                  }}
                />
                <div className="flex items-start justify-between">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] ring-1 ring-[var(--accent-gold)]/20">
                    <card.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <ArrowRight
                    className="h-4 w-4 text-muted-foreground/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent-gold)]"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                  {card.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {card.description}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
