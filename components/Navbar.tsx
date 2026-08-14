"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const isActive = (item: { label: string; href: string }) => {
    if (item.href === "/") {
      return pathname === "/";
    }
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        data-main-nav="true"
        className={cn(
          "sticky top-0 z-50 border-b border-transparent bg-background/40 backdrop-blur-md transition-[backdrop-filter,background-color,border-color,transform] duration-300",
          !visible && "-translate-y-24",
          scrolled && "border-border/60 bg-background/80"
        )}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-4 md:px-6"
        >
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-2"
            aria-label="Aza Masoud — home"
          >
            <span className="flex size-2.5 bg-[var(--accent-gold)] shadow-[0_0_12px_rgba(0,212,255,0.8)] transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
            <span className="font-display text-xl font-bold tracking-tight">
              {site.name.split(" ")[0]}{" "}
              <span className="text-gradient-gold">{site.name.split(" ")[1]}</span>
            </span>
          </Link>

          <div className="hidden flex-1 items-center justify-center gap-8 lg:flex">
            {site.nav.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative text-sm font-medium tracking-wide transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-gradient-to-r after:from-[var(--accent-gold)] after:to-[var(--accent-cyan)] after:transition-all after:duration-300",
                    active
                      ? "text-[var(--accent-gold)] after:w-full"
                      : "text-muted-foreground after:w-0 hover:text-foreground hover:after:w-full"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <a
            href={`mailto:${site.email}`}
            className="hidden shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-[var(--accent-gold)]/40 bg-[var(--accent-gold)]/10 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent-gold)] transition-colors duration-300 hover:bg-[var(--accent-gold)]/20 hover:shadow-glow-gold lg:inline-flex"
          >
            Let&apos;s Talk
          </a>

          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-card/60 text-foreground transition-colors duration-300 hover:border-[var(--accent-gold)]/40 lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-haspopup="dialog"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-[60] flex flex-col bg-background/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between px-4 py-5 md:px-6">
              <span className="font-display text-xl font-bold tracking-tight">
                {site.name.split(" ")[0]}{" "}
                <span className="text-gradient-gold">
                  {site.name.split(" ")[1]}
                </span>
              </span>
              <button
                type="button"
                className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-card/60 text-foreground"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav
              aria-label="Mobile navigation"
              className="flex flex-1 flex-col justify-center gap-1 px-6"
            >
              {site.nav.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between border-b border-white/[0.06] py-4"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.05 + i * 0.06 }}
                >
                  <span className="font-display text-2xl font-bold tracking-tight">
                    {item.label}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.a>
              ))}
            </nav>

            <div className="px-6 py-8">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-gold)]/40 bg-[var(--accent-gold)]/10 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent-gold)]"
              >
                Let&apos;s Talk
              </a>
              <p className="mt-6 font-mono text-xs text-muted-foreground">
                {site.location} · {site.availability}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
