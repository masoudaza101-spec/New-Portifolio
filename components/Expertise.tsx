import { Code2, Server, Smartphone, Database } from "lucide-react";
import Reveal from "@/components/Reveal";

const expertise = [
  {
    icon: Code2,
    title: "Frontend",
    accent: "var(--accent-cyan)",
    skills: ["Next.js", "React", "JavaScript", "TypeScript", "Tailwind CSS"],
  },
  {
    icon: Server,
    title: "Backend",
    accent: "var(--accent-gold)",
    skills: ["Node.js", "REST APIs", "Authentication", "Prisma"],
  },
  {
    icon: Smartphone,
    title: "Mobile",
    accent: "var(--accent-violet)",
    skills: ["Android", "Java", "Firebase", "SQLite"],
  },
  {
    icon: Database,
    title: "Database",
    accent: "var(--accent-green)",
    skills: ["MySQL", "TiDB", "Firebase", "SQLite"],
  },
];

export default function Expertise() {
  return (
    <section id="skills" className="scroll-mt-24 px-4 py-20 md:px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            What I work with
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {expertise.map((category, i) => (
            <Reveal key={category.title} delay={0.07 * i}>
              <div className="group card-top-hairline h-full rounded-2xl border border-white/[0.07] bg-[#0a0d14] p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-white/[0.13]">
                <span
                  className="flex size-12 items-center justify-center rounded-xl"
                  style={{
                    color: category.accent,
                    backgroundColor: `${category.accent}1a`,
                    boxShadow: `0 0 0 1px ${category.accent}33`,
                  }}
                >
                  <category.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold tracking-tight">
                  {category.title}
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {category.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2">
                      <span
                        className="h-1 w-1 rounded-full"
                        style={{ backgroundColor: category.accent }}
                      />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
