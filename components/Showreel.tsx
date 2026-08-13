import { Play } from "lucide-react";
import Reveal from "@/components/Reveal";
import { getProjects } from "@/lib/portfolio";

export default async function Showreel() {
  const projects = await getProjects();

  const rows = [
    { value: "1+", label: "Years Experience", accent: "var(--accent-gold)" },
    { value: String(projects.length), label: "Projects Shipped", accent: "var(--accent-cyan)" },
    { value: "2", label: "Platforms — Web & Mobile", accent: "var(--accent-violet)" },
    { value: "TZ", label: "East Africa Region", accent: "var(--accent-green)" },
  ];

  return (
    <section
      id="reel"
      aria-label="Showreel"
      className="relative overflow-hidden border-y border-white/[0.06] bg-[#04060a] py-28 md:py-36"
    >
      <div
        aria-hidden="true"
        className="animate-orb-1 absolute -left-32 -top-40 h-[350px] w-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12),transparent_70%)] blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="animate-orb-2 absolute -right-32 -bottom-40 h-[280px] w-[400px] rounded-full bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.16),transparent_70%)] blur-[100px]"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <Reveal>
          <p className="font-mono text-xs tracking-wide text-muted-foreground">
            {"// showreel"}
          </p>
          <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Selected work,
            <br />
            <span className="text-gradient-luxury">in motion</span>
          </h2>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Web Development · Mobile Apps · Systems · Digital Products
          </p>

          <div className="mt-14 flex justify-center">
            <button
              type="button"
              role="button"
              aria-label="Showreel coming soon"
              className="group relative flex size-24 items-center justify-center rounded-full border border-[var(--accent-gold)]/40 bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] shadow-glow-gold transition-colors duration-300 hover:bg-[var(--accent-gold)]/20"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 animate-ping rounded-full border border-[var(--accent-gold)]/40"
              />
              <Play
                className="h-8 w-8 translate-x-0.5 fill-current"
                aria-hidden="true"
              />
            </button>
          </div>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Showreel · In Production
          </p>
        </Reveal>
      </div>

      <div className="relative z-10 mx-auto mt-24 max-w-7xl border-t border-white/[0.06] px-4">
        <Reveal delay={0.1}>
          <dl className="grid grid-cols-2 gap-y-10 py-10 md:grid-cols-4">
            {rows.map((row) => (
              <div key={row.label} className="text-center">
                <dd
                  className="font-display text-3xl font-bold md:text-4xl"
                  style={{ color: row.accent }}
                >
                  {row.value}
                </dd>
                <dt className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {row.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
