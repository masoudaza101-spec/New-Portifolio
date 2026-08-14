import { Mail, MapPin } from "lucide-react";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import SocialLinkIcon from "@/components/SocialLinkIcon";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { site } from "@/data/site";
import { getSocialLinks } from "@/lib/portfolio";

export default async function Contact() {
  const socialLinks = await getSocialLinks();

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-border/50 bg-[#07090f] px-4 py-20 md:px-6"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight md:text-4xl">
                Let&apos;s build something{" "}
                <span className="text-gradient-luxury">useful</span>
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                Have a project in mind? Tell me about it and I&apos;ll get back
                to you soon.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10 space-y-3">
              <a
                href={`mailto:${site.email}`}
                data-track="CONTACT_CLICK"
                className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-[#0a0d14] p-5 transition-colors duration-300 hover:border-[var(--accent-cyan)]/40"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] ring-1 ring-[var(--accent-cyan)]/20">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-foreground">
                    {site.email}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    Best for new projects
                  </span>
                </span>
              </a>

              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-track="WHATSAPP_CLICK"
                className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-[#0a0d14] p-5 transition-colors duration-300 hover:border-[var(--accent-green)]/40"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-green)]/10 text-[var(--accent-green)] ring-1 ring-[var(--accent-green)]/20">
                  <WhatsAppIcon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-foreground">
                    {site.phone}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    WhatsApp — fastest reply
                  </span>
                </span>
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-[#0a0d14] p-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] ring-1 ring-[var(--accent-gold)]/20">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-foreground">
                    {site.location}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {site.availability}
                  </span>
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="mt-8">
              <div className="flex items-center gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track={
                      link.platform.toLowerCase().includes("whats")
                        ? "WHATSAPP_CLICK"
                        : link.platform.toLowerCase().includes("github")
                          ? "GITHUB_CLICK"
                          : link.platform.toLowerCase().includes("linkedin")
                            ? "LINKEDIN_CLICK"
                            : undefined
                    }
                    aria-label={link.platform}
                    className="flex size-11 items-center justify-center rounded-xl border border-border bg-card/60 text-muted-foreground transition-colors duration-300 hover:border-[var(--accent-gold)]/40 hover:bg-[var(--accent-gold)]/10 hover:text-[var(--accent-gold)]"
                  >
                    <SocialLinkIcon
                      platform={link.platform}
                      className="h-4 w-4"
                    />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="rounded-3xl border border-white/[0.08] bg-card p-6 shadow-[0_8px_40px_rgba(0,0,0,0.2)] md:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
