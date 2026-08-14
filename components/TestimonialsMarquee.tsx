import { testimonials } from "@/data/testimonials";

export default function TestimonialsMarquee() {
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="overflow-hidden border-y border-white/[0.06] bg-[#07090f] py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
          Kind words
        </h2>
      </div>

      <div className="relative mt-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#07090f] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#07090f] to-transparent" />

        <div className="flex w-max animate-marquee-inline gap-5 hover:[animation-play-state:paused]">
          {doubled.map((item, i) => (
            <figure
              key={`${item.name}-${i}`}
              className="card-top-hairline w-[min(100vw-3rem,360px)] rounded-2xl border border-white/[0.07] bg-[#0a0d14] p-6"
            >
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-6 right-0 font-display text-[7rem] leading-none text-foreground/[0.04]"
                >
                  &ldquo;
                </span>
                <blockquote className="relative text-sm leading-relaxed text-muted-foreground">
                  {item.quote}
                </blockquote>
                <div className="mt-4 h-px w-8 bg-gradient-to-r from-[var(--accent-gold)]/50 to-transparent" />
                <figcaption className="mt-4 flex items-center gap-3">
                  <span
                    className="flex size-9 items-center justify-center rounded-full font-display text-sm font-bold"
                    style={{
                      color: item.accent,
                      backgroundColor: `${item.accent}1a`,
                    }}
                  >
                    {item.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-foreground">
                      {item.name}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {item.role}
                    </span>
                  </span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
