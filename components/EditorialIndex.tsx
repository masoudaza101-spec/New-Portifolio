import Link from "next/link";
import { ArrowDown } from "lucide-react";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";

const indexItems = [
  { id: "01", label: "Selected Work", href: "/#work", note: "Featured projects" },
  { id: "02", label: "Experience", href: "/#experience", note: "Where I've built" },
  { id: "03", label: "Expertise", href: "/#expertise", note: "What I do best" },
  { id: "04", label: "Contact", href: "/#contact", note: "Start a project" },
];

export default function EditorialIndex() {
  return (
    <section
      id="index"
      className="border-b border-line"
      aria-label="Index"
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 px-6 pt-20 md:grid-cols-12 md:px-20 md:pt-28">
        <Reveal className="md:col-span-7">
          <p className="text-caps text-muted">
            {site.location} — {new Date().getFullYear()}
          </p>
          <h2 className="mt-6 font-display text-display-2xl uppercase tracking-tight">
            Independent
            <br />
            <span className="text-gradient-gold">software developer</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
          <p className="border-t border-line pt-5 text-body-lg text-muted">
            Web and mobile products designed, built and shipped end-to-end —
            for businesses and people across Tanzania and East Africa.
          </p>
          <a
            href="#work"
            data-track="WORK_CLICK"
            className="group mt-8 inline-flex items-center gap-3 text-caps uppercase tracking-wide text-foreground transition-colors duration-300 hover:text-[var(--accent-gold)]"
          >
            View selected work
            <ArrowDown
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1"
              aria-hidden="true"
            />
          </a>
        </Reveal>
      </div>

      <div className="mx-auto mt-16 w-full max-w-[1440px] px-6 md:px-20">
        <Reveal delay={0.05}>
          <nav
            aria-label="Page index"
            className="grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-4"
          >
            {indexItems.map((item, i) => (
              <Link
                key={item.id}
                href={item.href}
                className={`group flex flex-col gap-8 border-line px-6 py-8 transition-colors duration-300 hover:bg-white/[0.02] md:px-8 ${
                  i !== 0 ? "sm:border-l" : ""
                } ${i >= 2 ? "border-t sm:border-t-0" : ""}`}
              >
                <span className="font-mono text-xs text-muted">{item.id}</span>
                <span className="flex items-baseline justify-between gap-4">
                  <span className="font-display text-headline uppercase tracking-tight transition-colors duration-300 group-hover:text-[var(--accent-gold)]">
                    {item.label}
                  </span>
                  <ArrowDown
                    className="h-4 w-4 shrink-0 -rotate-45 text-muted transition-all duration-300 group-hover:text-[var(--accent-gold)] group-hover:rotate-0"
                    aria-hidden="true"
                  />
                </span>
                <span className="text-sm text-muted">{item.note}</span>
              </Link>
            ))}
          </nav>
        </Reveal>
      </div>
    </section>
  );
}
