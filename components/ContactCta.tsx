import Link from "next/link";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";

export default function ContactCta() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#07090f] px-4 py-24 md:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl">
            Have a project
            <br />
            <span className="text-gradient-luxury">in mind?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Tell me about it and I&apos;ll get back to you soon — {site.location},
            {site.availability.toLowerCase()}.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-gold-2)] px-6 py-3 text-sm font-semibold text-[#0b0e14] shadow-glow-gold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(0,212,255,0.35)]"
            >
              Start a project
            </Link>
            <a
              href={`mailto:${site.email}`}
              data-track="CONTACT_CLICK"
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:border-[var(--accent-gold)]/40 hover:text-[var(--accent-gold)]"
            >
              Email me
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
