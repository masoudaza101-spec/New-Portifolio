import { WhatsAppIcon } from "@/components/BrandIcons";
import { site } from "@/data/site";

export default function WhatsAppButton() {
  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      data-track="WHATSAPP_CLICK"
      aria-label={`Chat on WhatsApp — ${site.phone}`}
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-3"
    >
      <span className="pointer-events-none hidden rounded-full border border-white/10 bg-card/90 px-4 py-2 text-xs font-semibold text-foreground opacity-0 shadow-xl backdrop-blur transition-opacity duration-300 group-hover:opacity-100 sm:block">
        Chat on WhatsApp
      </span>
      <span className="relative flex size-14 items-center justify-center rounded-full bg-[#25d366] text-[#04060a] shadow-[0_8px_30px_rgba(37,211,102,0.35)] transition-transform duration-300 group-hover:scale-105">
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-ping rounded-full bg-[#25d366] opacity-30"
        />
        <WhatsAppIcon className="relative h-7 w-7" />
      </span>
    </a>
  );
}
