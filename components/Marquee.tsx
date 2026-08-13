import { techMarqueeItems } from "@/data/site";

export default function Marquee() {
  const doubled = [...techMarqueeItems, ...techMarqueeItems];

  return (
    <section aria-label="Technologies" className="border-y border-white/[0.06] bg-white/[0.02] py-8">
      <div className="overflow-hidden">
        <div className="flex w-max animate-marquee-inline items-center gap-10 px-6">
          {doubled.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="flex items-center gap-10 whitespace-nowrap font-display text-xl font-medium uppercase tracking-[0.18em] text-muted-foreground/60"
            >
              {tech}
              <span
                aria-hidden="true"
                className="inline-block size-1.5 rotate-45 bg-gradient-to-br from-[var(--accent-gold)] to-[var(--accent-cyan)]"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
