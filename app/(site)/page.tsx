import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import EditorialIndex from "@/components/EditorialIndex";
import StatsSection from "@/components/StatsSection";
import SelectedWork from "@/components/SelectedWork";
import TestimonialsMarquee from "@/components/TestimonialsMarquee";
import ContactCta from "@/components/ContactCta";
import JsonLd from "@/components/JsonLd";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Aza Masoud | Information Systems & Web Developer",
  description:
    "Aza Masoud is an Information Systems and web developer from Tanzania building modern web applications, digital systems, and technology solutions.",
  alternates: {
    canonical: site.url,
  },
  openGraph: {
    title: "Aza Masoud | Information Systems & Web Developer",
    description:
      "Aza Masoud is an Information Systems and web developer from Tanzania building modern web applications, digital systems, and technology solutions.",
    url: site.url,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aza Masoud | Information Systems & Web Developer",
    description:
      "Aza Masoud is an Information Systems and web developer from Tanzania building modern web applications, digital systems, and technology solutions.",
    images: ["/opengraph-image"],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  image: `${site.url}/images/profile.jpg`,
  jobTitle: "Information Systems & Web Developer",
  description: site.metaDescription,
  address: {
    "@type": "PostalAddress",
    addressCountry: "TZ",
    addressRegion: "Tanzania",
  },
  sameAs: [site.github, site.linkedin],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  description: site.metaDescription,
  author: {
    "@type": "Person",
    name: site.name,
  },
};

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: `${site.name} — Information Systems & Web Developer`,
  description: site.metaDescription,
  url: site.url,
  mainEntity: {
    "@type": "Person",
    name: site.name,
    jobTitle: "Information Systems & Web Developer",
    url: site.url,
  },
};

export default function HomePage() {
  return (
    <PageTransition>
      <JsonLd data={personSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={profilePageSchema} />
      <main>
        <Hero />
        <Marquee />
        <EditorialIndex />
        <StatsSection />
        <SelectedWork />
        <TestimonialsMarquee />
        <ContactCta />
      </main>
    </PageTransition>
  );
}
