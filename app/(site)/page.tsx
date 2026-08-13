import PageTransition from "@/components/PageTransition";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import EditorialIndex from "@/components/EditorialIndex";
import Projects from "@/components/Projects";
import StatsSection from "@/components/StatsSection";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Expertise from "@/components/Expertise";
import NavCards from "@/components/NavCards";
import TestimonialsMarquee from "@/components/TestimonialsMarquee";
import Contact from "@/components/Contact";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <PageTransition>
      <main>
        <Hero />
        <Marquee />
        <EditorialIndex />
        <Projects />
        <StatsSection />
        <About />
        <Experience />
        <Expertise />
        <NavCards />
        <TestimonialsMarquee />
        <Contact />
      </main>
    </PageTransition>
  );
}
