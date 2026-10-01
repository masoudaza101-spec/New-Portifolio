import Link from "next/link";
import {
  CheckCircle2,
  FolderGit2,
  Mail,
  MapPin,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import AnimatedBackground from "@/components/AnimatedBackground";
import Typewriter from "@/components/Typewriter";
import ProfileCard from "@/components/ProfileCard";
import SocialLinkIcon from "@/components/SocialLinkIcon";
import { site } from "@/data/site";
import { getProjects, getSocialLinks } from "@/lib/portfolio";

const paragraph =
  "Full-stack developer and Information Systems graduate building web and mobile applications that solve everyday problems across Tanzania and beyond.";

const badgeClass =
  "rounded-full border px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider";

export default async function Hero() {
  const [projects, socialLinks] = await Promise.all([
    getProjects(),
    getSocialLinks(),
  ]);

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden px-4 py-20 md:px-6 md:py-24">
      {/* Ambient background */}
      <AnimatedBackground />

      {/* System status strip */}
      <div className="absolute inset-x-0 top-6 z-10 mx-auto hidden w-full max-w-7xl items-center justify-between px-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:flex md:px-6">
        <span>./{site.name.toLowerCase().replace(" ", "-")} — portfolio</span>
        <span className="flex items-center gap-2">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-green)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-green)]" />
          </span>
          {site.availability}
        </span>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-16">
          {/* Typography column */}
          <div>
            <Reveal>
              <div className="mb-6 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-px w-10 bg-gradient-to-r from-[var(--accent-gold)] to-transparent"
                />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent-gold)]">
                  Welcome to my portfolio
                </span>
              </div>

              <h1 className="font-display text-[clamp(3.25rem,11vw,8.75rem)] font-bold leading-[0.92] tracking-tight">
                <span className="text-gradient-luxury">Aza</span>
                <br />
                <span className="text-outline">Masoud</span>
                <span className="text-[var(--accent-gold)]">.</span>
              </h1>

              <div className="mt-8 font-mono text-sm md:text-base">
                <Typewriter />
              </div>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {paragraph}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="mt-10 grid max-w-xl grid-cols-1 gap-3 font-mono text-xs sm:grid-cols-3">
                <li className="rounded-xl border border-white/[0.08] bg-card/70 px-4 py-3 backdrop-blur">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Location
                  </span>
                  <span className="mt-1.5 flex items-center gap-1.5 text-foreground">
                    <MapPin className="h-3.5 w-3.5 text-[var(--accent-gold)]" aria-hidden="true" />
                    {site.location}
                  </span>
                </li>
                <li className="rounded-xl border border-white/[0.08] bg-card/70 px-4 py-3 backdrop-blur">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Shipped
                  </span>
                  <span className="mt-1.5 flex items-center gap-1.5 text-foreground">
                    <FolderGit2 className="h-3.5 w-3.5 text-[var(--accent-cyan)]" aria-hidden="true" />
                    {projects.length} projects
                  </span>
                </li>
                <li className="rounded-xl border border-white/[0.08] bg-card/70 px-4 py-3 backdrop-blur">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Status
                  </span>
                  <span className="mt-1.5 flex items-center gap-1.5 text-[var(--accent-green)]">
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Available
                  </span>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className={`${badgeClass} border-[var(--accent-gold)]/30 bg-[var(--accent-gold)]/10 text-[var(--accent-gold)]`}>
                  Web + Mobile Development
                </span>
                <span className={`${badgeClass} border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)]`}>
                  Information Systems
                </span>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/work"
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-gold-2)] px-6 py-3 text-sm font-semibold text-[#0b0e14] shadow-glow-gold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(0,212,255,0.35)]"
                >
                  View My Work
                </Link>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:border-[var(--accent-gold)]/40 hover:text-[var(--accent-gold)]"
                >
                  <Mail className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                  Get in Touch
                </Link>
              </div>

              <div className="mt-8 flex items-center gap-3">
                <a
                  href={`mailto:${site.email}`}
                  data-track="CONTACT_CLICK"
                  aria-label="Email"
                  className="flex size-12 items-center justify-center rounded-xl border border-[var(--accent-gold)]/30 bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] transition-all duration-300 hover:border-[var(--accent-gold)]/50 hover:bg-[var(--accent-gold)]/20"
                >
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </a>
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track={
                      link.platform.toLowerCase().includes("github")
                        ? "GITHUB_CLICK"
                        : link.platform.toLowerCase().includes("linkedin")
                          ? "LINKEDIN_CLICK"
                          : undefined
                    }
                    aria-label={link.platform}
                    className="flex size-12 items-center justify-center rounded-xl border border-white/[0.08] bg-card text-muted-foreground transition-all duration-300 hover:border-[var(--accent-gold)]/40 hover:bg-[var(--accent-gold)]/10 hover:text-[var(--accent-gold)]"
                  >
                    <SocialLinkIcon platform={link.platform} className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Profile photo column */}
          <Reveal delay={0.1}>
            <ProfileCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
