import PageTransition from "@/components/PageTransition";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import EditorialIndex from "@/components/EditorialIndex";
import StatsSection from "@/components/StatsSection";
import SelectedWork from "@/components/SelectedWork";
import TestimonialsMarquee from "@/components/TestimonialsMarquee";
import ContactCta from "@/components/ContactCta";

export default function HomePage() {
  return (
    <PageTransition>
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
