import { Mail, MapPin } from "lucide-react";
import SocialLinkIcon from "@/components/SocialLinkIcon";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { site } from "@/data/site";
import { getSocialLinks } from "@/lib/portfolio";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Experience", href: "/experience" },
  { label: "Skills", href: "/skills" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default async function Footer() {
  const socialLinks = await getSocialLinks();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-[#04060a]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 md:px-6">
        <div>
          <p className="font-display text-xl font-bold tracking-tight text-foreground">
            {site.name.split(" ")[0]}{" "}
            <span className="text-gradient-gold">{site.name.split(" ")[1]}</span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {site.tagline}
          </p>
          <p className="mt-5 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--accent-green)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-green)] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--accent-green)]" />
            </span>
            Available for projects
          </p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Quick links
          </p>
          <nav
            aria-label="Footer quick links"
            className="mt-5 grid grid-cols-2 gap-x-3 gap-y-2.5 text-sm"
          >
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-medium text-muted-foreground transition-colors duration-300 hover:text-[var(--accent-gold)]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Get in touch
          </p>
          <div className="mt-5 space-y-3 text-sm">
            <a
              href={`mailto:${site.email}`}
              data-track="CONTACT_CLICK"
              className="flex items-center gap-3 font-medium text-muted-foreground transition-colors duration-300 hover:text-[var(--accent-cyan)]"
            >
              <Mail
                className="h-4 w-4 text-[var(--accent-cyan)]"
                aria-hidden="true"
              />
              {site.email}
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-track="WHATSAPP_CLICK"
              className="flex items-center gap-3 font-medium text-muted-foreground transition-colors duration-300 hover:text-[var(--accent-green)]"
            >
              <WhatsAppIcon className="h-4 w-4 text-[var(--accent-green)]" />
              {site.phone}
            </a>
            <p className="flex items-center gap-3 font-medium text-muted-foreground">
              <MapPin
                className="h-4 w-4 text-[var(--accent-gold)]"
                aria-hidden="true"
              />
              {site.location}
            </p>
          </div>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Connect
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
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
                className="flex size-11 items-center justify-center rounded-xl border border-white/[0.08] bg-[#0a0d14] text-muted-foreground transition-colors duration-300 hover:border-[var(--accent-gold)]/40 hover:bg-[var(--accent-gold)]/10 hover:text-[var(--accent-gold)]"
              >
                <SocialLinkIcon platform={link.platform} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row md:px-6">
          <p className="font-mono text-xs text-muted-foreground">
            © {site.copyrightYear} {site.name}. All rights reserved.
          </p>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors duration-300 hover:text-[var(--accent-gold)]"
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
