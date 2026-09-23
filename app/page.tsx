import Navbar from "@/components/marketing/navbar";
import HeroSection from "@/components/marketing/hero-section";
import AboutSection from "@/components/marketing/about-section";
import Footer from "@/components/marketing/footer";
import ServicesSection from "@/components/marketing/services-section";
import ProcessSection from "@/components/marketing/process-section";
import ContactSection from "@/components/marketing/contact-section";
import { FaqSection } from "@/components/marketing/faq-section";
import EventsSection from "@/components/marketing/events-section";
import CtaSection from "@/components/marketing/cta-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <EventsSection />
        <ProcessSection />
        <FaqSection />
        <ContactSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
