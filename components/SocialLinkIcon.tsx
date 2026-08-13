import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from "@/components/BrandIcons";

type SocialLinkIconProps = {
  platform: string;
  className?: string;
};

export default function SocialLinkIcon({
  platform,
  className,
}: SocialLinkIconProps) {
  const key = platform.toLowerCase();

  if (key.includes("whatsapp") || key.includes("whats")) {
    return <WhatsAppIcon className={className} />;
  }
  if (key.includes("github") || key.includes("git")) {
    return <GithubIcon className={className} />;
  }
  if (key.includes("linkedin") || key.includes("linked")) {
    return <LinkedinIcon className={className} />;
  }
  if (key.includes("mail") || key.includes("email")) {
    return <Mail className={className} aria-hidden="true" />;
  }
  return null;
}
