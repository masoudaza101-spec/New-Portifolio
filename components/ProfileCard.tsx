import Image from "next/image";
import { MapPin } from "lucide-react";
import { blurDataUrl } from "@/lib/utils";
import { site } from "@/data/site";

export default function ProfileCard() {
  return (
    <figure className="group relative mx-auto w-full max-w-md lg:max-w-none">
      <div
        aria-hidden="true"
        className="absolute -inset-5 rounded-[2rem] bg-[radial-gradient(circle_at_70%_20%,rgba(0,212,255,0.14),transparent_65%)] blur-2xl"
      />
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-card shadow-[0_25px_80px_rgba(0,0,0,0.55)]">
        <div className="relative aspect-[4/5] w-full">
          <Image
            src="/images/profile.jpg"
            alt={`Portrait of ${site.name}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            placeholder="blur"
            blurDataURL={blurDataUrl}
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#04060a] via-[#04060a]/10 to-transparent"
          />
        </div>

        <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--accent-gold)]">
              Portfolio
            </p>
            <p className="mt-1.5 font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
              {site.name}
            </p>
            <p className="mt-1 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-[var(--accent-cyan)]" aria-hidden="true" />
              {site.location}
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-2 rounded-full border border-white/[0.1] bg-[#04060a]/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--accent-cyan)] backdrop-blur">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-green)] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent-green)]" />
            </span>
            Available
          </span>
        </figcaption>
      </div>
    </figure>
  );
}