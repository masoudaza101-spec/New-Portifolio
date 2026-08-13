import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Globe,
  Mail,
  MapPin,
  Play,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import Typewriter from "@/components/Typewriter";
import SocialLinkIcon from "@/components/SocialLinkIcon";
import { site } from "@/data/site";
import { blurDataUrl } from "@/lib/utils";
import { getProjects, getSocialLinks } from "@/lib/portfolio";

const paragraph =
  "Full-stack developer and Information Systems graduate building web and mobile applications that solve real-world problems across Tanzania and beyond.";

export default async function Hero() {
  const [projects, socialLinks] = await Promise.all([
    getProjects(),
    getSocialLinks(),
  ]);

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden px-4 py-16 md:px-6 md:py-20">
      {/* Ambient background */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="animate-orb-1 absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.16),transparent_70%)] blur-[100px]" />
        <div className="animate-orb-2 absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.2),transparent_70%)] blur-[100px]" />
        <div className="animate-orb-3 absolute right-1/3 top-1/4 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.14),transparent_70%)] blur-[80px]" />
        <div className="mesh-gradient-bg absolute inset-0" />
        <div className="noise-overlay absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          {/* Info card */}
          <Reveal className="order-2 lg:order-1">
            <div className="relative rounded-3xl border border-white/[0.08] bg-card/80 p-5 backdrop-blur-xl md:p-7">
              <div
                aria-hidden="true"
                className="absolute -top-px left-10 h-px w-24 bg-gradient-to-r from-transparent via-[var(--accent-gold)] to-transparent"
              />
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-wider">
                <span className="flex items-center gap-2 rounded-md border border-[var(--accent-gold)]/30 bg-[var(--accent-gold)]/10 px-2 py-1 font-semibold text-[var(--accent-gold)]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-green)] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-green)]" />
                  </span>
                  {"// available"}
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-[var(--accent-gold)]" aria-hidden="true" />
                  {site.location}
                </span>
                <span aria-hidden="true" className="text-white/20">|</span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Globe className="h-3.5 w-3.5 text-[var(--accent-cyan)]" aria-hidden="true" />
                  Open to Remote
                </span>
              </div>

              <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[3.6rem]">
                Software Developer &amp;{" "}
                <span className="text-gradient-luxury">Information Systems</span>
              </h1>

              <div className="mt-4 min-h-[1.8rem]">
                <Typewriter />
              </div>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {paragraph}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-[var(--accent-gold)]/30 bg-[var(--accent-gold)]/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent-gold)]">
                  Web + Mobile Development
                </span>
                <span className="rounded-full border border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan)]/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent-cyan)]">
                  Information Systems
                </span>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link
                  href="/#work"
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-gold-2)] px-6 py-3 text-sm font-semibold text-[#0b0e14] shadow-glow-gold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(212,175,55,0.35)]"
                >
                  View My Work
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <Link
                  href="/#reel"
                  className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:border-[var(--accent-gold)]/40 hover:text-[var(--accent-gold)]"
                >
                  <Play className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                  View Reel
                </Link>
              </div>

              <div className="mt-7 flex items-center gap-3">
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
            </div>
          </Reveal>

          {/* Portrait */}
          <Reveal delay={0.1} className="order-1 lg:order-2">
            <div className="relative mx-auto w-full max-w-md">
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.2),transparent_70%)] blur-[80px]"
              />
              <div className="relative aspect-[3/4] w-[min(100%,420px)]">
                <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/[0.1] bg-card shadow-[0_25px_80px_rgba(0,0,0,0.5)]">
                  <div className="absolute inset-[3px] overflow-hidden rounded-[2rem] bg-card">
                    <Image
                      src="/images/profile.jpg"
                      alt="Professional portrait of Aza Masoud"
                      fill
                      priority
                      sizes="(max-width: 1024px) 90vw, 440px"
                      placeholder="blur"
                      blurDataURL={blurDataUrl}
                      className="object-cover object-top"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                    />
                  </div>
                </div>

                <span className="absolute -left-4 top-1/3 rounded-2xl border border-[var(--accent-cyan)]/30 bg-[#0a0d14]/90 px-4 py-2.5 shadow-glow-cyan backdrop-blur">
                  <span className="block font-display text-2xl font-bold text-[var(--accent-cyan)]">
                    1+
                  </span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Years
                  </span>
                </span>

                <span className="absolute -right-4 top-1/2 rounded-2xl border border-[var(--accent-gold)]/30 bg-[#0a0d14]/90 px-4 py-2.5 shadow-glow-gold backdrop-blur">
                  <span className="block font-display text-2xl font-bold text-[var(--accent-gold)]">
                    {projects.length}
                  </span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Projects
                  </span>
                </span>

                <span className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-2xl border border-[var(--accent-green)]/30 bg-[#0a0d14]/90 px-4 py-2 shadow-glow-green backdrop-blur">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-green)] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-green)]" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-green)]">
                    {site.availability}
                  </span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Scroll
        </span>
        <ChevronDown className="h-4 w-4 animate-bounce text-[var(--accent-gold)]" aria-hidden="true" />
      </div>
    </section>
  );
}
