import { useEffect, useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificatesSection from "@/components/CertificatesSection";
import ResumeSection from "@/components/ResumeSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function Portfolio() {
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    // Increment visit counter
    const incrementVisits = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/visitas`,
          { method: "POST" }
        );
        if (response.ok) {
          const data = await response.json();
          setVisits(data.total);
        }
      } catch (error) {
        console.error("Error incrementing visits:", error);
      }
    };

    incrementVisits();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <CertificatesSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <Footer visits={visits} />
    </div>
  );
}

