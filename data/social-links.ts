import { site } from "@/data/site";

export type SocialLinkItem = {
  id: string;
  platform: string;
  url: string;
  icon: string;
  order: number;
};

export const socialLinks: SocialLinkItem[] = [
  {
    id: "social-01",
    platform: "GitHub",
    url: site.github,
    icon: "github",
    order: 0,
  },
  {
    id: "social-02",
    platform: "LinkedIn",
    url: site.linkedin,
    icon: "linkedin",
    order: 1,
  },
  {
    id: "social-03",
    platform: "WhatsApp",
    url: site.whatsapp,
    icon: "whatsapp",
    order: 2,
  },
];
