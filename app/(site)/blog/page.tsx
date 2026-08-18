import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `Notes on software development, building products and running an independent engineering practice — by ${site.name}.`,
  alternates: {
    canonical: `${site.url}/blog`,
  },
  openGraph: {
    title: `Blog — ${site.name}`,
    description: `Notes on software development, building products and running an independent engineering practice — by ${site.name}.`,
    url: `${site.url}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog — ${site.name}`,
    description: `Notes on software development, building products and running an independent engineering practice — by ${site.name}.`,
    images: ["/opengraph-image"],
  },
};

const posts = [
  {
    slug: "coming-soon-1",
    tag: "Engineering",
    title: "Shipping an SMS platform for small businesses",
    excerpt:
      "Lessons from building KEMI-FAIBA — data modelling, gateway integration and keeping things simple.",
    date: "Drafting",
  },
  {
    slug: "coming-soon-2",
    tag: "Design",
    title: "Designing booking flows that people actually use",
    excerpt:
      "What the Doctor Portal taught me about clarity, trust and reducing friction in appointments.",
    date: "Drafting",
  },
  {
    slug: "coming-soon-3",
    tag: "Process",
    title: "From idea to live product with one developer",
    excerpt:
      "How I scope, build and ship full products solo — and where the real work actually happens.",
    date: "Drafting",
  },
];

export default function BlogPage() {
  return (
    <PageTransition>
      <main className="relative overflow-hidden px-4 pb-24 pt-16 md:px-6 md:pt-24">
        <div
          aria-hidden="true"
          className="animate-orb-1 absolute -left-24 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.12),transparent_70%)] blur-[100px]"
        />
        <div
          aria-hidden="true"
          className="animate-orb-2 absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.16),transparent_70%)] blur-[100px]"
        />

        <div className="relative mx-auto w-full max-w-4xl">
          <Reveal>
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Notes &amp; <span className="text-gradient-luxury">thinking</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Writing about the work behind the work — engineering, product
              decisions and shipping software that solves real problems.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-14 rounded-2xl border border-[var(--accent-gold)]/30 bg-[var(--accent-gold)]/[0.06] p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent-gold)]">
                Coming soon
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Full articles are on the way. While I finish writing, here is
                what I will be covering:
              </p>
            </div>
          </Reveal>

          <div className="mt-8 flex flex-col gap-4">
            {posts.map((post, index) => (
              <Reveal key={post.slug} delay={0.1 + index * 0.05}>
                <article className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/[0.07] bg-card p-6 transition-all duration-300 hover:border-white/[0.14] md:p-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-md border border-[var(--accent-gold)]/30 bg-[var(--accent-gold)]/10 px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-gold)]">
                      {post.tag}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      {post.date}
                    </span>
                    <span className="ml-auto font-mono text-xs text-muted-foreground/40">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="font-display text-xl font-bold tracking-tight md:text-2xl">
                    {post.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <span className="mt-1 inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent-gold)]">
                    Read soon
                  </span>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="mt-12 text-sm text-muted-foreground">
              Have something in mind?{" "}
              <Link
                href="/contact"
                className="font-semibold text-[var(--accent-gold)] underline decoration-[var(--accent-gold)]/40 underline-offset-4 transition-colors hover:text-[var(--accent-gold-2)]"
              >
                Let&apos;s talk
              </Link>
              {` — or on WhatsApp at ${site.phone}.`}
            </p>
          </Reveal>
        </div>
      </main>
    </PageTransition>
  );
}
