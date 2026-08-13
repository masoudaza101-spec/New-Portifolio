import Link from "next/link";
import {
  FolderKanban,
  Briefcase,
  GraduationCap,
  Wrench,
  Share2,
  Inbox,
  BarChart3,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

type Counts = Record<string, number>;

async function collectCounts(): Promise<Counts> {
  const fallback: Counts = {
    projects: 0,
    experience: 0,
    education: 0,
    skills: 0,
    socialLinks: 0,
    messages: 0,
    newMessages: 0,
    pageViews: 0,
  };

  const results = await Promise.allSettled([
    prisma.project.count(),
    prisma.experience.count(),
    prisma.education.count(),
    prisma.skill.count(),
    prisma.socialLink.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { status: "NEW" } }),
    prisma.analyticsEvent.count({ where: { event: "PAGE_VIEW" } }),
  ]);

  const keys = [
    "projects",
    "experience",
    "education",
    "skills",
    "socialLinks",
    "messages",
    "newMessages",
    "pageViews",
  ] as const;

  keys.forEach((key, index) => {
    if (results[index].status === "fulfilled") {
      fallback[key] = results[index].value;
    }
  });

  return fallback;
}

const statCards = [
  { key: "projects", label: "Projects", href: "/admin/projects", icon: FolderKanban, tone: "text-[var(--accent-gold)]" },
  { key: "experience", label: "Experience", href: "/admin/experience", icon: Briefcase, tone: "text-[var(--accent-cyan)]" },
  { key: "education", label: "Education", href: "/admin/education", icon: GraduationCap, tone: "text-[var(--accent-violet)]" },
  { key: "skills", label: "Skills", href: "/admin/skills", icon: Wrench, tone: "text-[var(--accent-green)]" },
  { key: "socialLinks", label: "Social Links", href: "/admin/social-links", icon: Share2, tone: "text-[var(--accent-gold)]" },
  { key: "messages", label: "Messages", href: "/admin/messages", icon: Inbox, tone: "text-[var(--accent-cyan)]" },
  { key: "pageViews", label: "Page views", href: "/admin/analytics", icon: BarChart3, tone: "text-[var(--accent-violet)]" },
];

export default async function AdminDashboardPage() {
  const counts = await collectCounts();

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {counts.newMessages > 0
            ? `${counts.newMessages} new message${counts.newMessages === 1 ? "" : "s"} waiting in your inbox.`
            : "Everything is up to date."}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.key}
              href={card.href}
              className="group rounded-2xl border border-white/[0.07] bg-card p-6 transition-colors duration-300 hover:border-[var(--accent-gold)]/30"
            >
              <div className="flex items-center justify-between">
                <span className={`font-display text-4xl font-bold ${card.tone}`}>
                  {counts[card.key]}
                </span>
                <Icon className="size-5 text-muted-foreground" aria-hidden="true" />
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {card.label}
              </p>
            </Link>
          );
        })}
      </div>

      <section className="mt-8 rounded-2xl border border-white/[0.07] bg-card p-6">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Quick actions
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {[
            { href: "/admin/projects", label: "Add a project" },
            { href: "/admin/messages", label: "Review messages" },
            { href: "/admin/skills", label: "Manage skills" },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="rounded-xl border border-white/[0.1] px-4 py-2.5 text-sm text-foreground transition-colors duration-200 hover:border-[var(--accent-gold)]/40 hover:text-[var(--accent-gold)]"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
