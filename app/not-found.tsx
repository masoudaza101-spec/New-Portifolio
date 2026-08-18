import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.2em] text-[var(--accent-gold)]">
        404
      </p>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-gold-2)] px-6 py-3 text-sm font-semibold text-[#0b0e14] shadow-glow-gold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(0,212,255,0.35)]"
      >
        Back to home
      </Link>
    </main>
  );
}
