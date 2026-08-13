import Image from "next/image";
import { GraduationCap, MapPin } from "lucide-react";
import Reveal from "@/components/Reveal";
import { getEducation } from "@/lib/portfolio";
import { blurDataUrl } from "@/lib/utils";
import { site } from "@/data/site";

const paragraphs = [
  "I'm Aza Masoud, an Information Systems graduate and software developer based in Tanzania.",
  "I enjoy turning ideas and real-world problems into practical digital products.",
  "My work sits between technology, business and user experience.",
];

export default async function About() {
  const education = await getEducation();
  const first = education[0];

  return (
    <section id="about" className="scroll-mt-24 px-4 py-20 md:px-6">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="mb-2 font-mono text-xs tracking-wide text-muted-foreground">
              {"// about"}
            </p>
            <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight md:text-4xl">
              A little
              <br />
              <span className="text-gradient-gold">about me</span>
            </h2>
          </Reveal>

        </div>

        <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
          <Reveal>
            <div className="space-y-5 text-body-lg text-muted-foreground">
              {paragraphs.map((paragraph, i) => (
                <p key={i} className={i === 0 ? "text-foreground" : ""}>
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
              <MapPin className="h-4 w-4 text-[var(--accent-gold)]" aria-hidden="true" />
              Based in {site.location}
            </div>
          </Reveal>

          {first ? (
            <Reveal delay={0.15} className="mt-8">
              <div className="card-top-hairline rounded-2xl border border-white/[0.07] bg-[#0a0d14] p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] ring-1 ring-[var(--accent-gold)]/20">
                    <GraduationCap className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                    Education
                  </p>
          <Reveal delay={0.1} className="mt-10">
            <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-3xl border border-white/[0.07] bg-card">
              <Image
                src="/images/about.jpg"
                alt="Portrait of Aza Masoud"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                placeholder="blur"
                blurDataURL={blurDataUrl}
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
              />
            </div>
          </Reveal>
        </div>
                <h3 className="mt-4 font-display text-xl font-bold tracking-tight">
                  {first.qualification}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {first.field}
                  {first.field && first.institution ? " — " : ""}
                  {first.institution}
                </p>
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
