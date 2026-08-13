import Reveal from "@/components/Reveal";
import { getEducation } from "@/lib/portfolio";

export default async function Education() {
  const education = await getEducation();
  const entry = education[0];

  if (!entry) return null;

  const qualification = entry.field
    ? `${entry.qualification}. ${entry.field}`
    : entry.qualification;
  const acronym = entry.institution
    .split(/\s+/)
    .filter((word) => word.length > 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <section id="education" className="scroll-mt-20 px-6 md:px-20">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 border-t border-line pt-16 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-10 bg-line" aria-hidden="true" />
            <span className="text-caps text-muted">05 — Education</span>
          </div>
          <h2 className="font-display text-display-xl uppercase tracking-tight">
            Education
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
          <h3 className="font-display text-display-lg uppercase tracking-tight">
            {qualification}
          </h3>
          <p className="mt-4 text-body-lg text-muted">
            {entry.institution}
          </p>
          {acronym ? (
            <p className="mt-1 text-body text-muted">{acronym}</p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
