import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
import PageShell from "@/components/PageShell";
import Contact from "@/components/Contact";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Email, chat, and ways to connect with ${site.name}.`,
  alternates: {
    canonical: `${site.url}/contact`,
  },
  openGraph: {
    title: `Contact — ${site.name}`,
    description: `Email, chat, and ways to connect with ${site.name}.`,
    url: `${site.url}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact — ${site.name}`,
    description: `Email, chat, and ways to connect with ${site.name}.`,
    images: ["/opengraph-image"],
  },
};

export default function ContactPage() {
  return (
    <PageTransition>
      <PageShell>
        <Contact />
      </PageShell>
    </PageTransition>
  );
}
